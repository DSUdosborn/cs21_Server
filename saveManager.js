const fs = require("fs");
const { callbackify } = require("util");

function saveFile(todoList){

    fs.writeFile("./savedTodoList.json", JSON.stringify(todoList), (err)=>{
        if (err){
            throw err;
        }
        console.log("JSON data is saved");
    })
}

function getFile(callback){


    fs.readFile("./savedTodoList.json", "utf-8", (err, data) =>{
        if(err){
            throw err;
        };
        callback(JSON.parse(data))
        //callback(data);

    })
}

module.exports = {
    saveFile,
    getFile,
};
