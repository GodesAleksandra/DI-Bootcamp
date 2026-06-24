const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to the home page!');
});

router.get('/about', (req, res) => {
    res.send('This page with information about us.');
});

module.exports = router;