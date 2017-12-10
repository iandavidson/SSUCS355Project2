var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAllContributors = function(callback){
    var query = "select Account.account_id, first_name, last_name, phone_number, email from Account where  exists( select * from Donation " +
    "where Account.account_id = Donation.account_id);" ;

    console.log("query: " + query);
    connection.query(query, function(err, result){
        callback(err, result);
    })
};

exports.getAllNonContributors = function(callback){
    var query = "select Account.account_id as account_id, first_name, last_name, phone_number, email from Account where not exists( select * from Donation " +
        "where Account.account_id = Donation.account_id);" ;

    console.log("query: " + query);
    connection.query(query, function(err, result){
        callback(err, result);
    })
};

//get names correlated with donation breakdown
exports.getAllDonations = function(callback){
    var query = "select first_name, last_name, phone_number, email, donation_time, amount from Account a " +
    "join Donation d on a.account_id = d.account_id"  +
    " Order by donation_time;";

    console.log("query: " + query);
    connection.query(query, function(err, result){
        callback(err, result);
    })
};


//make function which will give back totals of all the donatioins by accounts that made them
exports.getTotalDonations = function(callback){
    var query = "select first_name, last_name, sum(amount) as sum from Account " +
        "join Donation on Account.account_id = Donation.account_id " +
        "group by Account.account_id;";

    console.log("query: " + query);
    connection.query(query, function(err, result){
        callback(err, result);
    })
};

//adds records to donation table based off of users
exports.addDonation = function(obj, callback){
    var query = "insert into Donation(account_id, donation_time, amount) values ("
        + obj.account_id + ", '" + obj.donation_time + "', " + obj.amount + ");" ;

    console.log("query: " + query);
    connection.query(query, function(err, result){
        callback(err, result);
    })
};

