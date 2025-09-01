import { User } from "@/types/user";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    // Check if a JWT token exists in localStorage (for iOS)
    const token = localStorage.getItem("jwt");

    const res = await fetch(`${BACKEND_URL}/foodsight/user`, {
      method: "GET",
      credentials: "include", // Sends cookies for non-iOS browsers
      headers: token
        ? { Authorization: `Bearer ${token}` } // iOS: send token in header
        : undefined,
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== 200) return null;

    const dto = data.body as { name: string; email: string; pictureUrl: string };
    return {
      name: dto.name,
      email: dto.email,
      picture: dto.pictureUrl,
    };
  } catch (err) {
    console.error("Failed to fetch current user:", err);
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    // Send logout request to backend
    await fetch(`${BACKEND_URL}/foodsight/user/logout`, {
      method: "POST",
      credentials: "include", // removes cookie
    });

    // Remove JWT from localStorage (iOS)
    localStorage.removeItem("jwt");
  } catch (e) {
    console.error("Logout failed", e);
  }
}
