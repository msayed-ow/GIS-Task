// Requiring module
const express = require('express');
const cors = require('cors');


const usersRouter = require('./src/routes/users');
const handleErrors = require('./src/middleware/handle-errors');

// Creating express object
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users/', usersRouter);
app.use(handleErrors);

// Port Number
const PORT = process.env.PORT || 5000;
// Server Setup
app.listen(PORT, console.log(
    `Server started on port ${PORT}`));