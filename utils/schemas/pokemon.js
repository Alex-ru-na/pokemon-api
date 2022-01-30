const joi = require('@hapi/joi');

const pokemonIdSchema = { id: joi.string().regex(/^[0-9]/) };

module.exports = {
    pokemonIdSchema
};