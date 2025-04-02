import React from 'react';
 
const Button = ({ label, onClick, type="button"}) => {
  return <button className="btn btn-default" type={type} onClick={onClick}>{label}</button>
};
 
export default Button;