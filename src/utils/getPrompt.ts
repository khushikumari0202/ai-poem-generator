import { FormDataTypes } from "@/types/types";

type promptType = {
  prompt: string;
  formCurrentData: FormDataTypes;
};

export const getPrompt = ({ prompt, formCurrentData }: promptType) => {
  const {
    poemLength,
    syllableCount,
    poeticForm,
    rhymeScheme,
    theme,
    topic,
    creativityLevel,
    emotionEvoked,
    favoritePoet,
    genre,
    onomatopoeiaWord,
    tone,
  } = formCurrentData;

  const specifications = [
    syllableCount !== 0 && `Syllable count per line: ${syllableCount}`,
    poemLength &&
      `Number of lines: ${poemLength === "short" ? "5-10" : poemLength === "medium" && "11-20"}`,
    poeticForm && `Poetic form: ${poeticForm.value}`,
    rhymeScheme && `Rhyme scheme: ${rhymeScheme.value}`,
    theme && `Theme: ${theme.value}`,
    creativityLevel && `Creativity level: ${creativityLevel.value}`,
    emotionEvoked && `Emotion to evoke: ${emotionEvoked.value}`,
    favoritePoet && `Style inspired by: ${favoritePoet.value}`,
    genre && `Genre: ${genre.value}`,
    onomatopoeiaWord &&
      `Include the onomatopoeia word: ${onomatopoeiaWord.value}`,
    tone && `Tone: ${tone.value}`,
  ].filter(Boolean);

  return specifications.length > 0
    ? `Write a ${poemLength ? poemLength : ""} poem ${prompt || topic?.value ? `about ${topic?.value}` : ""}, with the following specifications: ${specifications.map((spec) => `- ${spec}`).join("\n")}
Please ensure the poem adheres to these guidelines while maintaining coherence and artistic quality.`
    : `Create a unique poem based on the following randomly generated parameters:

Poetry Form: [Choose one]
Sonnet, Haiku, Free Verse, Limerick, Acrostic, Villanelle, Tanka, Ballad, Concrete Poem, Ode

Theme: [Choose one]
Nature, Love, Technology, Time, Dreams, Urban Life, Mythology, Emotions, Social Issues, Cosmic Wonder

Mood: [Choose one]
Joyful, Melancholic, Contemplative, Whimsical, Mysterious, Energetic, Serene, Rebellious, Nostalgic, Awe-inspiring

Literary Device: [Choose one or more]
Metaphor, Alliteration, Personification, Imagery, Onomatopoeia, Symbolism, Assonance, Irony, Hyperbole, Oxymoron

Word to Include: [Generate a random word]

Instructions:
1. Randomly select one option from each category above.
2. Create a poem that incorporates all the selected elements.
3. Ensure the poem adheres to the chosen form's structure and rules.
4. Aim for creativity and coherence in your composition.`;
};
