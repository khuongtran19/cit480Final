require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cors())
const morgan = require('morgan');
const dbconnection = require("./database")
const user = require('./Controllers/user')
const oxyy = require('./Controllers/oxyee')



dbconnection();

app.use('/profile', express.static('upload'));
app.use('/oxy',oxyy)
app.use('/api',user)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log('your server runing at', + PORT);
});