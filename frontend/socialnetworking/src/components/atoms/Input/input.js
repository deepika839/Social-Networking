import React from "react";
 
const TextInput =({placeholder,type="text", value, onChange ,labelName=""})=>{
    return <div className="">
        <label className="sr-only">{placeholder}</label>
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
};
 
export default TextInput;