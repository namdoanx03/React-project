import React, { useState, useContext } from 'react'
import { loginApi } from '../services/UserService'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

const Login = () => {
    const navigate = useNavigate();

    const { loginContext } = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassWord] = useState(false)
    const [loadingAPI, setLoadingAPI] = useState(false)

    const handleLogin = async () =>{
      if(!email || !password){
        toast.error("Email or Password is required!")
        return
    }
    setLoadingAPI(true)
    let res = await loginApi(email.trim(), password)
    if(res && res.token){
      loginContext(email, res.token)
      navigate("/")
    }else{
      if(res && res.status === 400){
        toast.error(res.data.error)
      }
    }
    setLoadingAPI(false)
  }

  const handleGoBack = () => {
    navigate("/")
  }
  const handlePressEnter = (event) => {
    if(event && event.key === "Enter"){
      handleLogin()
    }
  }
  return (
    <div className='login-container col-12 col-sm-4'>
        <div className='title'>Log in</div>
        <div className='text'>Email or username (eve.holt@reqres.in)</div>
        <input type='text' placeholder='Email or username' value={email} onChange={(event)=> setEmail(event.target.value)}/>
        <div className='input-password'>
            <input 
            type={isShowPassword === true ? "text" : "password"}
            placeholder='Password'  
            value={password} 
            onChange={(event)=> setPassword(event.target.value)} 
            onKeyDown={(event) => handlePressEnter(event)}
            />
            <i className={isShowPassword === true ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
            onClick={() => setIsShowPassWord(!isShowPassword)}
            ></i>
        </div>
        <button className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        onClick={() => handleLogin()}
        > {loadingAPI && <i className="fas fa-sync fa-spin"></i>} &nbsp;Login</button>
        <div className='back'>
        <i className="fa-solid fa-chevron-left"></i>
        <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
        </div>
    </div>
  )
}

export default Login