const express = require('express');
const cors = require('cors')

const app = express();

// local modules
const config = require('./config/index');

const authApi = require('./routes/auth');
const usersApi = require('./routes/users');
const pokemonApi = require('./routes/pokemon');

app.use(express.json());
app.use(cors());

authApi(app);
usersApi(app);
pokemonApi(app);

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});