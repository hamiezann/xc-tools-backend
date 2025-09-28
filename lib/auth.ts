import path from "path";
import fs from "fs/promises";

export interface AdminUser {
  // Full admin user data
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface PublicAdminUser {
  // Omit sensitive information
  id: number;
  username: string;
  email: string;
  role: string;
}

export async function getAdminUsers(): Promise<AdminUser[]> {
  // Read admin users from JSON file
  // Ensure the data directory exists
  const dataDir = path.join(process.cwd(), "data");
  await fs.mkdir(dataDir, { recursive: true });
  try {
    const filePath = path.join(process.cwd(), "data", "admin-acc.json");
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading admin users data:", error);
    return [];
  }
}

export async function validateAdmin( // Validate admin user credentials
  username: string,
  password: string
): Promise<PublicAdminUser | null> {
  try {
    const admins = await getAdminUsers();
    const admin = admins.find((user) => user.username === username);
    if (!admin) {
      return null;
    }

    const isValid = admin.password === password; // Replace with actual password hashing check
    if (isValid) {
      const { password: _, ...publicAdmin } = admin; // Omit the password field
      return publicAdmin;
    }

    return null;
  } catch (error) {
    console.error("Error validating admin user:", error);
    return null;
  }
}

export function generateToken(adminId: number): string {
  const payload = {
    id: adminId,
    timestamp: Date.now(),
    expires: Date.now() + 24 * 60 * 60 * 1000,
  }; // Token valid for 24 hours

  return Buffer.from(JSON.stringify(payload)).toString("base64"); // Simple base64 encoding for token
}

export function verifyToken(token: string): { id: number } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    if (payload.expires < Date.now()) {
      return null;
    }

    return { id: payload.id };
  } catch {
    return null;
  }
}
