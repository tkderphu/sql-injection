import axios from "axios";
import { useState } from "react"

function ErrorBaseInjection() {
    const [tk,setTk]=useState(null);
    const handle=async (e)=>{
        e.preventDefault();
        try{
            const res=await axios.get("http://localhost:5000/search",{params: {
                tk
              }});
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    return (
    <div>
        <form onSubmit={handle}>
            <input type="text" value={tk} onChange={(e)=>{setTk(e.target.value)}}/>
            <button type="submit">Tìm kiếm</button> 
        </form>
    </div>)
}
export default ErrorBaseInjection