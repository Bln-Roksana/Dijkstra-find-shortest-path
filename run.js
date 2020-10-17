const fs = require('fs');
let nodeMap=new Map();
let edgeArray=[];
let nodeArray=[];
let uncheckedNodes=[];
let scoredNodes=[];
let start = new Date().getTime();



function getTheData(){
    try {
        let data = fs.readFileSync('./Island_test.txt', 'utf8');
        let array=data.split("\n");
        //
        for (let i=1; i<=Number(array[0]); i++){
            nodeArray.push(array[i].replace("\r",""))
            nodeMap.set(array[i].replace("\r",""), {node:array[i].replace("\r",""), connections:[]});
        }

        for (let i=Number(array[0])+2; i<array.length-1; i++){
            edgeArray.push(array[i].replace("\r",""))
        }
  
    } catch(e) {
        console.log('Error:', e.stack);
    }
    makeMap(edgeArray);
}


function makeMap(edgeArray){
    const maxInt=Number.MAX_SAFE_INTEGER;

    edgeArray.forEach(e => {
        let items=e.split(" ");
        nodeMap.get(items[0]).connections.push({node: items[1], distance: items[2]})
        nodeMap.get(items[1]).connections.push({node: items[0], distance: items[2]})
    })

    nodeArray.forEach(e => {
        scoredNodes.push({node:e, distance:maxInt, checked:false})
        uncheckedNodes.push(e);
    })
}

function findTheShortest(nodeStart, nodeEnd){
    let checkedNodes=[];
    let nodeCurrent=nodeStart.toString();
    nodeEnd=nodeEnd.toString();
    let cumulativeDist=0;
    let nextNode;
    let nextDistance;

    let indexOfFirstNode=scoredNodes.map(e => e.node).indexOf(nodeCurrent);
    scoredNodes[indexOfFirstNode].distance=0;
    scoredNodes[indexOfFirstNode].checked=true;

    while (uncheckedNodes.length>0){
        checkedNodes.push(nodeCurrent); //push in node I am on 
        //console.log("Current node is: ", nodeCurrent, " and ", uncheckedNodes.length, " nodes left.");
        let index=uncheckedNodes.indexOf(nodeCurrent)
        uncheckedNodes.splice(index,1)//I need to pop out the node I am on
        scoredNodes.find(e => e.node===nodeCurrent).checked=true;//get checked to true now
        let maxDistance=Number.MAX_SAFE_INTEGER;

        for (let i=0; i<nodeMap.get(nodeCurrent).connections.length; i++){
            let connectingNodeInfo=nodeMap.get(nodeCurrent).connections[i]

            let connectingNode=connectingNodeInfo.node
            let index=uncheckedNodes.indexOf(connectingNode)
            if(index===-1){ //node no longer in the table - already checked                    

            }else{
                // insert new dist value
                let cNode=scoredNodes.find(e => e.node===connectingNode)
                if(cNode.distance>cumulativeDist + Number(connectingNodeInfo.distance)){
                    cNode.distance=cumulativeDist + Number(connectingNodeInfo.distance) // I change it only if its smaller than what was there
                } 
            }        
            //get the smallest distance now from all unchecked nodes
            scoredNodes.forEach(e => {
                if (e. checked===false){
                    if (e.distance<=maxDistance){
                        nextNode=e.node;
                        nextDistance=e.distance;
                        maxDistance=e.distance;
                    }
                }
            });
        }

        nodeCurrent=nextNode;
        cumulativeDist=nextDistance;

    }
    if((scoredNodes.find( e => e.node===nodeEnd).distance)===(Number.MAX_SAFE_INTEGER)){
        console.log("No path possible between these two nodes.");
    }else{
        console.log("Cumulative distance is: ", scoredNodes.find( e => e.node===nodeEnd).distance);
    }

    let end = new Date().getTime();
    console.log("It took ", Math.floor(((end-start) % (1000 * 60)) / 1000), " seconds to run");
}

function runMeHere(nodeA, nodeB){
    getTheData();
    findTheShortest(nodeA, nodeB);
}

//runMeHere("a", "e"); 
//runMeHere(nodeA, nodeB);
//runMeHere(316722624, 36307089);
runMeHere("a", "i");