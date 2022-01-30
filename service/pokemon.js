const config = require('../config/index');
const axios = require("axios");

class PokemonService {
  constructor() { }

  async getPokemones() {
    try {
      const request = await axios.get(`${config.pokemonUrl}/pokemon`);
      return request.data;
    } catch (error) {
      /*  if (error.response) {
        if (error.response.data && error.response.data.errors) {
          return {
            error: ` ${error.response.data.errors[0].message}  `,
          };
        }
      }*/

      // throw handleError("internal server error ", error);
      return { error };
    }
  }

  async getPokemon(id) {
    try {
      const request = await axios.get(`${config.pokemonUrl}/pokemon/${id}`);

      return request.data;
    } catch (error) {
      /*  if (error.response) {
        if (error.response.data && error.response.data.errors) {
          return {
            error: ` ${error.response.data.errors[0].message}  `,
          };
        }
      }*/

      // throw handleError("internal server error ", error);
      return { error };
    }
  }

}

module.exports = PokemonService;