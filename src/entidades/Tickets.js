import {randomUUID} from 'crypto'
  
export class Ticket {
    constructor( {email, monto, cart}) {
      try {
        if (!email||!monto||!cart) {
          throw new Error('Campo-vacio')
        }
        
        if(typeof(monto)!=="number"){
          throw new Error('Campo-con-valor-invalido')
        }
        
        if(typeof(email)!=="string"||typeof(cart)!=="string"){
          throw new Error('Campo-con-valor-invalido')
        }

        this.usuario=email;
        this.monto = monto;
        this.cart = cart;
        this.date =new Date().toLocaleDateString();
        this.code = randomUUID();
      } catch (error) {
        throw Error(error.message)
      }
  }
}


