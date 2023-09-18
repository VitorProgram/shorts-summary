// Importa o servidor a partir do arquivo server.js.
import { server } from "./server.js";

// Seleciona elementos HTML do DOM.
const form = document.querySelector("#app #form"); // Selecionando o formulário no elemento com id "app".
const input = document.querySelector("#form #input-url"); // Selecionando o input do formulário.
const content = document.querySelector("#app #content"); // Seleciona o parágrafo abaixo do resumo.

// Define um evento de submissão do formulário.
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede que a página seja recarregada ao enviar o formulário.
    content.classList.add("placeholder"); // Adiciona uma classe "placeholder" ao elemento p

    const videoUrl = input.value; // Obtém o valor do input de URL de vídeo.

    // "!" -> Verifica se o vídeo não é um vídeo curto ("shorts").
    if (!videoUrl.includes("shorts")) {
        content.textContent = "This video does not appear to be a short."; // Define o texto de conteúdo.
        return; // Encerra o processo se não for um vídeo curto.
    }

    // Divide a URL em partes para extrair o ID do vídeo.
    const [ _, params ] = videoUrl.split('/shorts/'); // Separa a URL no ponto "/shorts/".
    const [ videoId ] = params.split("?si"); // Separa a parte do vídeo ID, excluindo qualquer coisa após "?si".

    content.textContent = "Getting text from audio..."; // Atualiza o texto de conteúdo.

    // Realiza uma solicitação assíncrona para obter a transcrição do áudio do servidor.
    const transcription = await server.get(`/summary/${videoId}`);

    content.textContent = "Carrying out the summary..."; // Atualiza o texto de conteúdo.

    // Realiza uma solicitação assíncrona para resumir o texto da transcrição.
    const summary = await server.post("/summary", {
        text: transcription.data.result
    });

    content.textContent = summary.data.result; // Atualiza o conteúdo com o resumo.
    content.classList.remove("placeholder"); // Remove a classe "placeholder" do p.
});
