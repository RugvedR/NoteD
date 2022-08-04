import React from 'react'
// import Navbar from './Navbar';
import Notes from './Notes';

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      {/* <Navbar/> */}
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
