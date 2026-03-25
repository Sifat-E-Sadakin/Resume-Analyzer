export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    link?: string;
  }>;
  certificates?: Array<{
    name: string;
    issuer: string;
    year?: string;
    link?: string;
  }>;
}

export interface TemplateProps {
  data: PortfolioData;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const PLACEHOLDER_AVATAR =
  "https://api.dicebear.com/9.x/glass/svg?seed=professional&backgroundColor=6366f1";
