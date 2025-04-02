import React from "react";
 
const Link = ({text, href="#", onClick})=>{
    return <a href={href} onClick={onClick}>{text}</a>
};
 
export default Link;