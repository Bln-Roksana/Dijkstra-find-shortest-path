const fs = require('fs');
let tempEdgeArray=[];
let nodeArray=[];
let edgeArray=[];
let finalArray;


function getTheData(){
    try {
        let data = fs.readFileSync('./citymapper-coding-test-graph.dat', 'utf8');
        let array=data.split("\n");
        //
        for (let i=1; i<=Number(array[0]); i++){
            nodeArray.push({id: array[i].replace("\r",""),group: 1})

        }
        console.log("I am here");
        for (let i=Number(array[0])+2; i<array.length-1; i++){
            tempEdgeArray.push(array[i].replace("\r",""))
        }
        tempEdgeArray.forEach(e => {
            //let items=e.split(" ");
            let item=e.split(" ");
            edgeArray.push({source: item[0], target: item[1], value: item[2]})
        })
  
    } catch(e) {
        console.log('Error:', e.stack);
    }
    finalArray={nodes: nodeArray, links: edgeArray}
    //console.log(edgeArray);
}

function writeItOut(){
    const nodeJSON = JSON.stringify(finalArray);
    fs.writeFile('./nodesToPlot.json', nodeJSON, function (err) {
        console.log("I am writting out nodes");
      if (err) return console.log(err);
    });

}

function run(){
    getTheData();
    writeItOut();
}

run();