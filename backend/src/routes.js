const express = require('express');

const routes = express.Router();

routes.post('/users', (request, response) => {
    // const params = request.query;
    // const params = request.params;
    const body = request.body;

    console.log(body);

    return response.json({
        evento: 'Semana Omnistack 11.0',
        nome: 'Cleiton Souza'
    });
});

module.exports = routes;