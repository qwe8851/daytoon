require('dotenv').config();

// DEPENDENCIES
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Cors for Ajax
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'daytoon-project/build')));

// Connection to MongoDB 
require('./config/mongo-db');

// ROUTERS
app.use('/main', require('./routes/main'));
app.use('/member', require('./routes/member'));

app.listen(port, () => console.log(`Server listening on port ${port}`));

// Serve React app
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'daytoon-project/build/index.html'));
});

// Handle other routes with React Router (제일 하단 위치)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'daytoon-project/build/index.html'));
});