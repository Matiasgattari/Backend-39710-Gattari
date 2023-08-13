const formularioTickets = document.getElementById("formularioTickets")
formularioTickets?.addEventListener("submit",e=>{
    e.preventDefault()
})



const botonEliminarTodosTickets = document.getElementById("botonEliminarTodosTickets")
botonEliminarTodosTickets?.addEventListener("click",async()=>{

    const response = await fetch('/api/tickets/', {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('NOT-FOUND');
      }
      
      const ticketsVacios = await response.json();
              
    if (response.ok) {
      location.reload()
    }

        
})

const botonEliminarTicket = document.getElementById("botonEliminarTicket")
botonEliminarTicket?.addEventListener("click",async(e)=>{
    e.preventDefault()
 // @ts-ignore
 const inputIDTicket = document.getElementById("inputIDTicket").value


 const response = await fetch('/api/tickets/' + inputIDTicket, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('NOT-FOUND');
  }
  
  const ticketsVacios = await response.json();
          
if (response.ok) {
  location.reload()
}
})


