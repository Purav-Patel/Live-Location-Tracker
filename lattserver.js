var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server); 

server.listen(process.env.PORT || 3030);
console.log('Server running...');

app.get('/',function(req,res){
    res.sendFile(__dirname+'/lathtml.html');

});

io.sockets.on('connection',function(socket){
    console.log(' connected');

    //Disconnect
    socket.on('disconnect',function(data){
         console.log('Disconnected');
    
    })
    
  

 //react-native app
 socket.on('app',function(data){
    console.log('added');
io.sockets.emit('datatoweb',data);
});    


});

