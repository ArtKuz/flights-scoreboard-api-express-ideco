'use strict';

const flightController = function(Flight) {
    return {
        post(req, res) {
            let flight = new Flight(req.body);

            if (!req.body.race_number) {
                res.status(400);
                res.send('Race number is required');
            } else if (!req.body.departure_city) {
                res.status(400);
                res.send('Departure city is required');
            }  else if (!req.body.arrival_city) {
                res.status(400);
                res.send('Arrival city is required');
            }  else if (!req.body.time) {
                res.status(400);
                res.send('Time is required');
            } else {
                flight.save((err) => {
                    if (err) {
                        res.status(500);
                        res.send(err);
                    } else {
                        res.status(201);
                        res.send(flight);
                    }
                });
            }
        },
        get(req, res) {
            let query = {};

            // фильтр по городу вылета
            if (req.query.departure_city) {
                query.departure_city = req.query.departure_city;
            }

            // фильтр по городу прилета
            if (req.query.arrival_city) {
                query.arrival_city = req.query.arrival_city;
            }

            // фильтр по статусу
            if (req.query.status) {
                query.status = req.query.status;
            }

            Flight.find(query, (err, flights) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(flights);
                }
            })
        }
    }
};

module.exports = flightController;