'use strict';

const express = require('express');

const routes = function(Flight) {
    const flightRouter = express.Router(),
        flightController = require('../controllers/flightController')(Flight);

    flightRouter
        .route('/')
    /**
     * @swagger
     * /api/flights:
     *   get:
     *     tags:
     *       - Flights
     *     description: Получить список рейсов
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: departure_city
     *         description: Фильтр по городу вылета
     *         in: query
     *         type: string
     *       - name: arrival_city
     *         description: Фильтр по городу прилёта
     *         in: query
     *         type: string
     *       - name: status
     *         description: Фильтр по статусу
     *         in: query
     *         type: string
     *         enum: ['вылетел', 'приземлился', 'идет посадка', 'задержан']
     *     responses:
     *       200:
     *         description: Ok
     *       500:
     *         description: Internal Server Error
     */
        .get(flightController.get)
    /**
     * @swagger
     * /api/flights:
     *   post:
     *     tags:
     *       - Flights
     *     description: Добавить новый рейс
     *     produces:
     *       - application/json
     *     parameters:
     *       - $ref: '#/definitions/Flight/properties/race_number'
     *       - $ref: '#/definitions/Flight/properties/departure_city'
     *       - $ref: '#/definitions/Flight/properties/arrival_city'
     *       - $ref: '#/definitions/Flight/properties/type_aircraft'
     *       - $ref: '#/definitions/Flight/properties/time'
     *       - $ref: '#/definitions/Flight/properties/actual_time'
     *       - $ref: '#/definitions/Flight/properties/status'
     *     responses:
     *       201:
     *         description: Created
     *       400:
     *         description: Bad Request
     *       500:
     *         description: Internal Server Error
     */
        .post(flightController.post);

    flightRouter.use('/:flightId', (req, res, next) => {
        Flight.findById(req.params.flightId, (err, flight) => {
            if (err) {
                res.status(500).send(err);
            } else {
                if (flight) {
                    req.flight = flight;
                    next();
                } else {
                    res.status(404).send('no flight found');
                }
            }
        });
    });

    flightRouter
        .route('/:flightId')
    /**
     * @swagger
     * /api/flights/{flightId}:
     *   get:
     *     tags:
     *       - Flights
     *     description: Получить информацию об одном рейсе по id
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: flightId
     *         description: id рейса
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Ok
     *       500:
     *         description: Internal Server Error
     */
        .get((req, res) => res.json(req.flight))
    /**
     * @swagger
     * /api/flights/{flightId}:
     *   put:
     *     tags:
     *       - Flights
     *     description: Обновить информацию о рейсе
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: flightId
     *         description: id рейса
     *         in: path
     *         required: true
     *         type: string
     *       - $ref: '#/definitions/Flight/properties/race_number'
     *       - $ref: '#/definitions/Flight/properties/departure_city'
     *       - $ref: '#/definitions/Flight/properties/arrival_city'
     *       - $ref: '#/definitions/Flight/properties/type_aircraft'
     *       - $ref: '#/definitions/Flight/properties/time'
     *       - $ref: '#/definitions/Flight/properties/actual_time'
     *       - $ref: '#/definitions/Flight/properties/status'
     *     responses:
     *       200:
     *         description: Ok
     *       500:
     *         description: Internal Server Error
     */
        .put((req, res) => {
            req.flight.race_number = req.body.race_number;
            req.flight.departure_city = req.body.departure_city;
            req.flight.arrival_city = req.body.arrival_city;
            req.flight.time = req.body.time;
            req.flight.actual_time = req.body.actual_time;
            req.flight.status = req.body.status;

            req.flight.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.flight);
                }
            });
        })
    /**
     * @swagger
     * /api/flights/{flightId}:
     *   patch:
     *     tags:
     *       - Flights
     *     description: Изменить информацию о рейсе
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: flightId
     *         description: id рейса
     *         in: path
     *         required: true
     *         type: string
     *       - $ref: '#/definitions/FlightUpdate/properties/race_number'
     *       - $ref: '#/definitions/FlightUpdate/properties/departure_city'
     *       - $ref: '#/definitions/FlightUpdate/properties/arrival_city'
     *       - $ref: '#/definitions/Flight/properties/type_aircraft'
     *       - $ref: '#/definitions/FlightUpdate/properties/time'
     *       - $ref: '#/definitions/Flight/properties/actual_time'
     *       - $ref: '#/definitions/Flight/properties/status'
     *     responses:
     *       200:
     *         description: OK
     *       500:
     *         description: Internal Server Error
     */
        .patch ((req, res) => {
            if (req.body._id)
                delete req.body._id;

            for (let p in req.body) {
                req.flight[p] = req.body[p];
            }

            req.flight.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.flight);
                }
            });
        })
    /**
     * @swagger
     * /api/flights/{flightId}:
     *   delete:
     *     tags:
     *       - Flights
     *     description: Удалить рейс
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: flightId
     *         description: id рейса
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       204:
     *         description: No Content
     *       500:
     *         description: Internal Server Error
     */
        .delete((req, res) => req.flight.remove((err) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        }));

    return flightRouter;
};

module.exports = routes;