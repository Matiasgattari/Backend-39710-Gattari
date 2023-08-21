import { carritosRepository } from "../../repository/carritosRepository.js"
import { ticketsRepository } from "../../repository/ticketsRepository.js"
import { productosRepository } from "../../repository/productosRepository.js"
import { ticketsService } from "../../servicios/ticketsService.js"

import nodemailer from "nodemailer";
import { winstonLogger } from "../../utils/winstonLogger.js";

export async function purchaseController (req,res){
    //datos Usuario
    const usuario = req.user
    // @ts-ignore
    const email = usuario['email']
    //id del carrito
    const carritoID= req.params['cid']

    //logica para calculo del monto del ticket
    const carritoFiltrado = await carritosRepository.buscarCarritoPorId(carritoID)
    
    const arrayPreciosProductosConStock = []
    const arrayProductosSinStock= []
    
    // @ts-ignore
    const montoCarrito = carritoFiltrado['products'].forEach(async function (element,indice) {
            // @ts-ignore compruebo valido stock sobre cantidad para vender
            if(element.productID['stock']>element.quantity){
                // @ts-ignore
                arrayPreciosProductosConStock.push(element.productID['price']*element.quantity);
                // @ts-ignore
                const productoBuscado = await productosRepository.buscarProductoPorId(element.productID['_id'])
                // @ts-ignore
                productoBuscado.stock =productoBuscado.stock - element.quantity
                // @ts-ignore
                const productoModificado = await productosRepository.modificarProducto(element.productID['_id'],productoBuscado)
            } else { arrayProductosSinStock.push(element) }
        });
        
    const sumaCantidadesSinStock = arrayProductosSinStock.reduce(function(acumulador, producto) { return acumulador + producto.quantity }, 0)

    const valorInicial = 0;
    const monto = arrayPreciosProductosConStock.reduce((accumulator, currentValue) => accumulator + currentValue, valorInicial)

    const nuevoTicket = {email:email, monto:monto, cart:carritoID}
    const ticket = await ticketsService.crearTicket(nuevoTicket)

    await ticketsRepository.crearTicket(ticket)

    //Vaciado del carrito:
    // @ts-ignore
    const carritoNuevo = {_id:carritoID,id:carritoFiltrado['id'],quantity:sumaCantidadesSinStock, products:arrayProductosSinStock}
    

    const carritoFinal = await carritosRepository.modificarCarrito(carritoID,carritoNuevo)
    const carritoString = carritoFinal['_id']
    

//Envio de EMAIL para confirmaciòn de la compra
    // Configuración de Gmail
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
            user: "emailpruebagattari@gmail.com",
            pass: "zpqjbarpnpxwonyd", // contraseña de aplicacion
            },
        });
        
        // Crear mensaje 
        let mailOptions = {
            from: "emailpruebagattari@gmail.com", 
            // @ts-ignore
            to: email, 
            subject: "Compra finalizada",
            // @ts-ignore
            text: `Se le informa que su compra ha sido procesada. Los siguientes productos estan faltos de stock: ${carritoFinal['products']} . De no visualizar ningun producto en la lista, todos los productos fueron comprados correctamente. Gracias por su compra`,
        };
      
        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            // Mensaje de error si falla
            winstonLogger.fatal(error)
            } else {
                // Mensaje de confirmación si se envía correctamente
                winstonLogger.debug("Correo enviado: " + info.response)
            }
        });


    res.render('finalizarTicket', {
        titulo: 'Tickets',
        encabezado: 'Ticket finalizado correctamente',
        carrito: carritoFinal['_id'],
        productos: carritoFinal['products'],
        hayProductos:carritoFinal['products'].length>0,
    })


}