const express = require('express');
const PokemonService = require('../service/pokemon');
const passport = require('passport');
const jwt_decode = require('jwt-decode');

// local modules
const { pokemonIdSchema } = require('../utils/schemas/pokemon');
const validationHandler = require('../utils/middleware/validationHandler');

//JWT strategy
require('../utils/auth/jwt');

function PokemonApi(app) {
    const router = express.Router();
    app.use('/pokemon', router);

    const pokemonService = new PokemonService();

    router.get('/', passport.authenticate('jwt', { session: false }), async function (req, res, next) {
        //let token = req.headers.authorization.split(' ')[1];
        //let decoded = jwt_decode(token);

        try {
            const pokemones = await pokemonService.getPokemones();
            res.status(200).json({
                pokemones
            });

        } catch (err) {
            console.log(err);
            res.status(404).json({
                error: 'Not found'
            });
        }
    });

    router.get('/:id', passport.authenticate('jwt', { session: false }), validationHandler(pokemonIdSchema, 'params'), async function (req, res, next) {
        //let token = req.headers.authorization.split(' ')[1]
        //let decoded = jwt_decode(token);
        try {
            const { id } = req.params;
            const pokemon = await pokemonService.getPokemon(id);

            res.status(200).json({
                pokemon
            });

        } catch (err) {
            console.log(err);
            res.status(404).json({
                error: 'Not found'
            });
        }
    });
}

module.exports = PokemonApi;
