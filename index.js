var http = require("http");
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var url = require('url');

//start mysql connection
var connection = mysql.createConnection({
  host: 'localhost', //mysql database host name
  user: 'root', //mysql database user name
  password: 'root', //mysql database password
  database: 'Kbihm_Database' //mysql database name
});

connection.connect(function (err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
//end mysql connection

//start body-parser configuration
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

var server = app.listen(4000, "127.0.0.1", function () {
  var hostAddress = server.address().address
  var portNo = server.address().port
  console.log("Example app listening at http://%s:%s", hostAddress, portNo)
});

//var server = app.listen(4000, "127.0.0.1", function () {
  //var hostAddress = server.address().address
  //var portNo = server.address().port
  //console.log("Example app listening at http://%s:%s", hostAddress, portNo)

//});
// get All AddEmployee Table Api .subscribe(res => {
/*
  app.get('/employee', f .subscribe(res => {
       // debugger
    connection.query('se .subscribe(res => {
       // debuggerr, results, fields) {
     if (error) throw error;
     res.end(JSON.stringify(results));
   });
  });
*/
//Add nem Emoployee
app.post('/employee', function (req, res) {
    var params = req.body;
    console.log(params);
    connection.query('INSERT INTO AddEmployee SET ?', params, function (error, results, fields) {
    console.log("emolyee added!!!!!");
    if (error) throw error;
    res.end(JSON.stringify(results));
    });
});

//ADmin Panel Show Api for Employee Attendence data
app.get('/attendencedetail', function (req, res) {
  connection.query('select * from Attendence', function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});

//admin login varify
app.post('/admin', function (req, res) {
  console.log(req.body);
  var params = req.body;
  var loginid = req.body.LoginId;
  var password = req.body.Password;
  console.log(params);
  var adminLoginVarify = 'select 1 as result from AdminLogin where LoginId="' + loginid + '" and Password="' + password + '"';
  connection.query(adminLoginVarify, function (error, results, fields) {
    console.log(results);
    if (error) throw error;
    else if (results.length > 0 && results[0].result == 1)
      res.end(JSON.stringify(true));
    else
      res.end(JSON.stringify(false));
  });
});

/*check user exists in employee table and is today attendence exists in attendence table if not then insert today
 attendence and then update logout time*/

 app.post('/addattendence', function (req, res) {
  var params = req.body; 
  var IMEIvalue = req.body.IMEI;
  var UserLoginTime = req.body.LoginTime;
  var UserLogoutTime = req.body.LogoutTime;
  var todaydate = req.body.CurrentDate;
 
  var checkemployee = 'select FullName,EmployeeId,Email,IMEI from AddEmployee where IMEI="'+IMEIvalue+'"';
  connection.query(checkemployee, function (error, results, fields) {
    var employeeid = results[0].EmployeeId;
    var fullname = results[0].FullName;
    var email = results[0].Email;
    var imei = results[0].IMEI;
    console.log(employeeid);
    if (results[0]==null)
    {
      console.log('you are not a valid user please contact to admin!!!!!!!!');
      res.end(JSON.stringify(results));
    
    }
    else {
      var checkEmployeeInAttendence = 'select EmployeeId,currentdate,LoginTime,LogoutTime from Attendence where IMEI=1234 and currentdate="' + todaydate + '" and EmployeeId="' + employeeid + '"';
      connection.query(checkEmployeeInAttendence, function (error1, result1, field1) {
         if (error1) throw error1;
        console.log(checkEmployeeInAttendence);
        console.log(result1);
 
        if (result1[0] == null) {
          var insertAttendence = { EmployeeId: employeeid, IMEI: IMEIvalue,FullName:fullname, currentdate: todaydate, LoginTime: UserLoginTime };
          connection.query('INSERT INTO Attendence SET ?', insertAttendence, function (error2, result2, field2) {
          res.end(JSON.stringify(result2));
          console.log(result2);
          console.log('you inserted your attendence');
          });
        }
        else {
          var attendenceid = (result1[0].EmployeeId);
          var Attendencedate = (result1[0].currentdate);
          var imei = (result1[0].IMEI);
         // var logintime = (result1[0].LoginTime);
         // var louttime = (result1[0].LogoutTime);
        
          var new_attendence_date = Attendencedate.getFullYear() + "-" + (Attendencedate.getMonth() + 1) + "-" + Attendencedate.getDate();
          console.log(new_attendence_date);
          res.end(JSON.stringify(result1));

          var enterAttendenceLogoutTime = { LogoutTime: UserLogoutTime };
          var updatelogoutquery = 'update Attendence set LogoutTime="' + UserLogoutTime + '" where EmployeeId="' + employeeid + '" and IMEI="' + 1234 + '" and CurrentDate="' + new_attendence_date + '"';
          console.log(updatelogoutquery);
          console.log('logout time update');
          connection.query(updatelogoutquery, enterAttendenceLogoutTime, function (error3, result3, field3) {
          if (error3) throw error3;
          console.log(result3);
          });
        }
      });
    }
  });
});
//get logintime ,logout time from attendence table and return response 
app.post('/attendencecheck', function (req, res) {
  var presentdate=req.body.CurrentDate;
  var attendencecheckquery='select LoginTime,LogoutTime from Attendence where IMEI='+1234 + ' and currentdate="'+presentdate+'"';
  connection.query(attendencecheckquery, function (error, results, fields) {
    if (error) throw error;
    if (results.length > 0)
      res.end(JSON.stringify(results));
    else
      res.end(null);
  });
});