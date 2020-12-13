const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const ejs = require("ejs");
//const mongoose = require('mongoose');
//require('dotenv').config({path: __dirname + '/.env'});
//const BAMBI_CONNECT = process.env.BAMBI_CONNECT
//app.set('view engine', 'ejs');
//app.use(express.static("public"));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static("public"));



app.get('/', (req, res) =>{ 
    
   res.send("It's  now working")
    });

   


const port = process.env.PORT ||   3000
app.listen(port, () => console.log(`church app listening at http://localhost:${port}`))
