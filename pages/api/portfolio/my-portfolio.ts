import { getPortfolio } from "@/lib/portfolio";
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
    const portfolio = await getPortfolio();
    return res.status(200).json({ portfolio });
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
