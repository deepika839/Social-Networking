import React from "react";
 
const ImagePlaceholder=({src, alt="image", width="200px", height="50px"})=>{
    return <img src={src} alt={alt} style={{width, height}} onError={(e)=>(e.target.src='/placeholder.png')} />
};
 
export default ImagePlaceholder;