require('dotenv').config();
const express = require("express");
const cors = require("cors");
const catchError = require("./lib/catch-error");
const generateURLOfLen = require("./utils/genUrl")

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get("/", (req, res) => {
  // res.render('index');
});

app.get('/', (req, res) => {
  const headers = req.rawHeaders
  const method = JSON.stringify(req.method);
  const url = JSON.stringify(req.url);


  console.log("url from req", url);
  console.log("method from req", method);
  console.log("headers from req", headers);
  res.send(req.body);  
}); 

app.get('/createBin', catchError(async (req, res) => {
    // create new random URL
    const newURL = generateURLOfLen(8);
    
    // DB: send new URL to DB, await confirmation
    
    // redirect to the newly created route + ?inspect
  })
); 

app.all("/bin/:reqBinURL", catchError(async (req, res, next) => {
    const binURL = req.params.reqBinURL;
    const toInspect = req.query.inspect === '';

    if (toInspect) {
      //execute this if the path includes "?inspect"
      console.log("inspecting success!")
      console.log("params binURL", binURL);
    } else  {
      //execute this for ALL other paths
      console.log("ALL other request paths", binURL);
      res.send(req.body); 
    }
  })
);

// app.get('/bin/:reqBinURL', (req, res) => {
   
// }); 



// Error handler
app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
});

app.listen(port, () => {
  console.log(`The server is looking to SNAGGL requests on port ${port} ...`);
});
