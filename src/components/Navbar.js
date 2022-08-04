import React from 'react'
import {Link, useLocation, useNavigate} from  "react-router-dom";
import './styles/Navbar.css'
import Logo from '../mainlogo3.png'

const Navbar = () => {

    document.onreadystatechange = function(){
      let lastScrollPosition = 0;
      const navbar = document.querySelector('.navb');
      window.addEventListener('scroll', function(e) {
        lastScrollPosition = window.scrollY;
        
        if (lastScrollPosition > 10)
          navbar.classList.add('navbar-scrolled');
        else
          navbar.classList.remove('navbar-scrolled');
      });
    }
  

  let location = useLocation();
  let navigate = useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <>
    
    <nav>
      <div className="cont">
        <div className="navb">
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>

          <div className="mainMenu">
            <div className="menu">
              <ul>
                <li  ><Link className={`${location.pathname==="/"? "activeItem" : ""}`} to="/">Notes</Link></li>
                <li  ><Link className={`${location.pathname==="/about"? "activeItem" : ""}`} to="/about">About</Link></li>
              </ul>
            </div>
            <div className="login-signup-area">
            {!localStorage.getItem('token')? <form className="buttons" role="search">
                <Link className="button-24" to="/login" role="button">Log in</Link>
                <div className="divider"></div>
                <Link className="button-25" to="/signup" role="button">Get Started Now</Link>
            </form>: <button className="button-25" onClick={handleLogout} >Logout</button>}
            </div>
          </div>
        </div>
      </div>
    </nav>


    {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">NoteD</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"? "active" : ""}`} aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"? "active" : ""}`} to="/about">About</Link>
                </li>
                
                
            </ul>
            {!localStorage.getItem('token')? <form className="d-flex" role="search">
                <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
            </form>: <button className="btn btn-primary" onClick={handleLogout} >Logout</button>}
            </div>  
        </div>
    </nav> */}
    </>
  )
}

export default Navbar


