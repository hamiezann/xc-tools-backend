import { generateToken, validateAdmin } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required.",
      });
    }

    const admin = await validateAdmin(username, password);
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = generateToken(admin.id);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: admin,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
