require("dotenv").config();

module.exports = {
    uri:
        process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017/prima-dev",
    mongoDb: process.env.MONGO_DB || "pokemon-db",
    port: process.env.PORT || 8087,
    authJwtSecret: process.env.AUTH_JWT_SECRET || '123',
    pokemonUrl: process.env.POKEMON_URL || 'https://pokeapi.co/api/v2/'
};


