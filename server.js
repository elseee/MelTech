var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
app.use(bodyParser.json());

var mysql = require('mysql');
function getConnection() {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meltech'
  });
  return connection;
}

app.listen(3000, function () {
  console.log('MelTech app on port 3000');
});

// app.get('/', function(req, res) {
//   res.send('MelTech server');
// });


/*
*
*     Admin kalender
*
*/

app.post('/add', function(req, res) {
  console.log('in /add');
  console.log(req.body.startTijd);
  var connection = getConnection();
  connection.connect();

  var startTijd = req.body.startTijd; 
  var newAfspraak = {id: 0, startTijd: startTijd};
  var query = connection.query('INSERT INTO afspraken SET ?', newAfspraak, function (err, result) {
    // console.log("added " +  newAfspraak);
    res.status(200).end();
  });

  connection.end();
});

app.get('/get', function(req, res) {
  console.log('in /get');
  
  var connection = getConnection();
  connection.connect();

  connection.query('SELECT * from afspraken', function(err, rows, fields) {
    if (!err) {
      console.log(JSON.stringify(rows.length));
      res.send(JSON.stringify(rows));
    }
    else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();
});

app.post('/delete', function(req, res) {
  console.log('in /delete');
  var afspraak = req.body.afspraak;

  if (afspraak.length > 20) {
    afspraak = afspraak.substring(0, afspraak.length - 6);
  }
  
  var connection = getConnection();
  connection.connect();

  console.log(afspraak);
  connection.query('DELETE from afspraken where startTijd = ?', afspraak,  function(err, rows, fields) {
    console.log('deleted ' + afspraak);
    res.status(200).end();
  });

  connection.end();
});

app.get('*', function(req, res) {
  res.sendfile('kalender/dist')
})

app.use(express.static(path.join(__dirname, "kalender/dist")));


