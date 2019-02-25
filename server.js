const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const routes = require('./controllers/api-routes.js');
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

mongoose.connect('mongodb://root:password@localhost:27017/library?authSource=admin', { useNewUrlParser: true });

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

module.exports = app;