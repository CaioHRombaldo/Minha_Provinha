import app from './app'

function main() {
    try {
        app.listen(8000, 'localhost', () => {
            console.log('Iniciado na porta 8000')
        })
    } catch (err) {
        console.error('Erro ao iniciar servidor', err)
    }
}

main()