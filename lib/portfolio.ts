import path from "path";
import fs from "fs/promises";

export interface Portfolio {
  title: string;
  description: string;
  about1: string;
  about2: string;
  image: string;
  tags: string[];
  skills: string[];
  stacks: string[];
  services: string[];
  backgroundColor: string;
  projects: {
    id: number;
    title: string;
    description: string;
    image: { src: string; desc: string }[] | string;
    tags: string[];
    features: string[];
    source: string;
  }[];
}

export async function getPortfolio(): Promise<Portfolio[]> {
  const dataDir = path.join(process.cwd(), "data");
  await fs.mkdir(dataDir, { recursive: true });
  try {
    const filePath = path.join(process.cwd(), "data", "my-portfolio.json");
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading portfolio data:", err);
    return [];
  }
}
