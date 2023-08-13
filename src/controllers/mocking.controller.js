import { generarProductos } from "../utils/mocking.js";

export async function mockingController(req, res,next) {
    try {
        const productos = await generarProductos(100);
        res.json(productos);
    } catch (error) {
        next(error)
    }
 }