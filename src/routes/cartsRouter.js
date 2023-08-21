import express, {
    Router
} from 'express';


import nodemailer from "nodemailer";


// @ts-ignore
import util from 'node:util'

// @ts-ignore
import { carritosRepository } from '../repository/carritosRepository.js';
import { soloAdmin, soloLogueados } from '../middlewares/soloLogueados.js';
import { ticketsRepository } from '../repository/ticketsRepository.js';
import { passportInitialize, passportSession } from '../middlewares/passport.js';

import session from '../middlewares/session.js';
import { ticketsService } from '../servicios/ticketsService.js';
import { productosRepository } from '../repository/productosRepository.js';
import { winstonLogger } from '../utils/winstonLogger.js';
import { purchaseController } from '../controllers/web/purchaseController.js';

export const cartsRouter = Router()

cartsRouter.use(session)
cartsRouter.use(express.json())
cartsRouter.use(express.urlencoded({extended:true}))


//PASSPORT
cartsRouter.use(passportInitialize, passportSession)


// @ts-ignore
cartsRouter.get('/json/cartsJSON', async (req, res) => {
    
    const carritos = await carritosRepository.buscarCarritos()
    res.send(carritos)
})


cartsRouter.get('/:cid',soloLogueados, async (req, res) => {
       try {
        const IDCarrito = req.params.cid
        // @ts-ignore
        const rol = req.user.rol
        // @ts-ignore
        const carritosLeidos = await carritosRepository.buscarCarritos()
       
        if (IDCarrito)  {const carritoFiltradoID= await carritosRepository.buscarCarritoPorId(IDCarrito)
        const hayCarrito= carritoFiltradoID !==null
        const arrayProductos =  []
        const cantidadProductos =  []
        const forEach = carritoFiltradoID?.products.forEach(e=>{arrayProductos.push(`Producto:${util.inspect(e.productID, false, 10)}, Cantidad: ${e.quantity} `); cantidadProductos.push(e.quantity)})
        res.render('carritoCompra.handlebars', {
            id:IDCarrito,
            encabezado: 'Carrito para comprar',
            hayCarrito,
            cantidad:cantidadProductos.reduce((accumulator, currentValue) => accumulator + currentValue,0),            
            arrayProductos,
            rol:rol
       })
    }}
         catch(error) {
             res.status(500).json({
            message: error.message
        })
    }


})


// @ts-ignore
cartsRouter.get('/',soloLogueados,soloAdmin, async (req, res) => {
const carritos = await carritosRepository.buscarCarritos()
const arrayCarritos = []
// @ts-ignore
const carritoForeach = carritos.forEach((carrito)=> arrayCarritos.push(JSON.stringify(carrito)))



const hayCarritos = (arrayCarritos!=null)

    res.render('carts.handlebars', {
        encabezado: 'Lista de carritos creados',
        hayCarritos,
        carritos,
        arrayCarritos
   })

})


cartsRouter.post('/:cid/product/:pid',soloLogueados, async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const agregarCarrito = await carritosRepository.agregarProductoAlCarrito(cid,pid)
        res.json(agregarCarrito)
    } catch (error) {
        throw new Error('id no encontrado')
    }
})

cartsRouter.put('/:cid/product/:pid',soloLogueados, async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const quantity = req.body.quantity
        const modificarQantity = await carritosRepository.modificarCantidadProducto(cid,pid,quantity)
        res.json(modificarQantity)
    } catch (error) {
        throw new Error('id no encontrado')
    }
})


cartsRouter.get('/:cid/productoEliminar/:pid',soloLogueados,async(req,res)=>{

try {
    const pid = req.params.pid
    const cid = req.params.cid
    const carritoBuscado = await carritosRepository.buscarCarritoPorId(cid)
   const productoEliminado = await carritosRepository.eliminarProducto(cid,pid)
    res.redirect(`/api/carts/${cid}`)
} catch (error) {
    const pid = req.params.pid
    const cid = req.params.cid
    throw new Error(`El producto  ${pid} no se pudo eliminar del carrito ${cid} `)
}
})

cartsRouter.get('/:cid/vaciarCarrito',soloLogueados,async(req,res)=>{

    try {
        const cid = req.params.cid
       
       const productoEliminado = await carritosRepository.vaciarCarrito(cid)
        res.redirect(`/api/carts/${cid}`)
        // res.json(productoEliminado)
    } catch (error) {
        const cid = req.params.cid
        throw new Error(`No se ha podido vaciar el carrito ${cid} `)
    }
    })
    
cartsRouter.delete('/:cid',soloLogueados,async( req,res)=>{
   
    try {
        const IDCarrito = req.params.cid
        // @ts-ignore
        const carritosLeidos = await carritosRepository.buscarCarritos()
        const carritoFiltradoID=await carritosRepository.buscarCarritoPorId(IDCarrito)
        if(!carritoFiltradoID) {throw new Error("carrito no encontrado")}
        await carritosRepository.eliminarCarrito(IDCarrito)
        res.send("carrito eliminado correctamente")
        }
         catch(error) {
             res.status(500).json({
            message: error.message
        })
    }})
cartsRouter.delete('/:cid/products/:pid',soloLogueados,async( req,res)=>{
     
    try {
        const productoID= req.params['pid']
        const carritoID= req.params['cid']
        const productosFiltrados = await carritosRepository.eliminarProducto(carritoID,productoID)
        res.send(productosFiltrados)
    } catch (error) {
        throw new Error ('Error: no se encontro el producto filtrado. ')
    }
    } )

cartsRouter.get('/:cid/purchase',soloLogueados, purchaseController)