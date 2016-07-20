'use strict';

const assert = require('chai').assert,
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Flight = mongoose.model('Flight'),
    agent = request.agent(app),
    _ = require('lodash');

describe('Flight Crud Test:', () => {
    describe('Get', () => {
        it('Запрос всех тестовых рейсов', (done) => {
            agent
                .get('/api/flights')
                .end((err, results) => {
                    assert.equal(results.status, 200);
                    assert.equal(_.isArray(results.body), true, 'Является ли результат массивом');
                    assert.equal(results.body.length, 5);
                    done();
                })
        });

        it('Запрос всех тестовых рейсов с прилётом в город Москва', (done) => {
            agent
                .get('/api/flights?arrival_city=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0')
                .end((err, results) => {
                    assert.equal(results.status, 200);
                    assert.equal(_.isArray(results.body), true, 'Является ли результат массивом');
                    assert.equal(results.body.length, 2);
                    done();
                })
        });

        it('Запрос всех тестовых рейсов со статусом вылетел', (done) => {
            agent
                .get('/api/flights?status=%D0%B2%D1%8B%D0%BB%D0%B5%D1%82%D0%B5%D0%BB')
                .end((err, results) => {
                    assert.equal(results.status, 200);
                    assert.equal(_.isArray(results.body), true, 'Является ли результат массивом');
                    assert.equal(results.body.length, 2);
                    done();
                })
        });
    });

    describe('Post', () => {
        let id;

        it('После добавления нового рейса, у него должен присвоиться _id', (done) => {
            const flightPost = {
                race_number: 'A324',
                departure_city: 'Екатеринбург',
                arrival_city: 'Москва',
                time: new Date()
            };

            agent
                .post('/api/flights')
                .send(flightPost)
                .end((err, results) => {
                    id = results.body._id;

                    assert.equal(results.status, 201);
                    assert(!!id, '_id не найдено');
                    done();
                })
        });

        afterEach((done) => {
            Flight
                .remove({
                    _id: id
                })
                .exec();
            done();
        })
    })
});