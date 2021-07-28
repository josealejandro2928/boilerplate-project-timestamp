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
app.use(express.static('public'));

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
    if(!timeStamp){
      throw {message:'Time staps is required',status:400}
    }
    timeStamp = isNaN(+timeStamp) ? timeStamp : +timeStamp; 
    let date = new Date(timeStamp);
    let result = {"unix":date.getTime(),"utc":`${date}`}
    return res.status(200).json(result);

  }catch(error){
    return res.status(error.status || 500).json({message:error.message})
  }
})



// listen for requests :)
process.env.PORT = 4000;
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
