var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAllVolunteeringEvents = function(callback){
    var query = "select * from GetAllEvents;";

    console.log("query: " + query);
    connection.query(query, function(err, res){
        callback(err, res);
    })
};

exports.getAll = function(callback){
    var query = "select * from Volunteer_Event;";

    console.log("query:" + query);
    connection.query(query, function(err, res){
        callback(err, res);
    })
};

exports.insertEvent = function(obj, callback){
    var query = "insert into Volunteer_Event(description, street, zipcode) values ('" +
        obj.description + "', '" + obj.street + "', " + obj.zipcode + ");";

    console.log("query:" + query);
    connection.query(query, function(err, res){
        callback(err, res);
    })
};

//insert into Volunteer_Schedule (time_started, time_ended, event_location_id, account_id) values
//("2017-10-18 16:30:35", "2017-10-18 18:30:47", 1, 1),
exports.insertSchedule = function(obj, callback){
    var query = "insert into Volunteer_Schedule (time_started, time_ended, event_location_id, account_id) values ('" +
        obj.time_started + "', '" + obj.time_ended + "', " + obj.event_location_id + ", " + obj.account_id + ");"

    console.log("query:" + query);
    connection.query(query, function(err, res){
        callback(err, res);
    })
};

exports.getEventId = function(id, callback){
    var query = "select * from Volunteer_Event where event_location_id = " + id + ";"
    console.log(query);
    connection.query(query, function(err, res){
        callback(err, res);
    })
};


exports.updateEvent = function(obj, callback){
    var query = "update Volunteer_Event set description = '" + obj.description + "', street = '" + obj.street +
        "', zipcode = " + obj.zipcode + " where event_location_id = " + obj.id + ";";
    console.log(query);
    connection.query(query, function(err, res){
        callback(err, res);
    })
};



//select * from GetAllEvents; // will get columns [description, first_name, last_name], use for view all Schedule.