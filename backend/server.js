const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors()); // Cho phép frontend React gọi API
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'atbm'
});

db.connect((err) => {
  if (err) {
    console.error('Kết nối DB thất bại:', err);
    return;
  }
  console.log('Đã kết nối MySQL');
});
app.post('/login', (req, res) => {
  const { id, pass } = req.body;
  const sql = "select * from user where username ='" + id + "' and pass='" + pass + "'";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Lỗi khi select:', err);
      return res.status(500).json({ error: 'Lỗi khi lưu dữ liệu' });
    }

    res.json({ result });
  });
});
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  const sql = "insert into user ('pass','role','username') values ('" + password + "','user','" + username + "');"
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Lỗi khi lưu dữ liệu' });
    }
    res.json({ message: "Đã thành công" });
  })
});
app.post('/tim', (req, res) => {
  const {username} = req.body;
  const sql = "select * from user where username='" + username + "'";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Lỗi khi select:', err);
      return res.status(500).json({ error: 'Lỗi khi lưu dữ liệu' });
    }
    res.json({ result });
  })
});
app.get('/search',(req,res)=>{
  const {tk}=req.query;
  const sql = "select * from user where username='" + tk + "'";
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Lỗi khi select:', err);
      return res.status(500).json({ error: 'Lỗi khi lưu dữ liệu' });
    }
    res.json({ result });
  })
})
app.listen(5000, () => {
  console.log('Backend chạy ở http://localhost:5000');
});