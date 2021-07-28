// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
const path = require('path');
app.use('/', express.static(path.join(__dirname + '/public')));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:timeStamp',async (req,res)=>{
  try{
    let {timeStamp} = req.params;
    let result = {"unix":(new Date()).getTime(),"utc":new Date()}
    if(!timeStamp){
      return res.status(200).json(result);
    }
    timeStamp = isNaN(+timeStamp) ? timeStamp : +timeStamp; 
    let date = new Date(timeStamp);
    if(date == "Invalid Date"){
      throw {message:'Invalid Date',status:400};
    }
    result = {"unix":date.getTime(),"utc":`${date.toUTCString()}`}
    return res.status(200).json(result);

  }catch(error){
    return res.status(error.status || 500).json({error:error.message})
  }
})

app.get('/api',async (req,res)=>{
  try{
    let result = {"unix":(new Date()).getTime(),"utc":(new Date()).toUTCString()}
    return res.status(200).json(result);
  }catch(error){
    return res.status(error.status || 500).json({error:error.message})
  }
})


// listen for requests :)
process.env.PORT = 4000;
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
