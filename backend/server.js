require('dotenv').config();
const express = require('express');
//const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

//set up express
const app = express()
//Setup middlewares
app.use(cors());
app.use(express.json());

//Setup Routes
app.use('/api/todos', require('./routes/Todo'))

//connect Database
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log('Database is connected')}).catch((err)=>{console.log('Database Connection Error', err)});


//Start Server
app.listen(process.env.PORT, ()=>{console.log(`Server listening on port ${process.env.PORT}`)});
