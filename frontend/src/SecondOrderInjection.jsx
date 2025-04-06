import { useEffect, useState } from "react";
import axios from "axios";
const DK = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const role = 'user';
    const handle = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/register", { username, password }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            alert(res.data.message);
            localStorage.setItem("user", JSON.stringify({ username, password, role }));
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <form onSubmit={handle}>
                <h1>Đăng ký</h1>
                <label>Tên đăng nhập: <input type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} /></label><br />
                <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><br />
                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
}
const Hien = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (!user) return;
        const username=user.username;
        const lay = async () => {
            try {
                const res = await axios.post("http://localhost:5000/tim", {username}, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                console.log(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        lay();
    }, []);
    return (
        <div>
            <p>hello</p>
        </div>
    )
}
function SecondOrderInjection() {
    const [bam, setBam] = useState(<DK />);
    const Bam = ({ v }) => {
        if (v === '1') setBam(<DK />)
        else setBam(<Hien />);
    }
    return (
        <div>
            <button type="button" onClick={() => Bam({ v: '1' })}>Đăng ký</button>
            <button type="button" onClick={() => Bam({ v: '2' })}>Xem thông tin</button>
            {bam}
        </div>
    );
}
export default SecondOrderInjection