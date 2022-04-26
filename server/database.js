require('dotenv').config();
const mongoose = require("mongoose");


const dbconnection = (req, res) => {
    try {
           mongoose.connect("mongodb+srv://oxyy:SNh1uYjCUIVWAmyt@cluster0.j777s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Data Base connection successfull...');
    } catch (error) {
        console.log('Something wrong database connection Failed... ');
    }
}
module.exports = dbconnection;