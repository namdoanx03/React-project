import React, { useState } from 'react'
import { loginApi } from '../services/UserService'
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassWord] = useState(false)
    
    const handleLogin = async () =>{
      if(!email || !password){
        toast.error('Email or Password is required!')
        return
    }
    let res = await loginApi(email, password)
    if(res && res.token){
      localStorage.setItem("token", res.token)
    }
    console.log(res)
  }
  return (
    <div className='login-container col-12 col-sm-4'>
        <div className='title'>Log in</div>
        <div className='text'>Email or username</div>
        <input type='text' placeholder='Email or username' value={email} onChange={(event)=> setEmail(event.target.value)}/>
        <div className='input-password'>
            <input 
            type={isShowPassword === true ? "text" : "password"}
            placeholder='Password'  
            value={password} 
            onChange={(event)=> setPassword(event.target.value)} />
            <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
            onClick={() => setIsShowPassWord(!isShowPassword)}
            ></i>
        </div>
        <button className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
        >Login</button>
        <div className='back'>
        <i class="fa-solid fa-chevron-left"></i> Go back
        </div>
    </div>
  )
}

export default Login