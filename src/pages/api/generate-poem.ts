import { Anthropic } from "@anthropic-ai/sdk";
import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: (
    req: NextApiRequest,
    res: NextApiResponse,
    cb: (result: any) => void,
  ) => void,
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await runMiddleware(req, res, cors);

    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("ANTHROPIC_API_KEY is not set");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const { prompt, ...formData } = req.body;

    console.log("Received prompt:", prompt);
    console.log("Received formData:", JSON.stringify(formData));

    const anthropic = new Anthropic({ apiKey });
    console.log("Anthropic instance created");

    const messageContent = `Write a poem based on the following prompt: ${prompt}. 
                               Use these additional parameters: ${JSON.stringify(formData)}`;
    console.log("Message content:", messageContent);

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 300,
      messages: [{ role: "user", content: messageContent }],
    });

    console.log("Anthropic API response received");

    const poem =
      response.content[0].type === "text" ? response.content[0].text : "";
    return res.status(200).json({ poem });
  } catch (error) {
    console.error("Error in API handler:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return res.status(500).json({
      error: "Error generating poem",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
