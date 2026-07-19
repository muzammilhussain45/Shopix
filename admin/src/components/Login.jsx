import React, { useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onSubmitHandler = async (e)=>{
        
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl+"/api/user/admin", {email, password})
            if (response.data.success) {
                setToken(response.data.token);
                
            } else {
                toast.error(response.data.message);

                
            }
                     
            
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "An error occurred while logging in");
            
            
        }
        
    }
    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-ink-50'>
            <div className='bg-white shadow-soft border border-ink-100 rounded-2xl px-8 py-8 max-w-md w-full'>
                <h1 className='text-2xl font-bold mb-1 text-ink-900'>Admin Panel</h1>
                <p className='text-sm text-ink-500 mb-6'>Sign in to manage your store</p>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-4 min-w-72'>
                        <p className='text-sm font-medium text-ink-700 mb-2'>Email Address</p>
                        <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className='field' type="email" placeholder="Enter your email" required />
                    </div>

                    <div className='mb-4 min-w-72'>
                        <p className='text-sm font-medium text-ink-700 mb-2'>Password</p>
                        <input onChange={(e)=>{setPassword(e.target.value)}} value={password} className='field' type="password" placeholder="Enter your password" required />
                    </div>
                    <button className='mt-2 w-full py-2.5 px-4 rounded-lg text-white bg-brand-600 hover:bg-brand-700 transition-colors font-medium' type="submit">Login</button>
                </form>
            </div>

        </div>
    )
}

export default Login
