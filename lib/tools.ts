import path from "path";
import fs from "fs/promises";

export interface Tools {
  id: number;
  title: string;
  icon: string;
  link: string;
  description: string;
  image: string;
  status: string;
  colors: string;
}

export async function getTools(): Promise<Tools[]> {
  const dataDir = path.join(process.cwd(), "data");
  await fs.mkdir(dataDir, { recursive: true });
  try {
    const filePath = path.join(process.cwd(), "data", "linked-access.json");
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading tools data:", err);
    return [];
  }
}
