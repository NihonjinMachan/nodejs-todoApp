const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers/todoController');
var app = express();

//template config
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//body parsing
app.use(bodyParser.urlencoded({extended : false}));

//invoke controller code
controller(app);

app.listen(3000);
console.log('Server running on port 3000...');