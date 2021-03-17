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
    
//Home page route
app.get('/', (req, res)=>{
    res.render('Home')
})

app.get('/Church', (req, res)=>{
    res.render('Church')
})
//get users messages
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

//Data from Form entry and save into mongobd atlas
app.post("/ContactUs", function(req, res){
    const church = new Church({
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      shortmessage:req.body.shortMessage
 
    });

    church.save(function(err){
      if (!err){
          res.redirect("/");
      }
    });
  });


//Delete a post
app.post('/delete', (req,res)=>{
    const postDel = req.body.removePost;
    Church.findByIdAndRemove(postDel, (err)=>{
      if(!err){
        console.log('Successfully deleted the post')
      }
      res.redirect('/Messages')
    })
  
  })


const port = process.env.PORT ||   3000
app.listen(port, () => console.log(`church app listening at http://localhost:${port}`))
