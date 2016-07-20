'use strict';

const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    swaggerJSDoc = require('swagger-jsdoc');

let db;

if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/flightAPI_test');
} else {
    db = mongoose.connect('mongodb://localhost/flightAPI')
}

const app = express(),
    port = process.env.PORT || 3000,
    Flight = require('./models/flightModel'),
    flightRouter = require('./routes/flightRoutes')(Flight);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use('/api/flights', flightRouter);

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Running on PORT: ${port}`);
});

var swaggerDefinition = {
    info: {
        title: 'Flights scoreboard API express ideco Docs',
        version: '1.0.0',
        description: 'API для табло рейсов в аэропорту на основе ExpressJs и MongoDB',
    },
    host: `localhost:${port}`,
    basePath: '/'
};

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes/*.js', './models/*.yaml']
};

var swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = app;