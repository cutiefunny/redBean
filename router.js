const CRUD = require("./CRUD");
const fs = require('fs');
const deviceID = require('node-machine-id')

exports.main = function(req,res) {

    let id = deviceID.machineIdSync();
    console.log(id);

    CRUD.searchData("getInfo","info").then(info=>{
        console.log(info);
            res.render('main', { 
            title: 'redBean'
            , deviceID : id
            , info : info
        });
    });

}