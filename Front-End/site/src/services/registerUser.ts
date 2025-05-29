export async function registerUser(data: any): Promise<void> {
<<<<<<< HEAD
  const response = await fetch("https://6b89-2804-1b3-c483-ecf8-f44f-e396-96f3-31f5.ngrok-free.app/auth/register", {
=======
  const response = await fetch("http://localhost:3000/register", {
>>>>>>> 504d1b975a1a208df8a115964229f9da43f95d88
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
