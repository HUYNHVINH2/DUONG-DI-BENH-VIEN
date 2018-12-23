var express = require("express");
var app     = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const Graph = require('node-dijkstra');
let route = new Graph();

const LOCATION_MODEL = require('./models/location');
const NAV_LOCATION_MODEL = require('./models/nav_location');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/*app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
});*/

app.post('/add-location', async (req, res) => {
  let { title, desciption } = req.body;
  let insertLocation = await LOCATION_MODEL.insert(title, desciption);
  res.json(insertLocation);
});


app.post('/add-nav-location', async (req, res) => {
  let { startPoint, endPointID, endPointDistance, endPointDescription } = req.body;
  let insertNavLocation = await NAV_LOCATION_MODEL.insert(startPoint, endPointID, endPointDistance, endPointDescription);
  res.json(insertNavLocation);
});

app.get('/list-nav-location', async (req, res) => {
  let listNav = await NAV_LOCATION_MODEL.getList();
  res.json(listNav)
});

app.get('/view-map/:startPoint/:endPoint', async (req, res) => {
  let { startPoint, endPoint } = req.params;
  // let mapResult = await NAV_LOCATION_MODEL.getMap(startPoint, endPoint);
  // res.json(mapResult);
  let listNav = await NAV_LOCATION_MODEL.getList();

  listNav.data.forEach(itemStartPoint => {
      let item = new Map();
      itemStartPoint.endPoint.forEach(itemEndPoint => {
          item.set(String(itemEndPoint.id), parseInt(itemEndPoint.distance));
      });
      route.addNode(String(itemStartPoint.startPoint), item);
  });
  console.log(route);
  console.log(route.path(startPoint, endPoint ));
});

const url="mongodb://localhost:27017/phongkham";
mongoose.connect(url, { useNewUrlParser:true });
mongoose.connection.once("open", ()=>{ 
  app.listen(3000, () => {
    console.log("server start on port 3000");
  })
})
