import { Ticket } from "../../src/entidades/Tickets.js";
import { ticketsService } from "../../src/servicios/ticketsService.js";
import { Persistencia } from "./fileSystemProducts.js";
import { ticketsModel } from "./models/schemaTickets.js";

export class TicketManager {
    
    constructor(path) {
        this.tickets;
        this.path = path;
        this.persistencia =new Persistencia(path)
    }


    async readTickets() {
        const data = await this.persistencia.readTxt()
        this.tickets = JSON.parse(data);
    }

    async getTickets() {
       try {
        await this.saveTicketsLocal()
        return this.tickets
       } catch (error) {
        throw new Error('SERVER-COMUNICATION-ERROR')
       }
    }

    async getTicketById(id) {
        try {
            const ticketFiltrado = await ticketsModel.find({_id:id}).lean()
            if (!ticketFiltrado) {return "ticket not found"} else {return ticketFiltrado}
           } catch (error) {
            throw new Error('NOT-FOUND')
           }
    }
    async getTicketByUserName(userName) {
      try {
        const ticketFiltrado = await ticketsModel.findOne({usuario: userName}).lean();
        if (ticketFiltrado) {
          return ticketFiltrado;
        }
        else {
          throw new Error("NOT-FOUND");
        }
      } catch (error) {
          throw error;
      }
    }
    async saveTicketsLocal(){
        try {
        const tickets = await ticketsModel.find().lean()
        this.tickets = tickets;
        const jsonTickets= JSON.stringify(this.tickets, null, 2)
        await this.persistencia.saveTxt(jsonTickets)
        
        } catch (error) {
            throw new Error('SERVER-COMUNICATION-ERROR')
        }
    }
    async createTicket(ticket){
        try {
            // const ticketNuevo = ticketsService.crearTicket(ticket)
            await ticketsModel.create(ticket)
            await this.saveTicketsLocal()
           } catch (error) {
            throw new Error('Campo-con-valor-invalido')
           }
    }
    async updateTicket(id,ticketModificado){
        try {
            const filtro = {_id:id}
            const update = ticketModificado
            await ticketsModel.findOneAndUpdate(filtro,update)
            await this.saveTicketsLocal()
           } catch (error) {
            throw new Error('NOT-FOUND')
           }
    }

    async deleteTicket(id){
        try {
            // const ticketEliminado = await ticketsModel.findByIdAndDelete(id)
            await ticketsModel.findByIdAndDelete(id)
            await this.saveTicketsLocal()
           } catch (error) {
            throw new Error('ELIMINACION-FALLIDA')
           }
    }
    async deleteAllTickets(){
        try {
            await ticketsModel.deleteMany({})
            await this.saveTicketsLocal()
           } catch (error) {
            throw new Error('ELIMINACION-FALLIDA')
           }
    }

}


export const ticketManager = new TicketManager('./tickets.txt')
