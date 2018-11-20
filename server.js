const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const routes = require('./controllers/api-routes.js');


mongoose.connect('mongodb://root:password@localhost:27017/library?authSource=admin', { useNewUrlParser: true });

app.use('/', routes);
app.use(bodyParser.json());

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

module.exports = app;
