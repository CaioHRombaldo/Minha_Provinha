import TeamSchema from '../schemas/team.schema'
import {writeFile, readFile} from 'fs/promises'

class TeamService {
    
    async salvar_time_pokemons(json) {
        const dados = await this.readFile('pokemons.json')
        const nome_treinador = json.trainer_name
        const pokemons:any = []

        json.pokemons.forEach(item => {
            const pokemon = dados.find(a => a.name == item)
            if (pokemon)
                pokemons.push(pokemon)
        })

        const obj = {
            trainer_name: nome_treinador,
            pokemons: pokemons
        }

        await this.writeFile([obj])

        return obj
    }

    async consultar_todos_times() {
        const dados = await this.readFile('time.json')

        return dados
    }

    async consultar_time_por_nome_de_treinador(nome_treinador) {
        let dados = await this.readFile('time.json')
        dados = dados.filter(a => a.nome_treinador == nome_treinador)
    
        return dados
    }

    async readFile(path_arquivo) {
        const content = await readFile(path_arquivo)
        return JSON.parse(content.toString())
    }

    async writeFile(dados) {
        await writeFile('time.json', JSON.stringify(dados, null, 2))
    }
}

export default new TeamService()