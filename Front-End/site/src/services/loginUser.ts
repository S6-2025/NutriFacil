export async function loginUser(data: any): Promise<any>{
  const response = await  fetch("http://localhost:3030/auth/login",
 {  method: "POST",
    headers: {
       "Content-Type": "application/json",
       
    },
     body: JSON.stringify(data),}
  )

    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register");
  }
  return response.json();
}