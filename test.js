const Graph = require('node-dijkstra');
const NAV_LOCATION_MODEL = require('./models/nav_location'); 

const route = new Graph()

// data.forEach(itemStartPoint => {
//     const item = new Map();
//     itemStartPoint.endPoint.forEach(itemEndPoint => {
//         item.set(itemEndPoint.id, itemEndPoint.distance);
//     });
//     route.addNode(itemStartPoint.startPoint, item);
// });
