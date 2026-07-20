const express = require('express');
const bookRoutes = require('./server/routes/bookRoutes');

const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Main Books API Routes
app.use('/api/books', bookRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});