import {Request, Response} from 'express'
import PokemonService from '../services/pokemon.service'

class PokemonController {

    async iniciar_dados(req: Request, res: Response) {
        const dados = await PokemonService.organizar_dados()
        
        await PokemonService.writeFile(dados, 'pokemons.json')
        const result = await PokemonService.salvar_dados_db(dados)

        res.status(200).json(result)
    }

    async consultar_pokemon_por_tipo(req: Request, res: Response) {
        const dados = await PokemonService.filterPokemonsByType(req.params.tipo)

        res.status(200).json(dados)
    }

    async consultar_pokemon_por_dex_id(req: Request, res: Response) {
        const dados = await PokemonService.consultar_pokemon_por_dex_id(req.params.dex)

        res.status(200).json(dados)
    }

    async consultar_pokemon_por_nome(req: Request, res: Response) {
        const dados = await PokemonService.consultar_pokemon_por_nome(req.params.nome)
    
        res.status(200).json(dados)
    }

}

export default new PokemonController()