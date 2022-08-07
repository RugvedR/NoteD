import React from 'react'
import './styles/About.css'
import { ReactComponent as About1SVG } from '../file-and-folder.svg';
import { ReactComponent as About2SVG } from '../files-and-docs.svg';
import { ReactComponent as About3SVG } from '../web-security.svg';


// import Navbar from './Navbar'

const About = () => {

  return (
    <div>
      <div className="main-about">
        <div className="about-row">
          <div className="content-left"> <About2SVG/> </div>
          <div className="content-right content-text color-1 "><div><h2>A Digital Note platform</h2> <br /><h2>Sync your notes over the cloud. And access them Anywhere.</h2>   </div> </div>
        </div>
        <div className="about-row">
          <div className="content-right content-text color-2 "> <h2>Get all your notes in one place. <br /><br />Keep them <span className='logoname' >Noted.</span></h2></div>
          <div className="content-left"> <About1SVG/> </div>
        </div>
        <div className="about-row">
          <div className="content-left "> <About3SVG/> </div>
          <div className="content-right content-text color-3 "><div><h2>Secure</h2> <br /><h2>User Authentication ensures safety. Easily store and access your important notes.</h2>   </div> </div>
        </div>
        
      </div>
    </div>
  )
}

export default About
