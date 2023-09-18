// Importa a função 'pipeline' do pacote '@xenova/transformers'.
import { pipeline } from '@xenova/transformers'

// Define uma função assíncrona 'summarize' que realiza um resumo de texto.
export async function summarize(text) {
    try {
        console.log("Realizando o resumo...")

        // Cria uma instância de gerador de resumo usando 'pipeline'.
        const generator = await pipeline(
            "summarization", 
            "Xenova/distilbart-cnn-12-6"
        )

        // Gera um resumo do texto de entrada.
        const output = await generator(text)

        console.log("Resumo concluído com sucesso.")

        // Retorna o texto do resumo gerado.
        return output[0].summary_text
    }
    catch (error) {
        console.log("Ocorreu um erro ao realizar o resumo.")
        console.log(error)
        throw new Error(error)
    }
}
