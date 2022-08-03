import React from "react";
import './styles/Alert.css'


const Alert = (props) => {
  const capitalize = (word)=>{
    if(word==="danger"){
      word="error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div className="alert-area" >
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
       <strong>{capitalize(props.alert.type)}:</strong> {props.alert.msg} 
    </div>}
    </div>
  )
};

export default Alert;
