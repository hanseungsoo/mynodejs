const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const fs = require('fs');

app.set('views', './views_file');
app.set('view engine','jade');
app.use(express.static('public_file'));
app.use(bodyParser.urlencoded({ extended: false}));

app.locals.pretty = true;

app.post('/topic', function(req,res){
  let title = req.body.title;
  let description = req.body.description;

  fs.writeFile('data/'+title, description, function(err){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }else{
      res.redirect('/topic/'+title);
    }
  });
});

app.get(['/topic', '/topic/:id'], function(req,res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    if(req.params.id){
      if(req.params.id != 'new'){
        fs.readFile('data/'+req.params.id,'utf8' , (err,data)=>{
          if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
          }else{
            res.render('view', {title: req.params.id , topics : files , description : data})
          }
        });
      }else{
        res.render('new', {topics : files , title:null , description : null});
      }
    }else{
      res.render('view', {topics : files , title:null , description : null});
    }
  });
});


http.createServer(app).listen(3000, function(){
  console.log('Connected to 3000');
});
