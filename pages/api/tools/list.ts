import { getTools } from "@/lib/tools";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const tools = await getTools();
    return res.status(200).json({ tools });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
