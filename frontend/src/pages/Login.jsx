import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";


const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl, } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const reponse = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })
        if (reponse.data.success) {
          setToken(reponse.data.token);
          localStorage.setItem('token', reponse.data.token);

        }
        else {
          toast.error(reponse.data.message);
        }
      }
      else {
        const reponse = await axios.post(`${backendUrl}/api/user/login`, { email, password });

        if (reponse.data.success) {
          setToken(reponse.data.token);
          localStorage.setItem('token', reponse.data.token);

        }
        else {
          toast.error(reponse.data.message);
        }
      }

    } catch (error) {
      toast.error("Error in authentication");

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token])




  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-4 text-ink-800 mt-10'>
      <div className="text-center mb-2">
        <p className="prata-regular text-3xl text-ink-900">{currentState}</p>
        <div className="mx-auto mt-2 h-[2px] w-12 bg-brand-500"></div>
      </div>

      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className="field" placeholder="Name" required />}

      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="field" placeholder="Email" required />

      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="field" placeholder="Password" required />

      <div className="w-full flex justify-between text-sm mt-[-4px] text-ink-500">
        <p className="cursor-pointer hover:text-brand-600">Forgot Password</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer hover:text-brand-600">Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className="cursor-pointer hover:text-brand-600">Login here</p>
        }
      </div>

      <button className="bg-brand-600 text-white font-light px-8 py-2.5 mt-4 rounded-lg w-full hover:bg-brand-700 transition-colors">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  );
};

export default Login;