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

app.post('/login', function (req, res) {
  console.log('in /login');
  user = req.body.username;
  password = req.body.password;

  var connection = getConnection();
  connection.connect();

  if (user != undefined && user == 'admin') {
    var query = connection.query('select password from login where user = ?', user, function (err, result) {

      if (result[0].password == password) {
        console.log('goed');
        res.send({ 'result': 'goed' });
      }
      else {
        console.log('password of username is fout');
        res.status(401).send({ 'result': 'fout' });
      }

    });
  }
  else {
    res.status(401).send({ 'result': 'fout' });
  }

  connection.end();

});

app.post('/add', function (req, res) {
  console.log('in /add');
  // console.log(req.body.startTijd);
  var connection = getConnection();
  connection.connect();

  var startTijd = req.body.startTijd;
  var newAfspraak = { id: 0, startTijd: startTijd };
  var query = connection.query('INSERT INTO afspraken SET ?', newAfspraak, function (err, result) {
    // console.log("added " +  newAfspraak);
    res.status(200).end();
  });

  connection.end();
});

app.get('/get', function (req, res) {
  console.log('in /get');

  var connection = getConnection();
  connection.connect();

  connection.query('SELECT * from afspraken', function (err, rows, fields) {
    if (!err) {
      // console.log(JSON.stringify(rows));
      res.send(JSON.stringify(rows));
    }
    else {
      console.log('Error while performing Query.');
    }
  });

  connection.end();
});

app.post('/delete', function (req, res) {
  console.log('in /delete');
  var afspraak = req.body.afspraak;

  var connection = getConnection();
  connection.connect();

  connection.query('DELETE from afspraken where startTijd = ?', afspraak, function (err, rows, fields) {
    // console.log('deleted ' + afspraak);
    res.status(200).end();
  });

  connection.end();
});


app.use(express.static("kalender/dist"));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'kalender/dist/index.html'));
});


app.post('/formulier', function (req, res) {
  console.log('in /formulier');
  // console.log(req.body.startTijd);

  var connection = getConnection();
  connection.connect();

  var naam = req.body.naam;
  var email = req.body.email;
  var tel = req.body.telefoonnummer;
  var opmerkingen = req.body.opmerkingen;
  var probleem = req.body.probleem;

  console.log(req.body.startTijd);

  console.log(probleem);

  var query = connection.query('UPDATE afspraken SET naam ="' + naam + '", email="' + email + '", tel="' + tel + '", probleem="' + probleem + '", opmerkingen="' + opmerkingen + '" WHERE startTijd LIKE"' + req.body.startTijd + '%"', function (err, result) {
    res.status(200).end();
  });

  connection.end();
});

app.post('/tijd', function (req, res) {
  console.log('in /tijd');

  var connection = getConnection();
  connection.connect();

  var datum = req.body.datum;

  console.log(datum)

  connection.query('SELECT startTijd from afspraken WHERE startTijd LIKE "' + datum + '%" AND naam is NULL', function (err, rows, fields) {
    if (!err) {
      console.log(JSON.stringify(rows));
      res.send(JSON.stringify(rows));
    }
    else {
      console.log('Error while performing Query.');
      console.log(err);
    }
  });

  connection.end();
});