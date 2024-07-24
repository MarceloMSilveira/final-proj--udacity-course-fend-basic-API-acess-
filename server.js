const port = 3000;
const today = new Date();
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));

//data for test:
projectData.temperature = 20;
projectData.date = today.toDateString();
projectData.userResp = "Me sinto bem";

app.get('/test',(req,res)=>res.send(projectData));

app.post('/',(req,res)=>{
    const recievedData = req.body;
    console.log(recievedData.userResp);
    projectData = recievedData;
    res.send('post recieved')
})


// Setup Server
app.listen(port, ()=>console.log(`Server running on port ${port}`))