const express = require('express');
const http = require('http');
const fs = require('fs');
const app = express();

app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', function(req,res){
  res.send('Hello home page');
});
app.get('/form', function(req,res){
  res.render('form');
});
app.get('/login', function(req,res){
  res.send('Login please');
});
app.get('/topic/:id', function(req,res){
  var topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...'
  ];
  var output = `
    <a href="/topic?id=0">Javascript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br><br>
    ${topics[req.params.id]}
  `;
  res.send(output);

});
app.get('/topic/:id/:mode', function(req,res){
  res.send(req.params.id + ' , ' + req.params.mode);
});


http.createServer(app).listen(3000, function(){
  console.log('Connected 3000 port');
});
