const express = require('express');
const http = require('http');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req,res){
  res.send('Hello home page');
});
app.get('/form', function(req,res){
  res.render('form');
});
app.get('/form_receiver',function(req,res){
  let title = req.query.title;
  let description = req.query.description;

  res.send(title+' , '+description);
});
app.post('/form_receiver',function(req,res){
  let title = req.body.title;
  let description = req.body.description;
  res.send(title + ' , ' + description);
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
    <a href="/topic/0">Javascript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br><br>
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
