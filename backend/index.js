// backend/server.js (Express + MySQL)
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // Change as needed
  database: "sqlInjection",
  multipleStatements: true
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.use(cors());
app.use(express.json());

// Boolean-Based Blind SQL Injection
app.get("/user", (req, res) => {
  const username = req.query.username;
  const sql = `SELECT * FROM users WHERE username = '${username}'`;
  db.query(sql, (err, result) => {
    if (err) {
        res.json({err: err})
        return;
    }
    res.json({ exists: result.length > 0 });
  });
});

// Time-Based Blind SQL Injection (Delayed response if username exists)
app.get("/time", (req, res) => {
  const username = req.query.username;
  const sql = `SELECT * FROM users WHERE username = '${username}'`;
  db.query(sql, (err, result) => {
    if (err) {
        res.json({err: err})
        return;
    }
  });
});

// Union-Based SQL Injection (Extracts full database info)
app.get("/union", (req, res) => {
  const username = req.query.username;
  const sql = `SELECT id, username, password FROM users WHERE username = '${username}'`;
  db.query(sql, (err, result) => {
    if (err) {
        res.json({err: err})
        return;
    }
    res.json(result);
  });
});

// Error-Based SQL Injection (Forces error to leak database info)
app.get("/error", (req, res) => {
  const username = req.query.username;
  const sql = `SELECT * FROM users WHERE username = '${username}' AND 1=CONVERT(int, (SELECT @@version))`;
  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: err.message }); // Return database error
    } else {
      res.json(result);
    }
  });
});

// Blind Data Extraction (Extracts one character at a time)
app.get("/blind", (req, res) => {
  const username = req.query.username;
  const position = req.query.position || 1;
  const ascii = req.query.ascii || 97;
  const sql = `SELECT * FROM users WHERE username = '${username}' AND ASCII(SUBSTRING(password, ${position}, 1)) = ${ascii}`;
  db.query(sql, (err, result) => {
    if (err) {
        res.json({err: err})
        return;
    }
    res.json({ match: result.length > 0 });
  });
});

// Secure Route (Using Prepared Statements & Hashed Passwords)
app.get("/secure", (req, res) => {
  const username = req.query.username;
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, result) => {
    if (err) {
        res.json({err: err})
        return;
    }
    res.json({ exists: result.length > 0 });
  });
});


app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.query(sql, [username, password], (err) => {
    if (err) return res.status(500).send(err);
    res.send("User registered.");
  });
});

// Search user (simulates vulnerable query)
app.get("/api/search", (req, res) => {
  const { q } = req.query;
  const sql = `SELECT * FROM users WHERE username = '${q}'`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
