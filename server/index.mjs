import express from 'express';
import dotenv from "dotenv"
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import routes from './route.mjs';

import cors from 'cors';

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express();
const uri = process.env.ATLAS_URI

// CORS setup
const corsOptions = {
  origin: '*',
  credentials:true,
  optionSuccessStatus:200,
}
app.use(cors());

// mongo connection
mongoose.Promise = global.Promise;

// recipesDB mongoose connection
mongoose.connect(
    uri,
    {
        maxPoolSize: 50, 
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

routes(app);
//routesComment(app);

app.get('/', (req, res) => {
    res.send(`Recipe App is running ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Recipe App is running on port ${PORT}`);
});