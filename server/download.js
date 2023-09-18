// Importa as bibliotecas 'ytdl-core' e 'fs'.
import ytdl from 'ytdl-core'
import fs from 'fs'

// Função 'download' que recebe um 'videoId' como parâmetro.
export const download = (videoId) => 
    new Promise((resolve, reject) => {
        // Monta a URL do vídeo a ser baixado.
        const videoUrl = `https://www.youtube.com/shorts/${videoId}`

        // Exibe uma mensagem informando o início do download.
        console.log(`Iniciando o download do vídeo: ${videoId}`)

        // Inicia o download do vídeo com a qualidade de áudio mais baixa e filtro para áudio apenas.
        ytdl(videoUrl, {
            quality: "lowestaudio",
            filter: "audioonly"
        })
        .on("info", (info) => {
            // Verifica se a duração do vídeo é maior que 60 segundos.
            const seconds = info.formats[0].approxDurationMs / 1000
            
            if (seconds > 61) {
                throw new Error("A duração deste vídeo é maior que 60 segundos.")
            }
        })
        .on("end", () => {
            // Exibe uma mensagem quando o download é concluído.
            console.log("Download do vídeo concluído.")
            resolve()
        })
        .on("error", (error) => {
            // Exibe uma mensagem de erro caso o download falhe.
            console.log(`Não foi possível fazer o download do vídeo. Detalhes do erro: ${error}`)
            reject()
        })
        .pipe(fs.createWriteStream("./tmp/audio.mp4")) // Salva o vídeo no arquivo "./tmp/audio.mp4".
    })
