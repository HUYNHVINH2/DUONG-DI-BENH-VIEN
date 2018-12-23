const Graph = require('node-dijkstra')

const route = new Graph()

var data ;
 

/*connect to mogodb */
var mongooes = 

//
function ADDNODE_(data)
{
    for(let i = 0 ;i < data.length;i++)
    {
        var khoangcach
        var tenvitri
        route.addNode(tenvitri,{khoangcach})
    }
}

 function lotrinh(lotrinh)
 {
    for(var i =0;i < lotrinh.length-1;i++)
    {
     console.log(route.path( lotrinh[i],lotrinh[i+1], { cost: true }));
    }
 }

route.addNode('A', { 'B':1 })
route.addNode('B', { 'A':1, 'C':2,'D': 4 })
route.addNode('C', { 'B':2})
route.addNode('D', { 'C':1, 'B':4 })

//route.addNode('C', { 'D':1})

/*
const c = new Map();
c.set('D',1);
route.addNode('C',c)*/
console.log(route);

 



