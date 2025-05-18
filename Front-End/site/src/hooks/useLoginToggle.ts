import { useState } from "react";
 
export function useLoginToggle() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin(prev => !prev);

  return { isLogin, toggleForm };
}
