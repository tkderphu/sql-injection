const express = require('express');
const cors = require('cors');
import db from './server';
const app = express();
app.use(cors());
app.use(express.json()); // Để xử lý JSON từ body request

app.post('/login', (req, res) => {
  const { id, pass } = req.body;
  const sql = "select u from user u where username =" + id + "and pass=" + pass;
  db.query(sql, [id, pass], (err, result) => {
    console.log('123');
    if (err) {
      console.error('Lỗi khi select:', err);
      return res.status(500).json({ error: 'Lỗi khi lưu dữ liệu' });
    }

    res.json({ result });
  });
});

app.listen(5000, () => {
  console.log('Backend chạy ở http://localhost:5000');
});