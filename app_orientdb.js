const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const OrientDB = require('orientjs');
let app = express();
let server = OrientDB({
  host: '192.168.56.101',
  port: 2424,
  username: 'root',
  password: 'gkstmdtn'
});
let db = server.use('o2');


app.set('views' , 'views_orientdb');
app.set('view engine', 'jade');
app.use(express.static('public_orientdb'));
app.use(bodyParser.urlencoded({extended : false}));


app.get(['/topic','/topic/:id'], function(req,res){
  let sql = 'select * from topic';
  if(req.params.id){
    if(req.params.id == 'new'){
      SEL_DB(sql,{},'sel_all',function(results){
        res.render('new',{topics : results});
      });
    }else{
      SEL_DB(sql,{},'sel_all',function(results){
        SEL_DB(sql,req.params.id,'sel_one',function(result){
          console.log('1. ' + req.params.id);
          res.render('view',{topics : results, topic:result[0]});
        });
      });
    }
  }else{
    SEL_DB(sql,{},'sel_all',function(results){
      res.render('view',{topics : results});
    });
  }
});
http.createServer(app).listen(3000, function(){
  console.log('Port 3000 is Started..');
});

///////////////
function SEL_DB(sql, cond, view ,callback){
  
  if(view == 'sel_one'){
    sql = 'select * from topic where @rid =:rid';
    let param = {params: {rid : cond}};
    db.query(sql,param).then(callback);
  }else{
    db.query(sql).then(callback);
  }


};
