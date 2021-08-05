// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const port = 8080;

var app = express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, listening);
function listening() {
  console.log(`server running on : http://localhost:${port}`);
};

app.get("/all", (req, res) => {
  res.send(projectData);
});

app.post("/postData", (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    content: req.body.content
  };
  res.send(projectData);
});
