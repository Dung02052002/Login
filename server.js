import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';


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

    // tao token
    const token = jwt.sign({email}, 'your_secret_token');
    const sql = "INSERT INTO `login`(`name`, `email`, `password`,`token`) VALUES (?, ?, ?, ?)";
    const values = [name, email, password, token];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error inserting data into the database' });
        }

        return res.status(200).json({ message: 'Signup successful', token: token });
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

        // tao token jwt
        const playload = {email: result[0].email}
        const token = jwt.sign(playload, 'your_secret_token');
  
        return res.status(200).json({ message: 'Login successful' + {token: token} });
    });
  });

const port = 8089;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
