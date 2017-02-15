var express = require('express'),
    app = express();

var mysql = require('mysql');

var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));


// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index); // app.use('/index', index);
app.use('/tasks', tasks);

// app.use(express.static(__dirname + ''));

// app.get('/', function(req, res) {
//     res.send('<h1>Welcome to MEAN Stack; M=mysql</h1>');
// })

// testing connection to mysql database
var mysql_conn = mysql.createConnection({
    //properties
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// I assume that you have a test database with a table student
// If you dont you should use whatever database you have
app.get('/showdb', function(req, res) {
    mysql_conn.connect(function(error) {
        if (!!error) {
            console.log('Error');
        } else {
            console.log('Connection to Mysql db Successful');
        }
        mysql_conn.query("SELECT * FROM student", function(error, row, field) {
            if (!!error)
                console.log('error connecing to db table');
            else {
                console.log(row);
            }
        })
    })
    res.send('Database connection Successful...');

})

var port = 3000
app.listen(port, function() {
    console.log('e4e MEAN (M=mysql) Aplication server started at ' + port + '...');
})