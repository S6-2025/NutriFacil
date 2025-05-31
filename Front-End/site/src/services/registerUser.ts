export async function registerUser(data: any): Promise<void> {
  const response = await fetch("https://6b89-2804-1b3-c483-ecf8-f44f-e396-96f3-31f5.ngrok-free.app/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register");
  }
}
