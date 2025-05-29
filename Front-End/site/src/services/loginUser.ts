export async function loginUser(data: any): Promise<any>{
  const response = await  fetch("https://6b89-2804-1b3-c483-ecf8-f44f-e396-96f3-31f5.ngrok-free.app/auth/login",
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