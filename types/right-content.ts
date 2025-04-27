export type RightContent = {
  professionalSummary: {
    title: string;
    content: string;
  };
  experience: {
    title: string;
    company: string; // Company name
    location: string; // Location
    date: string; // Date range
    items: string[]; // List of items (responsibilities/achievements)
  }[];
};
