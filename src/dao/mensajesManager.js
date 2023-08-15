import { mensajesDB } from './models/schemaMessages.js'

export class MensajesManager {
    #mensajes
    #path

    constructor(path) {
        this.#path = path
        this.#mensajes = []
    }

    async #leer() {
     try {
        const mensajes = await mensajesDB.find().lean()
        this.#mensajes = mensajes
     } catch (error) {
        throw new Error('SERVER-COMUNICATION-ERROR')
     }
    }

    async #escribir(mensaje) {
       try {
        await this.#leer
        await mensajesDB.create(mensaje)
       } catch (error) {
        throw new Error('CREACION-FALLIDA')
       }
    }

    async guardarMensajes(mensajes) {
     try {
        await this.#leer()
        this.#mensajes.push(mensajes)
        await this.#escribir(mensajes)
        return mensajes
     } catch (error) {
        throw new Error('CREACION-FALLIDA')
     }
    }

    async buscarMensajes() {
        try {
            await this.#leer()
            return this.#mensajes
        } catch (error) {
            throw new Error('SERVER-COMUNICATION-ERROR')
        }
    }

    async borrar() {
        try {
            await mensajesDB.deleteMany({})
            return this.#mensajes=[]
        } catch (error) {
            throw new Error('ELIMINACION-FALLIDA')
        }
    }
}

export const mensajesManager = new MensajesManager('./mensajes.txt')

 
