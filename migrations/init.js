'use strict';

const db1 = db.getSiblingDB('flightAPI_test'),
    db2 = db.getSiblingDB('flightAPI');

db1.dropDatabase();
db2.dropDatabase();

var flights = [
    {
        race_number: 'I4-1008',
        departure_city: 'Екатеринбург',
        arrival_city: 'Сочи',
        type_aircraft: 'B-757-200',
        time: Date(2016, 6, 20, 21, 5),
        actual_time: Date(2016, 6, 20, 21, 5),
        status: 'вылетел'
    },
    {
        race_number: 'DP-407',
        departure_city: 'Екатеринбург',
        arrival_city: 'Москва',
        type_aircraft: 'B-737-800W',
        time: Date(2016, 6, 20, 21, 25),
        status: 'вылетел'
    },
    {
        race_number: 'U6-267',
        departure_city: 'Екатеринбург',
        arrival_city: 'Москва',
        type_aircraft: 'А-319',
        time: Date(2016, 6, 20, 21, 30),
        actual_time: Date(2016, 6, 20, 22, 5)
    },
    {
        race_number: '7R-862',
        departure_city: 'Екатеринбург',
        arrival_city: 'Казань',
        type_aircraft: 'CRJ-100',
        time: Date(2016, 6, 20, 23, 30),
        actual_time: Date(2016, 6, 20, 23, 30),
        status: 'приземлился'
    },
    {
        race_number: 'YC-28',
        departure_city: 'Екатеринбург',
        arrival_city: 'Новосибирск',
        time: Date(2016, 6, 20, 23, 35)
    }
];

db1.flights.insert(flights);
db2.flights.insert(flights);