// types.ts (or within the same file)

export type Subsection = {
  title: string;
  items: string[];
};

export type Section = {
  title: string;
  items?: string[];
  subsections?: Subsection[];
};

export type LeftContent = {
  sections: Section[];
};
