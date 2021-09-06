const express = require('express');
const env=require('dotenv')
const app = express();
const mongoose = require("mongoose");
//const bodyParser = require('body-parser');
// routes

//user routes
const authRoutes=require('./routes/auth')


env.config();

// add database
//mongodb+srv://<username>:<password>@cluster0.tynli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://ecommercialusers:198400@cluster0.1svh8.mongodb.net/ecommerce?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB database connected");
  }) 
app.use(express.json());
app.use('/api', authRoutes)
app.listen(process.env.PORT, () => { console.log(`Server is running on port ${process.env.PORT}`) });
 