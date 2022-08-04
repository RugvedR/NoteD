import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './styles/Login.css'
import { ReactComponent as LoginSVG } from '../authentication.svg';
// import textLogo from '../Noted-written.png'
import Logo from '../mainlogo3.png'


const Login = (props) => {

  const [credentials, setCredentials] = useState({email:"", password:""});
  let navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/")
      props.showAlert(`Logged in Successfully as: ${credentials.email} `, "success");

    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }

  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  
  let location = useLocation();
  
  return (
    <div className='main-container ' >

{/* 
<nav>
      <div className="cont">
        <div className="navbr">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          
        </div>
      </div>
    </nav> */}

      <div className="cont0">
        <div className="cont1">
          <div className="text-cont">
            <h1>Welcome, </h1>
            <h2>Please Log in to get things <span className='logotext' >Noted.</span></h2>
          </div>
          
          <LoginSVG className='image' />
        </div>
        <div className="cont2">
          <div className="login-card">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
              </div>
              
              <button type="submit" className="button-25"  >Log in</button>
              <div className="mt-3">
                Don't have an account?<span><Link className='signupLink' to='/signup' >Create account</Link> </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default Login
