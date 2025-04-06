import { useState } from "react";
import axios from "axios";
function BasicInjection() {
    const [id,setId]=useState(null);
    const [pass,setPass]=useState(null);
    const [role,setRole]=useState(null);
    const handle=async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/login",{id,pass},{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const user=res.data.result;
            setRole(user[0].role);
            localStorage.setItem("user",JSON.stringify(user[0]));
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div>
            <form onSubmit={handle}>
                <h1>Login</h1>
                <input type="text" value={id} onChange={(e)=>{setId(e.target.value)}}/>
                <br/>
                <input type="password" value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
                <br/>
                <button type="submit">Login</button>
            </form>
            <p>{role}</p>
        </div>
    );
}
export default BasicInjection