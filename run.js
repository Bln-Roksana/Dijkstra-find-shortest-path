const fs = require('fs');
let nodeMap=new Map();
let edgeArray=[];
let nodeArray=[];
let uncheckedNodes=[];
let scoredNodes=[];
let cumulativeDist=0;



function getTheData(){
    try {
        let data = fs.readFileSync('./Test_file.txt', 'utf8');
        //let array=data.toString().split("\n");
        let array=data.split("\n");
        //
        for (let i=1; i<=Number(array[0]); i++){
            nodeArray.push(array[i].replace("\r",""))
            nodeMap.set(array[i].replace("\r",""), {node:array[i].replace("\r",""), connections:[]});
        }

        for (let i=Number(array[0])+2; i<array.length-1; i++){
            edgeArray.push(array[i].replace("\r",""))
        }

        //console.log(nodeArray);
        //console.log("Edge array: ",edgeArray);
  
    } catch(e) {
        console.log('Error:', e.stack);
    }
    makeMap(edgeArray);
}


function makeMap(edgeArray){
    const x=Number.MAX_SAFE_INTEGER;
    //console.log ("When are you loggin me")
    edgeArray.forEach(e => {
        let items=e.split(" ");
        nodeMap.get(items[0]).connections.push({node: items[1], distance: items[2]})
        nodeMap.get(items[1]).connections.push({node: items[0], distance: items[2]})
    })

    nodeArray.forEach(e => {
        scoredNodes.push({node:e, distance:x})
        uncheckedNodes.push(e);
    })

    //console.log("Scored nodes: ",scoredNodes);
    //uncheckedNodes=edgeArray.map(e => e.split(" "))
    //console.log(nodeMap.get('36306910'));
    //mapToStr(nodeMap);
}

function findTheShortest(nodeStart, nodeEnd){
    let checkedNodes=[];
    let nodeInfo;
    
    //find nodes connected to starting node
    //console.log(nodeStart);
    let nodeCurrent=nodeStart.toString();
    //console.log(nodeCurrent);
    nodeEnd=nodeEnd.toString();
    //console.log(nodeEnd)
    let cumulativeDistance=0;
    let nextNode;
    let nextDistance;


    while (uncheckedNodes.length>1){
        checkedNodes.push(nodeCurrent); //push in node I am on 

        //console.log("First log: ", uncheckedNodes);
        let index=uncheckedNodes.indexOf(nodeCurrent)
        //console.log("First index is: ",index);
        uncheckedNodes.splice(index,1)//I need to pop out the node I am on
        //console.log("Second log: ", uncheckedNodes);
        let maxDistance=1000000;
        //console.log("Connections for current node: ", nodeMap.get(nodeCurrent).connections);     
    
        for (let i=0; i<nodeMap.get(nodeCurrent).connections.length; i++){
            let nodeInfo=nodeMap.get(nodeCurrent).connections[i]

            let nodeBeingChecked=nodeInfo.node
            //console.log({node: nodeBeingChecked});
            //console.log("Node being checked: ",nodeBeingChecked);

            let index=uncheckedNodes.indexOf(nodeBeingChecked)
            //console.log("Index is: ", index);
            //console.log("Unchecked nodes: ", uncheckedNodes);
            if(index===-1){ //node no longer in the table - already checked
                //console.log("Iam here");
            }else{
                // insert new dist value
                let index=scoredNodes.map(e => e.node).indexOf(nodeBeingChecked)
                console.log("cumulative distance: ", cumulativeDist, " and node info: ", nodeInfo);
                if(scoredNodes[index].distance>cumulativeDist + Number(nodeInfo.distance)){
                    scoredNodes[index].distance=cumulativeDist + Number(nodeInfo.distance) // I change it only if its smaller than what was there
                }              
                //get the smallest distance now
                if(scoredNodes[index].distance<=maxDistance){
                    nextNode=nodeMap.get(nodeCurrent).connections[i].node;
                    nextDistance=scoredNodes[index].distance;
                    maxDistance=scoredNodes[index].distance;
                    }
                }


        }

        nodeCurrent=nextNode;
        cumulativeDist=nextDistance;
        //console.log("End of first loop: ", nodeCurrent)

    }

    //get the distance for endNode
    let index=scoredNodes.map(e => e.node).indexOf(nodeEnd);
    console.log("Cumulative distance is: ",scoredNodes[index].distance);

    //console.log("Cumulative distance is: ", cumulativeDist);

    //console.log(nodeMap.get(nodeCurrent).connections);

}

function mapToStr(myMap){
    console.log("im with map");
    for (let value of myMap.values()){
        console.log(value);
    }
}

function runMeHere(nodeA, nodeB){
    getTheData();
    findTheShortest(nodeA, nodeB);
}

runMeHere("a", "e"); //runMeHere(nodeA, nodeB);