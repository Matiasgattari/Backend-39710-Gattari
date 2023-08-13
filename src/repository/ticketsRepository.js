import { ticketManager } from "../../public/dao/ticketManager.js"
import { winstonLogger } from "../utils/winstonLogger.js"

class TicketsRepository {

    
  async crearTicket(ticket) {
    winstonLogger.info("crear ticket repository")
    const creado = await ticketManager.createTicket(ticket)
    return creado
  }
 
  async buscarTickets(){
    const tickets = await ticketManager.getTickets()
    return tickets
    
  }
  async buscarTicketPorId(id){
    const ticket = await ticketManager.getTicketById(id)
    return ticket
    
  }
  async buscarTicketPorEmail(userName){
    const ticket = await ticketManager.getTicketByUserName(userName) 
    return ticket
    
  }

  async eliminarTicket(id){
    const ticket = await ticketManager.deleteTicket(id) 
    winstonLogger.debug("ticket a eliminar: " + ticket)
    return "ticket eliminado"
  }

  async eliminarTodosTickets(){
    const ticket = await ticketManager.deleteAllTickets() 
    return "ticket eliminado"
  }

  async modificarTicket(id,ticketModificado){
    const ticketNuevo = await ticketManager.updateTicket(id,ticketModificado)
    return ticketNuevo
        
  }
}
export const ticketsRepository = new TicketsRepository()