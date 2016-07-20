'use strict';

const assert = require('chai').assert,
    sinon = require('sinon');

describe('Flight Controller Tests:', () => {
    describe('Post', () => {
        const Flight = function(flight) {
            this.save = function (){}
        },
            flightController = require('../controllers/flightController')(Flight),
            req = {
                body: {}
            };

        let res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

        beforeEach(() => {
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            }
        });

        it('Номер рейса (race_number) обязательное поле при POST запросе', () => {
            req.body = {
                departure_city: 'Екатеринбург',
                arrival_city: 'Москва',
                time: new Date()
            };

            flightController.post(req, res);

            assert.equal(res.status.args[0][0], 400, `Bad Status ${res.status.args[0][0]}`);
            assert.equal(res.send.args[0][0], 'Race number is required');
        });

        it('Город вылета (departure_city) обязательное поле при POST запросе', () => {
            req.body = {
                race_number: 'A324',
                arrival_city: 'Москва',
                time: new Date()
            };

            flightController.post(req, res);

            assert.equal(res.status.args[0][0], 400, `Bad Status ${res.status.args[0][0]}`);
            assert.equal(res.send.args[0][0], 'Departure city is required');
        });

        it('Город прилёта (arrival_city) обязательное поле при POST запросе', () => {
            req.body = {
                race_number: 'A324',
                departure_city: 'Екатеринбург',
                time: new Date()
            };

            flightController.post(req, res);

            assert.equal(res.status.args[0][0], 400, `Bad Status ${res.status.args[0][0]}`);
            assert.equal(res.send.args[0][0], 'Arrival city is required');
        });

        it('Время (time) обязательное поле при POST запросе', () => {
            req.body = {
                race_number: 'A324',
                departure_city: 'Екатеринбург',
                arrival_city: 'Москва'
            };

            flightController.post(req, res);

            assert.equal(res.status.args[0][0], 400, `Bad Status ${res.status.args[0][0]}`);
            assert.equal(res.send.args[0][0], 'Time is required');
        });
    })
});