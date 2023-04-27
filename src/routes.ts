import {Router} from 'express'
import PokemonController from './controllers/pokemon.controller'
import TeamController from './controllers/team.controller'

const router = Router()

router.post('/start-pokemons', PokemonController.iniciar_dados) 
router.post('/time', TeamController.salvar_time)
router.get('/times', TeamController.consultar_todos_times)
router.get('/time/treinador-nome/:nome', TeamController.consultar_time_por_treinador)
router.get('/pokemon/tipo/:tipo', PokemonController.consultar_pokemon_por_tipo)
router.get('/pokemon/dex/:dex', PokemonController.consultar_pokemon_por_dex_id)
router.get('/pokemon/nome/:nome', PokemonController.consultar_pokemon_por_nome)

export default router