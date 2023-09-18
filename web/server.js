// Importa a biblioteca Axios, que será usada para fazer solicitações HTTP.
import axios from "axios";

// Cria uma configuração personalizada do Axios para conectar o frontend com o backend.
export const server = axios.create({
    baseURL: "http://localhost:3333", // Define a URL base do servidor backend como "http://localhost:3333".
})
