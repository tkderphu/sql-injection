import React, { useState } from "react";
function BlindInjection() {
    const [username, setUsername] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false)
    const checkUser =  (endpoint) => {
        setLoading(true)
        fetch(`http://localhost:3001/${endpoint}?username=${username}`)
        .then(res => res.json()).then(data => {
            setResponse(data);
            setLoading(false)
        });
       
    };

    return (
        <div>
            <h1>Advanced Blind SQL Injection Demo</h1>
            <input type="text" className="form-group p-3 w-100"  value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
            <button className="btn btn-primary w-100 mt-3"  onClick={() => checkUser("user")}>Boolean-Based</button>
            <button className="btn btn-primary w-100 mt-3"  onClick={() => checkUser("time")}>Time-Based</button>
            <button className="btn btn-primary w-100 mt-3" onClick={() => checkUser("union")}>Union-Based</button>
            <button className="btn btn-primary w-100 mt-3" onClick={() => checkUser("error")}>Error-Based</button>
            <button className="btn btn-primary w-100 mt-3" onClick={() => checkUser("blind")}>Blind Extraction</button>
            <button className="btn btn-primary w-100 mt-3" onClick={() => checkUser("secure")}>Secure</button>
            {loading && <div className="spinner-border mt-3" role="status"></div>}
            {response !== null && <p>Response: {JSON.stringify(response)}</p>}
        </div>
    );
}
export default BlindInjection