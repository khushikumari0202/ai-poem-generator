import { PrimaryInput } from "@/components/primary";
import InfoDialog from "@/components/primary/components/InfoDialog";
import Loading from "@/components/primary/Loading";
import { GithubIcon } from "@/icons/GithubIcon";
import { NoFoundIcon } from "@/icons/NoFoundIcon";
import { defaultFormData, FormDataTypes } from "@/types/types";
import { getPrompt } from "@/utils/getPrompt";
import { useState } from "react";

export default function Home() {
  const [formCurrentData, setFormCurrentData] =
    useState<FormDataTypes>(defaultFormData);
  const [desc, setDesc] = useState("");
  const [poem, setPoem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePoem = async () => {
    setIsLoading(true);
    setPoem("");
    const prompt = getPrompt({ prompt: desc, formCurrentData });

    try {
      const response = await fetch("/api/generate-poem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, ...formCurrentData }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPoem(data.poem);
    } catch (error) {
      console.error("Error generating poem:", error);
      setPoem("An error occurred while generating the poem. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`flex h-full w-full flex-col overflow-auto md:h-screen md:items-center md:overflow-hidden`}
    >
      <nav className="flex w-full flex-none items-center justify-between p-4">
        <div className="font-styrene text-2xl">AI Poet</div>
        <a
          className="flex scale-150 items-center gap-1.5 pr-5 hover:text-primary"
          href="https://github.com/khushikumari0202"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h6 className="text-xs hover:text-primary">khushikumari0202</h6>
          <GithubIcon />
        </a>
      </nav>

      <div className="w-full flex-grow overflow-auto md:justify-between md:pb-10">
        <div className="flex h-full w-full flex-col gap-16 md:flex-row">
          <div className="flex flex-col gap-5 md:flex-1 md:overflow-hidden">
            <div className="flex flex-grow flex-col gap-5 overflow-auto p-4">
              <PrimaryInput
                name="prompt"
                title="Write Prompt"
                rows={4}
                placeholder="Add Prompt Here"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <InfoDialog
                formCurrentData={formCurrentData}
                setFormCurrentData={setFormCurrentData}
              />
            </div>
            <button
              className="mx-4 mb-4 rounded-md bg-primary px-3 py-2 text-primary-foreground"
              style={{ maxHeight: "40px" }}
              title="Generate"
              onClick={generatePoem}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Poem"}
            </button>
          </div>
          <div className="h-full pb-4 pl-0 pr-0 md:flex-1 md:pl-4 md:pr-0">
            <div className="h-full overflow-hidden border border-border md:rounded-l-3xl">
              <div className="flex h-full flex-col items-center justify-center bg-muted p-10">
                {poem === null ? (
                  <>
                    <NoFoundIcon />
                    <h2 className="pt-10 text-center">
                      Create your first Poem
                    </h2>
                    <h6 className="w-[80%] pt-2 text-center md:w-[45%]">
                      Create your AI poem with a touch of creativity and
                      inspiration. Let the words come to life with just a click!
                    </h6>
                  </>
                ) : poem === "" ? (
                  <Loading />
                ) : (
                  <div className="overflow-auto whitespace-pre-wrap">
                    {poem}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
