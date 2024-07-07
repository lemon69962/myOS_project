const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Use cors middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Your API endpoints
app.post('/api/messages', (req, res) => {
    // Handle saving message to the database (replace with your database logic)
    console.log('Received message:', req.body);
    res.status(200).send('Message received successfully');
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
