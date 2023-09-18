// Importa a biblioteca 'cors' do pacote 'cors' instalado no node_modules.
import cors from 'cors';

// Importa a biblioteca 'express' do pacote 'express' instalado no node_modules.
import express from 'express'

// Importa funções personalizadas para download, transcrição, sumarização e conversão para audio.
import { download } from './download.js'
import { transcribe } from './transcibe.js' // Correção: deveria ser './transcribe.js'
import { summarize } from './summarize.js'
import { convert } from './convert.js'

// Cria uma instância do Express e a armazena na constante 'app'.
const app = express()
app.use(express.json()) // Faz o express entender que irá receber propriedades .json
app.use(cors())

// Define uma rota para manipular solicitações GET que tenham um parâmetro de ID na URL.
app.get('/summary/:id', async (request, response) => {
    try {
        await download(request.params.id) // Fazendo o download do vídeo.
        const audioConverted = await convert()
        console.log(audioConverted)
        
        const result = await transcribe(audioConverted) // Realiza a transcrição do audio convertido.
        
        // Retorna o resultado como JSON na resposta.
        return response.json({ result })
    } 
    catch (error) {
        console.log(error)
        return response.json({ error })
    }
})

// Define uma rota para manipular solicitações POST para o resumo de texto.
app.post('/summary', async (request, response) => {
    try {
        const result = await summarize(request.body.text) // Chama a função de sumarização com o texto fornecido no corpo da solicitação.
    
        // Retorna o resultado do resumo como JSON na resposta.
        return response.json({ result })
    }
    catch (error) {
        console.log(error)
        return response.json({error})
    }
})

// Inicia o servidor Express e faz com que ele escute na porta 3333.
app.listen(3333, () => {
    console.log('Servidor está rodando na porta 3333.') // Exibe uma mensagem no console quando o servidor é iniciado.
})
