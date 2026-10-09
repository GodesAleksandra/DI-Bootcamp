const express = require('express');
const app = express();
const port = 3000;
const { Pool } = require('pg');

const authMiddleware = require('./authMiddleware');
const authRouter = require('./auth');

const cookieParser = require('cookie-parser'); // Import cookie-parser
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);

// Public route accessible without authentication
app.get('/', (req, res) => {
  res.send('Hello, JWT Authentication!');
});

// Protected route that requires authentication
app.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}!` });
});

app.put('/profile', authMiddleware, async (req, res) => {
  const { username, email } = req.body;
  const userId = req.user.id; 

  if (!username || username.trim() === "") {
    return res.status(400).json({ error: "Username cannot be empty." });
  }
  if (!email || !email.includes("@") || !email.includes(".")) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  try {
    const emailCheck = await pool.query(
      'SELECT id FROM users WHERE email = \$1 AND id != \$2', 
      [email, userId]
    );
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "This email is already in use by another account." });
    }

    const updateResult = await pool.query(
      `UPDATE users 
       SET username = $1, email = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3 
       RETURNING id, username, email`,
      [username, email, userId]
    );

    return res.status(200).json({
      message: "Profile updated successfully!",
      user: updateResult.rows[0]
    });

  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({ error: "Server error during profile update." });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});