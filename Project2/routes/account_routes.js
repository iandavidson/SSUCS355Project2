var express = require('express');
var router = express.Router();
var account_dal = require('../model/account_dal');

router.get('/all', function(req, res){
   account_dal.getAll(function(err1, res1){
       if(err1){
           console.log("acc get all broke");
           res.send(err1);
       }else{
           res.render('account/accountViewAll', {response: res1});
       }
   })
});

router.get('/createForm', function(req, res1){  //needs to add information into Acc and ACC_ADDr
    res1.render('account/accountCreateForm');
});

router.post('/addAccount', function(req,res1){
    account_dal.addAccount(req.body.account, function(err1, res2){
        if(err1){
            res1.send("insert did not work :(");
        }else{
            res1.send("Insertion Successful");
        }
    })
});



module.exports = router;