import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        try{
            const response = await axios.post("https://productapplication.onrender.com/api/users/register", {username, email, password})

            console.log(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 3000)
            
            
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div className='container mt-4'>
        <h1 className='text-secondary'>User Registeration form</h1>
        <form onSubmit={handleSubmit} method="post" className='form'>
            <label htmlFor="username">User Name: </label><input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} className='form-control w-1/3' required/>
            <label htmlFor="email">Email</label><input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className='form-control w-1/3' required/>
            <label htmlFor="password">Password</label><input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className='form-control w-1/3' required/>
            <button type='submit' className='btn btn-sm mt-5 btn-primary'>Sign Up</button>
        </form>
    </div>
  )
}

export default Register
