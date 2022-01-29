const express = require('express');
const cors = require('cors')

const app = express();

// local modules
const config = require('./config/index');
const authApi = require('./routes/auth');


app.use(express.json());
app.use(cors());

authApi(app);

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});