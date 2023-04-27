import {Request, Response} from 'express'
import TeamService from '../services/team.service'

class TeamController {

    async salvar_time(req: Request, res: Response) {
        const resultado = await TeamService.salvar_time_pokemons(req.body)

        res.status(200).json(resultado)
    }

    async consultar_todos_times(req: Request, res: Response) {
        const resultado = await TeamService.consultar_todos_times()
    
        res.status(200).json(resultado)
    }

    async consultar_time_por_treinador(req: Request, res: Response) {
        const resultado = await TeamService.consultar_time_por_nome_de_treinador(req.params.nome)
        
        res.status(200).json(resultado)
    }
    
}

export default new TeamController()