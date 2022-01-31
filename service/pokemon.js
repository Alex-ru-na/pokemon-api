const config = require('../config/index');
const axios = require("axios");

class PokemonService {
  constructor() { }

  async getPokemones(offset, limit) {
    try {
      const request = await axios.get(`${config.pokemonUrl}/pokemon`, { params: { offset, limit } });
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