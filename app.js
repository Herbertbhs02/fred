const express = require('express')
const bodyParser = require('body-parser')
//const date = require(__dirname + "/date.js");

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get('/', (req, res) =>{ 
    
   res.send("It's  now working")
    });

   


const port = process.env.PORT ||   3000
app.listen(port, () => console.log(`church app listening at http://localhost:${port}`))
