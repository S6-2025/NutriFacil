import { useState } from 'react';
import { loginUser } from '../services/loginUser';

export function useUserLoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }


    async function handleSubmit(e: React.FormEvent, data: Object) {
       e.preventDefault(); 

       try{
         await loginUser(data);
       }catch (error) {
         console.error('Login failed:', error);
       }
    }

    return {username, password, handleUsernameChange, handlePasswordChange, handleSubmit};
}