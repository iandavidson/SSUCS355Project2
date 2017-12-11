var express = require('express');
var router = express.Router();
var volunteer_dal = require('../model/volunteer_dal');
var account_dal = require('../model/account_dal');

router.get('/getAll', function(req, res){
    console.log("volunteer get all called");
    volunteer_dal.getAllVolunteeringEvents(function(err1, volunteerEvent){    // will get columns [description, first_name, last_name], use for view all Schedule.
        console.log(volunteerEvent);
        if(err1){
            console.log("err1");
            res.send(err1);
        }else{
            account_dal.getAll(function(err2, account){    // will get [first, last, email, phone_number]
                if(err2){
                    console.log("error2");
                    res.send(err2);
                }else{
                    console.log(account);
                    //var obj = {event: event,
                    //            account: account};
                    volunteer_dal.getAll(function(err3, event) {
                        if(err3){
                            console.log("error3");
                            res.send(err3);
                        }else{
                            console.log(event);
                            var object = {volunteer: volunteerEvent,
                                            account: account,
                                            event: event };
                            res.render("volunteer/volunteerViewAll", {response: object});
                        }
                    })

                }
            })
        }
    })
});
//adds to VolunteerEvents
router.get('/addEvent', function(req, res){
    res.render('volunteer/volunteerAddEventForm');
});

router.post('/addEvent', function(req, res){
    var obj = {description: req.body.Event.description,
                street: req.body.Event.street,
                zipcode: req.body.Event.zipcode};
    volunteer_dal.insertEvent(obj, function(err1, res1){
        if(err1){
            console.log("insert broke");
            res.send(err1);
        }else{
            res.send("Insert Successful")
        }
    })
});


//adds to VolunteerSchedule
router.get('/addSchedule/:id', function(req, res) { //id refers to account_id
    var id = req.params.id;
    volunteer_dal.getAll(function(err1,event){
        if(err1){
            res.send(err1);
        }else{
            var obj = {event: event,
                        account_id: id,};
            res.render('volunteer/volunteerAddSchedule', {response: obj});
        }
    })
});
//
//});



//
router.post('/addSchedule/:id', function(req, res){
    var obj = { account_id: req.params.id,
                event_location_id: req.body.event_location_id,
                time_started: req.body.time_started,
                time_ended: req.body.time_ended};
    console.log(obj);
    volunteer_dal.insertSchedule(obj, function(err1,res1){
        if(err1){
            console.log("insert into Vol_sched broke");
            res.send(err1);
        }else{
            res.send("insert successful");
        }
    })
});


module.exports = router;