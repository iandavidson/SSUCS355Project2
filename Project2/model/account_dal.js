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
}



//ACCOUNT TABLE IN DATA BASE has a capital "Account"