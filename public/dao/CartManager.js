// import { ProductManager } from "./ProductManager.js";
import { productManager } from "./ProductManager.js";
import {
    privateDecrypt,
    randomUUID
} from 'crypto'
import fs from 'fs/promises'

import mongoose from 'mongoose';
import { cartsDB } from "./models/schemaCarts.js";
import util from 'node:util'
import { log } from "console";
import { Persistencia } from "./fileSystemProducts.js";
import { productosService } from "../../src/servicios/productosService.js";
import { Cart } from "../../src/entidades/Carts.js";
import { carritosService } from "../../src/servicios/carritosService.js";
import { productosRepository } from "../../src/repository/productosRepository.js";
import { toPojo } from "../../src/utils/utilidades.js";



export class CartManager {

    constructor(path) {
        this.carts;
        this.path = path;
        this.products = [];
        this.persistencia =new Persistencia(path)
    }
    async readCarts() {
       try {
        //  const data = await fs.readFile(this.path, "utf-8");
        await this.persistencia.readTxt()
       } catch (error) {
        throw new Error('CART-NOT-FOUND')
       }
        
    }

    async getCarts() {
      try {
        await this.readCarts();
        const cartsbd = await cartsDB.find().lean()
        this.carts = cartsbd
        return this.carts
      } catch (error) {
        throw new Error('CART-NOT-FOUND')
      }

    }

    async crearCarrito() {

        try {
        await this.getCarts()
               
        const cart =await carritosService.crearCarrito()

        this.carts.push(cart)

        const jsonCarts = JSON.stringify(this.carts, null, 2)
        await this.persistencia.saveTxt(jsonCarts)
        const carritoMongoose = await cartsDB.create(cart)
     
        return toPojo(carritoMongoose)
        } catch (error) {
            throw new Error('CART-NOT-FOUND')
        }
    }
   
    async agregarProductoAlCarrito(cid, pid) {
        try {
           
            const productos = await productosRepository.buscarProductos()
            const productoIndex = productos.findIndex(prod => prod['_id'] == pid)
            const productoFiltrado = productos[productoIndex]

            //ubico carrito por cid
            const carritos = await this.getCarts()
            const carritoIndex = carritos.findIndex(carrito => carrito['_id'] == cid)
            const carritoFiltrado = carritos[carritoIndex]
  
            //formato de producto a pushear al array de productos del carrito
            let cant = 1
            const produID = {
                "productID": `${productoFiltrado._id}`,
                "quantity": `${cant}`
            };

            //array con todos los IDs de los productos del carrito.Es un parche para dejarlo funcional. TRATAR DE ARRAGLAR CUANDO HAYA TIEMPO. 
            const productosDentroDelCarrito = [];
            const carritoProductos = carritoFiltrado['products']

 
            carritoProductos.forEach(element => {
                if(element!==null){
                    productosDentroDelCarrito.push(element.productID)
                } else{
                    element={}
                    productosDentroDelCarrito.push(element.productID)
                }
            });
       
            //utilizo array de ids para saber si incluye PID. modifico cantidades o creo nuevo objeto
            const booleano = productosDentroDelCarrito.some(element => element['_id'] == pid )
            
            if (booleano) {
         
            const ubicoProducto = carritoProductos.find(el =>el.productID["_id"] == pid)
            ubicoProducto.quantity++;
                carritoFiltrado.quantity++;
                
                await cartsDB.findOneAndUpdate({_id:cid},carritoFiltrado)

                this.carts= await this.getCarts()
                const jsonCarts = JSON.stringify(this.carts, null, 2)
                await this.persistencia.saveTxt(jsonCarts)
               
            } else {
                const push = carritoProductos.push(produID)
                carritoFiltrado.quantity++;
                this.carts[carritoIndex].products = carritoProductos
                
                await cartsDB.findOneAndUpdate({_id:cid},carritoFiltrado)
                this.carts= await this.getCarts()
                const jsonCarts = JSON.stringify(this.carts, null, 2)
                await this.persistencia.saveTxt(jsonCarts)

            }

            //  return { "message": "producto cargado correctamente"  }
             return carritoFiltrado

        } catch (error) {
            new Error('CREACION-FALLIDA')
        }
    }



    async eliminarProducto(cid,pid){

        try {
        const carritoPorId =await  this.getCartById(cid)
        const productosCarrito =  carritoPorId?.products
        
        const carritos = await this.getCarts()
       
        const productosNuevo =[]
                // @ts-ignore
        productosCarrito?.forEach(e=>productosNuevo.push(e['productID']['_id']))
        
        const productosNuevoString = JSON.parse(JSON.stringify(productosNuevo))
        const productosindex = productosNuevoString.findIndex(e => e==pid)
        
        const tipoIndex =  parseInt(productosindex)
       
        const productosSplice = productosCarrito?.splice(tipoIndex,1)

        const carritoNuevo = carritoPorId
        carritoNuevo?.products==productosNuevo 

        await this.modificarCarrito(cid,carritoNuevo)

        return carritoNuevo
        } catch (error) {
                  throw new Error('NOT-FOUND')
                }

    }
    async eliminarCarrito(cid){

        try {
        await cartsDB.deleteOne({_id:cid})
        this.carts= await this.getCarts()
        const jsonCarts = JSON.stringify(this.carts, null, 2)
        await this.persistencia.saveTxt(jsonCarts)
        return "carrito eliminado correctamente"
        } catch (error) {
            throw new Error('NOT-FOUND')
        }

    }


    async saveCart() {
       try {
        const jsonCarts = JSON.stringify(this.carts, null, 2)
        await this.persistencia.saveTxt(jsonCarts)
       } catch (error) {
        throw new Error('NOT-FOUND')
       }
    }

    async modificarCarrito(cid,carritoNuevo){
        try {
            //{new: true}hace que el find devuelva el nuevo carrito
            const carrito = await cartsDB.findByIdAndUpdate(cid,carritoNuevo,{new: true})
            
            return await toPojo(carrito)
        } catch (error) {
            throw new Error('MODIFICACION-FALLIDA')
        }

    }
    async getCartById(id) {
        try {
        const IDrecibido = id;
        const cartsProducts =  await this.getCarts()
        
        this.carts = cartsProducts

        const cartFind = this.carts.find((cart) => cart._id == IDrecibido)

        if (cartFind === undefined) {
            throw new Error("NOT-FOUND")
        } else {
            const cartID = await cartsDB.findOne({ _id: IDrecibido }).lean()
            return cartID

        }
        } catch (error) {
            throw new Error('NOT-FOUND')
        }
    }

    async vaciarCarrito(id) {

        try {
            const carritoPorId =await  this.getCartById(id)
            const productosCarrito =  carritoPorId?.products

            const carritos = await this.getCarts()

            const productosNuevo =[]
                    // @ts-ignore
            productosCarrito?.forEach(e=>productosNuevo.push(e['productID']['_id']))

            const productosSplice = productosCarrito?.splice(0,productosCarrito.length)

            const carritoNuevo = carritoPorId
            carritoNuevo?.products==productosNuevo 

            await this.modificarCarrito(id,carritoNuevo)

            return carritoNuevo

        } catch (error) {
            throw new Error('MODIFICACION-FALLIDA')
        }
    }

    //----------------------------------EN PROCESO---------------------------------------
    //en proceso, actualizar cantidad del producto del carrito especificado. No logro que se modifique la cantidad del producto por la cantidad que recibo de parametro. todos los valores los recibo correctamente, pero al tratar de asignarle la cantidad, crashea todo

    async modificarUnidadesProcducto(cid,pid,cantidad) {
            
        try {
    
            const carritoPorId = await cartsDB.findById(JSON.parse(cid))
            const pojo = toPojo(carritoPorId)
            const productosCarrito =  util.inspect(pojo?.products, false, 10)
            // const carritoParseado = JSON.parse(productosCarrito)

            const productos = await productosRepository.buscarProductos()
            const productoFiltrado = productos.find(producto =>producto._id==pid)

            // const arrayProductos = []
            // const pushArray = productosCarrito?.forEach(async element => {
            //     arrayProductos.push(element['productID']?._id.toString())
            // })

            // const arrayProductosFiltrado = arrayProductos.filter(producto => producto._id == pid)

                       
        // const productoAModificar = arrayProductos.find( ( _id) => _id == pid )
        // productoAModificar.quantity=cantidad

    //     const indexProducto =arrayProductos.findIndex(({ _id }) => _id === pid )
    //     arrayProductos[indexProducto]=productoAModificar

    //     carritoPorId?.products == arrayProductos

    //    const carritoModificado = await this.modificarCarrito(cid,carritoPorId)

    //    return productos[0]["_id"] + " aaaaaaaaaaaaaaaaaaaaaaa " + typeof(productosCarrito)
     return "Carrito modificado correctamente"
        } catch (error) {
            throw new Error('MODIFICACION-FALLIDA')
        }

    }

}


export const cartManager = new CartManager('./carrito.txt')

