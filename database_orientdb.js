const OrientDB = require('orientjs');
let server = OrientDB({
  host: '192.168.56.101',
  port: 2424,
  username: 'root',
  password: 'gkstmdtn'
});

let db = server.use('o2');
/*
db.record.get('#12:0').then(function(record){
  console.log('Loaded record: ', record);
})
*/

/*
let sql = 'SELECT * FROM topic';
db.query(sql).then(function(results){
  console.log(results);
});
*/

/*
let sql = 'SELECT * FROM topic where @rid=:rid';
let param = {
  params:{
    rid: '#12:0'
  }
};
db.query(sql, param).then(function(results){
  console.log(results);
});
*/
/*
let sql = 'INSERT INTO topic (title, description) VALUES(:title, :desc)';
let param = {
  params:{
    title: 'Orientdb',
    desc: 'Hi, OrientDB'
  }
};
db.query(sql, param).then(function(results){
  console.log(results);
});
*/

/*
let sql = 'UPDATE topic SET title=:title where @rid=:rid';
let param = {
  params:{
    title: 'Javascript',
    rid: '#12:0'
  }
};
db.query(sql, param).then(function(results){
  console.log(results);
});
*/

let sql = 'DELETE FROM topic where @rid=:rid';
let param = {
  params:{
    rid: '#12:0'
  }
};
db.query(sql, param).then(function(results){
  console.log(results);
});
