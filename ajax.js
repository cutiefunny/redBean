const fs = require('fs');
const CRUD= require("./CRUD");

exports.controller = function(req,res,next) {
    
    if(req.body.op=="getImage"){
        //console.log("getImage");
        fs.readdir(__dirname+'/images/'+req.body.msg, function(err,fileList){
            res.send({result:req.body.op
                ,image:fileList[0]});
        });
    }else if(req.body.op=="getDetail"){
        //console.log("getDetail");
        fs.readdir(__dirname+'/images/'+req.body.msg, function(err,fileList){
            res.send({result:req.body.op
                ,fileList:fileList});
        });
    }else if(req.body.op=="updateManage"){
        var filter = { createTm : req.body.createTm};
        var doc = { $set: { name : req.body.name , sugar : req.body.sugar , taste : req.body.taste , ice : req.body.ice , memo : req.body.memo , address : req.body.address } };    
        CRUD.updateData(req.body.op,"info",filter,doc);
        res.send({result:req.body.op});
    }else if(req.body.op=="createManage"){
        var doc = { name : req.body.name , sugar : req.body.sugar , taste : req.body.taste , ice : req.body.ice , memo : req.body.memo , address : req.body.address , createTm : req.body.createTm};    
        CRUD.createData(req.body.op,"info",doc);
        res.send({result:req.body.op});
    }else if(req.body.op=="deleteManage"){
        var filter = { createTm : req.body.createTm };  
        CRUD.deleteData(req.body.op,"info",filter);
        res.send({result:req.body.op});
    }else if(req.body.op=="updateStorage"){
        var filter = { depth2 : req.body.depth2, depth3 : req.body.depth3};
        var doc = { $set: { Qtty : req.body.Qtty } };    
        CRUD.updateData(req.body.op,"storage",filter,doc);
        res.send({result:req.body.op});
    }else if(req.body.op=="createStorage"){
        var doc = { depth1 : req.body.depth1, depth2 : req.body.depth2, depth3 : req.body.depth3, Qtty : 0 };    
        CRUD.createData(req.body.op,"storage",doc);
        res.send({result:req.body.op});
    }
}
