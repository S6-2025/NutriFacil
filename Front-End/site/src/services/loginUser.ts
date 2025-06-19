export async function loginUser(data: any): Promise<any> {
  const response = await fetch("http://localhost:3030/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login");
  }

  const responseData = await response.json();

  if (responseData.token) {
    sessionStorage.setItem("token", responseData.token);
  }

  return responseData;
}
