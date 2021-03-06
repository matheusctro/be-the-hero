const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors()); //permite que todas as aplicações frontend possa acessar este backend
// Caso fosse preciso linkar a um frontend específico:
// app.use(cors({
//     origin: 'http://meuapp.com'
// }));
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(3333);