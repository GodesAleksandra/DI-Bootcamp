const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

const ACCESS_SECRET = 'fallback_secret_key';
const REFRESH_SECRET = 'refresh_secret_key';

const generateAccessToken = (userId, username) => {
    return jwt.sign({ id: userId, username: username }, ACCESS_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (userId, username) => {
    return jwt.sign({ id: userId, username: username }, REFRESH_SECRET, { expiresIn: '7d' });
};

const setTokenCookies = (res, accessToken, refreshToken) => {
    res.cookie('token', accessToken, { 
        httpOnly: true, 
        maxAge: 15 * 60 * 1000 
    });
    res.cookie('refreshToken', refreshToken, { 
        httpOnly: true, 
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });
};

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || username.trim() === "") {
        return res.status(400).json({ error: "Username is required." });
    }
    if (username.length < 3 || username.length > 20) {
        return res.status(400).json({ error: "Username must be between 3 and 20 characters long." });
    }
    
    // Regular expression: Only allows English letters (A-Z, a-z) and digits (0-9)
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
        return res.status(400).json({ error: "Username can only contain alphanumeric characters (letters and numbers)." });
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
        return res.status(400).json({ error: "Please provide a valid email address." });
    }

    if (!password) {
        return res.status(400).json({ error: "Password is required." });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters long." });
    }

    // Test individual character requirements using regex tests
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit     = /[0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasDigit) {
        return res.status(400).json({ 
            error: "Password must contain at least one uppercase letter, one lowercase letter, and one number." 
        });
    }

    try {
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ error: 'A user with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, passwordHash]
        );

        const registeredUser = newUser.rows[0];

        const accessToken = generateAccessToken(registeredUser.id, registeredUser.username);
        const refreshToken = generateRefreshToken(registeredUser.id, registeredUser.username);

        setTokenCookies(res, accessToken, refreshToken);

        return res.status(201).json({
            message: 'User registered successfully!',
            user: registeredUser 
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error during registration.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password.' });
    }

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const accessToken = generateAccessToken(user.id, user.username);
        const refreshToken = generateRefreshToken(user.id, user.username);

        setTokenCookies(res, accessToken, refreshToken);
        
        return res.status(200).json({
            message: 'Login successful!',
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error during login.' });
    }
});

router.post('/refresh', async (req, res) => {
    let  refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    refreshToken = refreshToken.replace(/^refreshToken=/i, '').trim().replace(/^["']|["']$/g, '');

    try {
        const blacklistCheck = await pool.query(
            'SELECT id FROM revoked_tokens WHERE TRIM(token_string) = $1', 
            [refreshToken]
        );

        if (blacklistCheck.rows.length > 0) {
            return res.status(403).json({ message: 'This refresh token has been revoked. Please log in again.' });
        }

        jwt.verify(refreshToken, REFRESH_SECRET, (err, decodedUser) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid refresh token' });
            }

            const newAccessToken = generateAccessToken(decodedUser.id, decodedUser.username);

            res.cookie('token', newAccessToken, { 
                httpOnly: true, 
                maxAge: 15 * 60 * 1000 // 15 минут
            });

            return res.status(200).json({ message: 'Token refreshed successfully!' });
        });

    } catch (err) {
        console.error('Error during token refresh check:', err);
        return res.status(500).json({ error: 'Server error during token refresh.' });
    }
});


router.post('/logout', async (req, res) => {
    let refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
        refreshToken = refreshToken.replace(/^refreshToken=/i, '').trim().replace(/^["']|["']$/g, '');

        try {
            await pool.query(
                'INSERT INTO revoked_tokens (token_string) VALUES ($1) ON CONFLICT DO NOTHING',
                [refreshToken]
            );
        } catch (err) {
            console.error('Error revoking token during logout:', err);
        }
    }

    res.clearCookie('token');
    res.clearCookie('refreshToken');

    return res.status(200).json({ 
        message: 'Logged out successfully! Refresh token invalidated and cookies cleared.' 
    });
});


module.exports = router;
