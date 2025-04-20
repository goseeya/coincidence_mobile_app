export const login = async (username: string, password: string) => {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }
    return result;
  };
  