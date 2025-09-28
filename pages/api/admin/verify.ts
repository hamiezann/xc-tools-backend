import { getAdminUsers, verifyToken } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Token is required." });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    const admins = await getAdminUsers();
    const admin = admins.find((user) => user.id === decoded.id);
    if (!admin) {
      return res.status(404).json({ error: "Admin user not found." });
    }

    const { password, ...publicAdmin } = admin; // Omit the password field
    return res.status(200).json({
      success: true,
      message: "Admin user verified successfully",
      user: publicAdmin,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
