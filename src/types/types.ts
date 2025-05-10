export type Option = {value: string; label: string};

export type FormDataTypes = {
  poeticForm: Option | null;
  rhymeScheme: Option | null;
  syllableCount: number;
  poemLength: "short" | "medium" | "long" | null;
  theme: Option | null;
  topic: Option | null;
  favoritePoet: Option | null;
  genre: Option | null;
  creativityLevel: Option | null;
  tone: Option | null;
  onomatopoeiaWord: Option | null;
  emotionEvoked: Option | null;
};
export const defaultFormData: FormDataTypes = {
  poeticForm: null,
  rhymeScheme: null,
  syllableCount: 0,
  poemLength: null,
  theme: null,
  topic: null,
  favoritePoet: null,
  genre: null,
  creativityLevel: null,
  tone: null,
  onomatopoeiaWord: null,
  emotionEvoked: null,
};
