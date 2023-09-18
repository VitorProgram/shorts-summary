// Importa a função 'pipeline' do pacote '@xenova/transformers'.
import { pipeline } from '@xenova/transformers'

// Define uma função assíncrona 'transcribe' que realiza transcrição de áudio.
export async function transcribe(audio) {
    try {
        console.log("Realizando a transcrição...")

        // Cria uma instância de transcrição usando 'pipeline'.
        const transcribe = await pipeline(
            "automatic-speech-recognition",
            "Xenova/whisper-small"
        )

        // Executa a transcrição do áudio com configurações específicas.
        const transcription = await transcribe(audio, {
            chunk_length_s: 30,
            stride_length_s: 5,
            languages: "portuguese", 
            task: "transcribe"
        })

        console.log("Transcrição finalizada com sucesso.")

        // Retorna o texto da transcrição, removendo '[Música]' se presente.
        return transcription?.text.replace('[Música]', '')
    } 
    catch (error) {
        throw new Error(error)
    }
}
