// types.ts (or in the same file)
export type RightContent = {
  professionalSummary: {
    title: string;
    content: string;
  };
  experience: {
    title: string;
    items: string[];
  }[];
};
