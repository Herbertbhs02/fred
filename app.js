const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'});
const BAMBI_CONNECT = process.env.BAMBI_CONNECT
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//mongoose.connect:Connecting to cloud mongoDB atlas 
mongoose.connect(BAMBI_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
   (error)=>console.log(`Connection requested`))

   const churchSchema = {
            firstname: String,
            lastname: String,
            email:String,
            shortmessage:String
  };
  const Church = mongoose.model("Church", churchSchema);

    //Fetching data from mongoDB and render it in message page
    app.get("/Messages", function(req, res){

        Church.find({}, function(err, churches){
          res.render("Messages", {
            messages: churches
            
            });
        });
      });
    

app.get('/', (req, res)=>{
    res.render('Home')
})

app.get('/Church', (req, res)=>{
    res.render('Church')
})

app.get('/Messages', (req, res)=>{
    res.render('Messages')
})

app.get('/Newsletter', (req, res)=>{
    res.render('Newsletter')
})

app.get('/MissionsOutreach', (req, res)=>{
    res.render('MissionsOutreach')
})

app.get('/ContactUs', (req, res)=>{
    res.render('ContactUs')
})


const port = process.env.PORT ||   3000
app.listen(port, () => console.log(`church app listening at http://localhost:${port}`))
