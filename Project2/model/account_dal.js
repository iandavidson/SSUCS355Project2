var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);


exports.getAll = function(callback){
    var query = "select * from Account;";

    connection.query(query, function(err, res){
        callback(err, res);
    })
};

exports.addAccount = function(obj, callback){ //obj == account object
    var query = "insert into Account (first_name, last_name, phone_number, email) values ('" +
     obj.first_name + "', '" + obj.last_name + "', '" + obj.phone_number + "', '" + obj.email + "');"
    console.log("query: " + query);

    connection.query(query, function(err, res) {
        callback(err, res);
    })
};

exports.getDonationsById = function(id, callback){
  var query = "select first_name, last_name, sum(amount) as sum from Account left join Donation on Account.account_id = Donation.account_id " +
      " group by Account.account_id having Account.account_id = " + id +";";
  console.log("query: " + query);

  connection.query(query, function(err, res) {
        callback(err, res);
    })
};
/*
"select first_name, last_name, sum(amount) from Account join Donation on Account.account_id = Donation.account_id " +
" group by Account.account_id having Account.account_id = " + obj.id +";";
 */

exports.getAllById = function(id, callback){
    var query = "select first_name, last_name, phone_number, email from Account where account_id = " + id + ";";
    console.log("query: " + query);
    connection.query(query, function(err, res){
        callback(err, res);
    })
};

exports.getActivitiesById = function(id, callback){
    var query = "Select account_id, fn_account_getActivities(account_id) as num_activity from Account where account_id = " + id + ";";
    console.log("query: " + query);

    connection.query(query, function(err, res) {
        callback(err, res);
    })
};
//stored procedure/function>
//Select account_id, fn_account_getActivities(account_id) from Account; [account_id, num_activity]


//ACCOUNT TABLE IN DATA BASE has a capital "Account"