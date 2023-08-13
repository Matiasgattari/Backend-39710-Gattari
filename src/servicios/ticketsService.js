import { ticketManager } from "../../public/dao/ticketManager.js"
import { Ticket } from "../entidades/Tickets.js"


class TicketsService {

  async crearTicket(ticket) {
    const creado = new Ticket(ticket)
    return creado
  }

  
}
export const ticketsService = new TicketsService()