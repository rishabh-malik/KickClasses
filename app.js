var express=require('express');
var socket=require('socket.io');
var sentiment = require('sentiment');
var firebase = require('firebase');

var fireapp = firebase.initializeApp({ 
    apiKey: "AIzaSyAbEvVDqojZxxiHY7tijKhj__ml5a7mdEk",
    authDomain: "hack-d622e.firebaseapp.com",
    databaseURL: "https://hack-d622e.firebaseio.com",
    projectId: "hack-d622e",
    storageBucket: "",
    messagingSenderId: "834161010109"})
var ref = fireapp.database().ref('/nlpScores')
//App setup
var port = process.env.PORT || 4000;
var app=express();
var server=app.listen(port,function(){
    console.log('listening to request on port 4000')
});
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
}

app.use(allowCrossDomain);
// serve static files
app.use(express.static('public'));

app.get('/store',function(req,res){
    res.sendFile(__dirname+'/Store/store.html');
});

app.get('/leaderBoard',function(req,res){
    res.sendFile(__dirname+'/Store/leaderBoard.html');
});

app.get('/tutors',function(req,res){
    res.sendFile(__dirname+'/tutors/index.html');
});

app.get('/vr',function(req,res){
    res.redirect('http://localhost:8081/vr/');
})

app.get('/liveWhiteBoard',function(req,res){
    res.sendFile(__dirname+'/live_whiteboard/public/index.html');
});

app.get('/Bill',function(req,res){
    res.sendFile(__dirname+'/Bill/index.html')
})
//Socket setup
//socket is a function which takes which server we want to work with
var io=socket(server);

//socket.io is listening for a connection
io.on('connection',function(socket){
    console.log('Made socket connection',socket.id);

    //listening for event
    socket.on('chat',function(data){
        //refering to all sockets
        io.sockets.emit('chat',data);
        /**
         * Calculates the Sentiment of the message Sent by user
         */
    ref.push({ score : sentiment(data.message).score})
    console.log({ score : sentiment(data.message).score})
    });

    socket.on('typing',function(data){
        //broadcasting message to all expect the one who is typing
        socket.broadcast.emit('typing',data);
    });
});
