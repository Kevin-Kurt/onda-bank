export function saveSession(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("sessionToken", token);
  }
}

export function getSession() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("sessionToken");
  }
  return null;
}

export function clearSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("sessionToken");
  }
}