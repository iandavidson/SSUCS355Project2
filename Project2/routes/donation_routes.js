var express = require('express');
var router = express.Router();
var donation_dal = require('../model/donation_dal');
var account_dal = require('../model/account_dal');

router.get('/all', function(req, res){
    console.log("donation/all called");
    donation_dal.getAllContributors(function(err, response){
        if(err){
            console.log("donators didnt display, view all");
            res.send(err);
        }else{
            donation_dal.getAllNonContributors(function(err2, response2){
                if(err2){
                    console.log("NonContributors didnt make it back");
                    res.send(err2);
                }else{
                    donation_dal.getAllDonations(function(err3, response3){
                        if(err3){
                            console.log("Donation joined acc");
                            res.send(err3);
                        }else{
                            var donationObj = { Contributor: response,
                                Noncontributor: response2,
                                Account:response3 };
                            res.render('donation/donationViewAll', {response: donationObj});
                        }
                    })
                }

            })
        }
    })
});


router.get('/viewSum', function(req, res){
    console.log("Donation Sum called");
    donation_dal.getTotalDonations(function(err, response){
        if(err){
            console.log("Donation/viewSum broke");
            res.send(err);
        }else{
            res.render('donation/donationViewSum', {response: response});
        }
    })
});

router.get('/add/:id', function(req, res){//loads donation create form
    var id = req.params.id;
    res.render('donation/donationCreateForm', {response: id});
});

router.post('/add/:id', function(req, res){//will actually add info
    var id = req.params.id;
    var donationObject = {
      account_id: id,
      donation_time: req.body.donation.donation_time,
      amount: req.body.donation.amount
    };
    if((donationObject.donation_time || donationObject.amount) === null){
        res.send("Not enough relevant information");
    }

    console.log("account_id: " + donationObject.account_id);
    console.log("donationTime: " + donationObject.donation_time);
    console.log("donation Amount: " + donationObject.amount);


    donation_dal.addDonation(donationObject, function(err, response){
        if(err){
            console.log("Donation broke");
            res.send(err);
        }else{
            res.send("Donation Insert Successful");
        }

    })
})

module.exports = router;