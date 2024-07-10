const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'chatapp'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Allow requests from any origin
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to fetch all messages in ascending order
app.get('/messages', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY reg_date ASC';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json(results);
        }
    });
});

// Endpoint to clear all messages
app.post('/clear-history', (req, res) => {
    const query = 'DELETE FROM messages';
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            io.emit('history-cleared'); // Broadcast event to all clients
            res.status(200).json({ message: 'Chat history cleared successfully' });
        }
    });
});

app.post('/send', (req, res) => {
    const { username, message } = req.body;
    const query = 'INSERT INTO messages (username, message) VALUES (?, ?)';

    db.query(query, [username, message], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            io.emit('message', { username, message }); // Broadcast the message
            res.status(200).json({ message: 'Message saved' });
        }
    });
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
});
