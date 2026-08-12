export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
};

const USER_SERVICE_URL =
  "/backend/api/users";

const STORAGE_KEY =
  "biletixa-user";

export async function registerUser(
  fullName: string,
  email: string,
  password: string
): Promise<AuthUser> {
  const response = await fetch(
    `${USER_SERVICE_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Kayıt oluşturulamadı."
    );
  }

  return data;
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthUser> {
  const response = await fetch(
    `${USER_SERVICE_URL}/login`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ??
        "Giriş yapılamadı."
    );
  }

  return data;
}

export function saveCurrentUser(
  user: AuthUser
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  );
}

export function getCurrentUser():
  AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(
    STORAGE_KEY
  );
}