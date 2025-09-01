import { User } from "@/types/user";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const token = localStorage.getItem("jwt");

    const res = await fetch(`${BACKEND_URL}/foodsight/user`, {
      method: "GET",
      credentials: "include",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
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
  } catch {
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await fetch(`${BACKEND_URL}/foodsight/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("jwt");
  } catch (e) {
    console.error("Logout failed", e);
  }
}
