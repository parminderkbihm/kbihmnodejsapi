// var server = require('server');

// var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
// var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
// server.listen(server_port, server_ip_address, function () {
//   console.log( "Listening on " + server_ip_address + ", port " + server_port )
// });

var express=require('express');

var app=express();


app.get('/',function (req,res) {
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('hello express');
    console.log('text console')

});

app.listen(process.env.PORT || 1337) ;
