import axios from 'axios';
import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = async (e) => {
        e.preventDefault();

        try{

            const response = await axios.post("https://product-backend-yxxe.onrender.com/api/users/login", {email, password});

            alert(response.data.message);

            localStorage.setItem("token", response.data.token);

        }catch(error){
            console.log(error)

            alert("Could not Login");
        }
    }
  return (
    <div className='container mt-4'>
        <h1 className='text-secondary'>Login form</h1>
        <form onSubmit={handleSubmit} method="post" className='form'>
            <label htmlFor="email">Email</label><input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className='form-control w-1/3' required/>
            <label htmlFor="password">Password</label><input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className='form-control w-1/3' required/>
            <button type='submit' className='btn btn-sm mt-5 btn-primary'>Sign In</button>
        </form>
    </div>
  )
}

export default Login
