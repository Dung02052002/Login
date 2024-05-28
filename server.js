const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup'
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO `login`(`name`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [name, email, password];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error inserting data into the database' });
        }

        return res.status(200).json({ message: 'Signup successful' });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    connection.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error' });
        }
  
        if (result.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        return res.status(200).json({ message: 'Login successful' });
    });
  });

const port = 8089;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});