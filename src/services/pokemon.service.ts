import { writeFile, readFile } from "fs/promises";
import PokemonSchema from "../schemas/pokemon.schema";

class PokemonService {
  async carregar_dados_api() {
    const response = await fetch("http://localhost:3000/pokemons-data");
    return response;
  }

  async organizar_dados() {
    const response = await this.carregar_dados_api();
    const data = await response.json();

    const organizedData = data.map((item) => {
      let moves: any = [];
      const stats = item.stats.map((stat) => {
        return {
          name: stat.stat.name,
          value: stat.base_stat,
        };
      });

      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * item.moves.length);
        moves.push(item.moves[randomIndex]);
      }

      const data = {
        name: item.forms[0].name,
        type: item.types.map((type) => type.type.name),
        stats: stats,
        dex: item.game_indices[9].game_index,
        height: item.height,
        weight: item.weight,
        moves: moves,
      };

      return data;
    });

    return organizedData;
  }

  async writeFile(data, arquivo) {
    await writeFile(arquivo, JSON.stringify(data, null, 2));
  }

  async readFile() {
    const content = await readFile("pokemons.json");
    return JSON.parse(content.toString());
  }

  async salvar_dados_db(data) {
    const result = await PokemonSchema.insertMany(data);
    return result;
  }

  async organizar_dados_por_tipo() {
    const data: any = await this.readFile();

    let types = data.map((item) => item.type[0]);
    types = types.filter((value, index) => types.indexOf(value) === index);

    const list = types.map((item) => {
      return {
        type: item,
        pokemons: data
          .filter((a) => a.type.includes(item))
          .sort((a, b) => a - b),
      };
    });

    await this.writeFile(list, "pokemons_por_tipo.json");
  }

  async filterPokemonsByType(tipo) {
    const data: any = await this.readFile();

    return data.filter((pokemon) => pokemon.tipo.includes(tipo));
  }

  async consultar_pokemon_por_dex_id(dex) {
    const data: any = await this.readFile();

    return data.filter((pokemon) => pokemon.dex == dex);
  }

  async consultar_pokemon_por_nome(nome) {
    const data: any = await this.readFile();

    return data.filter((pokemon) => pokemon.nome == nome);
  }
}

export default new PokemonService();
