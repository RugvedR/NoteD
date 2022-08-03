import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './styles/Signup.css'
import signupLogo from '../mainlogo1.png'


const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email:"", password:"", cpassword: ""});
  let navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json)
    if(json.success){
      //save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/")
      props.showAlert("Account created Successfully", "success");
    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }

  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }
  return (
    <div className='cont-signup' >
      <div className="cont1-signup">
          <img className='signup-logo' src={signupLogo} alt="" />
          <div className="text-signup">
            <h1>Create an Account </h1>
            <h1>And Get Started with <span className='logotext' >Noted.</span></h1>
          </div>
          <div className="mt-3">
            Already have an account?<span><Link className='signupLink' to='/login' >Log in</Link> </span>
          </div>
      </div>

      <div className="signup-card">
      
      <h2>Create a Noted account</h2>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">Name</label>
          <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name='name' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password'  minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} id="cpassword" name='cpassword' minLength={5} required  />
        </div>
        
        <button type="submit" className="button-25"  >Create account</button>
      </form>

      </div>
    </div>
  )
}

export default Signup
