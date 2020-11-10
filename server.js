// Setup empty JS object to act as endpoint for all routes
projectData = {};
dataKeys = []
// Require Express to run server and routes
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser')
const express = require('express')
var cors = require('cors')

// Start up an instance of app
const app = express()
const port = 3000

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors("*"))

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.get('/api/data' , (req, res)=>{
  res.send(projectData[dataKeys.slice(-1)[0]])
})

app.post("/api/add",(req , res)=>{
  try{
    const key =  uuidv4()
    projectData[key]= req.body
    res.send(req.body)
    dataKeys.push(key)
  }catch(err){
    console.log(err);
    res.send("fail")
  }
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})


