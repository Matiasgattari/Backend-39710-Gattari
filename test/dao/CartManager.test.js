import mongoose from 'mongoose';

import assert from 'node:assert'
import { cartManager } from '../../public/dao/CartManager.js'
import { productManager } from '../../public/dao/ProductManager.js';
import { productosService } from '../../src/servicios/productosService.js';
import { json } from 'express';
import { log } from 'node:console';


// datos de prueba ----------------------------------------------------------------------------------------------

const testData = {
  _id: "64a787eccb79472dae12d843",
  id: "040cff69-9348-4ee5-af59-2cb925a38e37",
  quantity: 0,
  products: []
}

const testDataCompleto = {
  _id: "64851351024ed2d6a66c5c50",
  id: "5f445c06-d1fa-4a7e-b9bb-d67205d3cc3a",
  quantity: 1,
  products: [
    {
      productID: {
        _id: "648346e20be32cd25d6d5f60",
        title: "charmander",
        description: "numero pokedex 4",
        price: 15000,
        thumbnail: "charmander.jpg",
        stock: 10,
        code: "pokemon salamandra",
        category: "fuego",
        status: true,
        id: "2f6e5c9c-5235-4aa4-bb13-52c10516cd2a"
      },
      quantity: 1,
      _id: "64851393024ed2d6a37c5c7b"
    }
  ]
}


const testDataIncompleto = {
  _id: "64a787eccb79472dae12d843",
  quantity: 0,
  products: []
}


//-----------------------------------------------------------------------------------------------------------------

before(async () => {
  // esto sucede antes de comenzar la primera prueba
  await mongoose.connect('mongodb+srv://daravhel:coderhouse@cluster0.zibn0jy.mongodb.net/test?retryWrites=true&w=majority')
})

    
afterEach(async () => {
  await mongoose.connection.collection('carts').deleteMany({})
  await mongoose.connection.collection('products').deleteMany({})
})

beforeEach(async () => {
  await mongoose.connection.collection('carts').deleteMany({})
  await mongoose.connection.collection('products').deleteMany({})
})

describe('DAO cartManager', () => {

  beforeEach(async () => {
    await mongoose.connection.collection('carts').deleteMany({})
    await mongoose.connection.collection('products').deleteMany({})
  })

  describe('crearCarrito', () => {
    describe('cuando llamo al create sin enviarle ningun criterio', () => {
      it('devuelve el carrito creado agregandole el campo "_id" de mongoose pero sin métodos', async () => {
        const creado = await cartManager.crearCarrito()
        assert.ok(creado._id, 'debería tener _id')
        assert.ok(creado.id, 'debería tener id')
        assert.deepStrictEqual(creado.quantity,0, 'la cantidad deberia ser 0')
        assert.ok(creado.products, 'debería tener products')
      })
    })
  })


  describe('getCarts', () => {
    describe('cuando llamo al getCarts con un criterio vacío', () => {
      it('devuelve todos los objetos de la colección sin métodos',async () => {
        const creado = await cartManager.crearCarrito()
        const pojos = await cartManager.getCarts()
    //  assert.deepStrictEqual(pojos.lenght,0, 'deberìa existir al menos 1 carrito')
        assert.ok(pojos, 'Muestra la lista de carritos')
      })
    })
  })


  describe('agregarProductoAlCarrito', () => {
    describe('cuando llamo al agregarProductoAlCarrito enviando como parametros un CID  y un PID', () => {
      it('Agrega el producto PID al carrito CID y lo devuelve',async () => {
        
        const creado = await cartManager.crearCarrito()
        const cid = creado._id
        
        const productoAgregar = {"title":"prueba1","description":"prueba1","price":16,"thumbnail":"prueba1","stock":15,"code":"prueba1","category":"prueba1","status":true,"owner":"prueba1"}
        const productoService = await productosService.crearProducto(productoAgregar)
        const producto = await productManager.addProduct(productoService)
        const pid = producto._id

        const pojos = await cartManager.agregarProductoAlCarrito(cid,pid)

        assert.ok(pojos, 'Devuelve el carrito')
      })
    })
  })

  
  describe('eliminarProducto', () => {
    describe('cuando llamo al eliminarProducto con un CID y PID', () => {
       it('devuelve el carrito, pero con el producto eliminado',async () => {
     
           const creado = await cartManager.crearCarrito()
           const cid = creado._id
     
           const productoAgregar = {"title":"prueba1","description":"prueba1","price":16,"thumbnail":"prueba1","stock":15,"code":"prueba1","category":"prueba1","status":true,"owner":"prueba1"}
           const productoService = await productosService.crearProducto(productoAgregar)
           const producto = await productManager.addProduct(productoService)
           const pid = producto._id
     
     
           const pojos = await cartManager.eliminarProducto(cid,pid)
           assert.ok(pojos, 'deberìa existir el carrito carrito')
     
         })
       })
    })
 

  describe('eliminarCarrito', () => {
    describe('cuando llamo al eliminarCarrito con un CID', () => {
      it('Elimina el carrito y devuelve el mensaje -carrito eliminado correctamente-',async () => {
          const creado = await cartManager.crearCarrito()
          const cid = creado._id
          const mensajeEliminar = await cartManager.eliminarCarrito(cid)
          
          assert.deepStrictEqual(mensajeEliminar,"carrito eliminado correctamente","el mensaje al eliminar el carrito deberia coincidir")
          
          await assert.rejects(
            async () => {
              await cartManager.getCartById(cid);
            })

      })
    })
  })


  describe('modificarCarrito', () => {
    describe('cuando llamo al modificarCarrito pasandole un CID y un objeto carrito modificado', () => {
      it('devuelve el carrito modificado sin métodos',async () => {
          const creado = await cartManager.crearCarrito()
          const cid = creado._id

          const carritoModificado = {_id:cid,id:"2d5fb911-2f2f-40c3-9049-b72a143f3dbe",quantity:3,products:[{productID:{_id:"64b6f1a283fff8f5e6744a0a",title:"squirtle",description:"pokemon agua",price:15000,thumbnail:"squirtle.jpg",stock:15,code:"122-363-898",category:"inicial",status:true,id:"c766cb48-d4f8-4896-855b-2b0a922f2f42",owner:"lea.mg90@gmail.com"},quantity:1,_id:"64b6f1ac83fff8f5e6744a13"},{productID:{_id:"64b6dfc3a8933c90bbc3355d",title:"charmander",description:"pokemon fuego",price:15000,thumbnail:"charmander.jpg",stock:15,code:"222-333-444",category:"inicial",status:true,id:"a0f0ecc2-b548-4072-8976-38f8c7f08c12",owner:"lea.mg90@gmail.com"},quantity:2,_id:"64b6f1be83fff8f5e6744a25"}]}
          
          const carritoPojo = await cartManager.modificarCarrito(cid,carritoModificado)

          assert.deepStrictEqual(cid,carritoPojo._id, 'El CID deberia mantenerse identico')
          assert.ok(carritoPojo, 'Muestra el carrito modificado')
      })
    })
  })
  

  describe('getCartById', () => {
    describe('cuando llamo al getCartById con un CID', () => {
      it('devuelve el carrito deseado, sin métodos',async () => {
        const creado = await cartManager.crearCarrito()
        const cid = creado._id

        const pojo = await cartManager.getCartById(cid)
 
        assert.deepStrictEqual(JSON.stringify(cid),JSON.stringify(pojo?._id), 'El CID deberia mantenerse identico')
        assert.ok(pojo, 'Muestra el carrito buscado')
      })
    })
  })

  
  describe('vaciarCarrito', () => {

    describe('cuando llamo al vaciarCarrito con un CID', () => {
      it('devuelve el mismo carrito, pero con un array vacio en products, sin métodos',async () => {
        
     // Probado en agregarProductoAlCarrito mas arriba
        const creado = await cartManager.crearCarrito()
        const cid = creado._id
        
        const productoAgregar = {"title":"prueba1","description":"prueba1","price":16,"thumbnail":"prueba1","stock":15,"code":"prueba1","category":"prueba1","status":true,"owner":"prueba1"}
        const productoService = await productosService.crearProducto(productoAgregar)
        const producto = await productManager.addProduct(productoService)
        const pid = producto._id


      //Parte nueva
        const pojo = await cartManager.vaciarCarrito(cid)
        assert.deepStrictEqual(pojo?.products,[], "La lista de productos deberìa ser un array vacio")
        assert.deepStrictEqual(JSON.stringify(cid),JSON.stringify(pojo?._id), "El CID del carrito deberia ser el mismo")
      })
    })
  })


  describe('modificarUnidadesProcducto', () => {
    describe('cuando llamo al modificarUnidadesProcducto con un CID, PID y cantidad de unidades', () => {
      it('devuelve el carrito especificado con el mismo CID pero con las unidades del producto indicado modificadas',async () => {

     // Probado en agregarProductoAlCarrito mas arriba
        const creado = await cartManager.crearCarrito()
        const cid = creado._id
        
        const productoAgregar = {"title":"prueba1","description":"prueba1","price":16,"thumbnail":"prueba1","stock":15,"code":"prueba1","category":"prueba1","status":true,"owner":"prueba1"}
        const productoService = await productosService.crearProducto(productoAgregar)
        const producto = await productManager.addProduct(productoService)
        const pid = producto._id
       
        const pojo = await cartManager.agregarProductoAlCarrito(cid,pid)

      //Parte nueva
        const cantidad = 5
        const carritoModificado = await cartManager.modificarUnidadesProcducto(JSON.stringify(cid),JSON.stringify(pid),cantidad)
        assert.deepStrictEqual(carritoModificado,"Carrito modificado correctamente","Los mensajes deben coincidir")
      })
    })
  })

})




// after(async () => {
//   // esto sucede luego de finalizar las purebas
//   await mongoose.disconnect()
// })
