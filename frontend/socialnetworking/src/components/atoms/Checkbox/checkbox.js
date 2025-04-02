import React from "react";
 
const Checkbox=({label, checked, onChange})=>{
    return (<label>
        <input className="" type="checkbox" checked={checked} onChange={onChange} />
        {label}
    </label>);
};
 
export default Checkbox;