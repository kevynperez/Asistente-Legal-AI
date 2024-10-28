import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:8000/",
})

export const pruebaBiblioteca = ()=> {
    try {
        return api.get('biblioteca/prueba')
    } catch (error) {
        console.log(error); 
    }
}

export const responder = (pregunta)=> {
    try {
        return api.get('/responder', {params: {pregunta: pregunta}})
    } catch (error) {
        console.log(error);
        
    }
}