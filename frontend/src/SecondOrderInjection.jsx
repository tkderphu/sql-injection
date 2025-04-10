import { useState } from "react";
import axios from "axios";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister =  () => {
        axios.post("http://localhost:3001/api/register", {
            username,
            password,
        }).then(res => {
            alert("User registered.");
        }).catch(err => {
            console.log("err: ", err)
        })
       
    };

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}


function SearchUser() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:3001/api/search?q=${encodeURIComponent(query)}`);
    console.log("Dsdsd data: ", res)
    setResults(res.data);
  };

  return (
    <div>
      <h2>Search User</h2>
      <input placeholder="Search username" onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((user, i) => (
          <li key={i}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}


function SecondOrderInjection() {
    return <div>
        <RegisterForm/>
        <SearchUser/>
    </div>
}
export default SecondOrderInjection