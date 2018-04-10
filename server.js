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
    database: 'afspraken'
  });
  return connection;
}

app.listen(3000, function () {
  console.log('MelTech app on port 3000');
});


// app.get('/', function(req, res) {
//   res.send('MelTech server');
// });


app.use(express.static('public'));


