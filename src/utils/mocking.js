import {
    randomUUID
} from 'crypto'

function generarProducto() {
  // posibles valores para el título y la categoría
  const titulos = ["Croconaw", "Lanturn", "Blissey", "Ludicolo", "Gardevoir", "Tropius", "Kricketune", "Cherrim", "Magnezone", "Leafeon", "Gigalith", "Scolipede", "Carracosta", "Fennekin", "Pangoro", "Sylveon", "Oricorio", "Drampa", "Rookidee", "Cramorant"]
  const categorias = ["Normal", "Fuego", "Agua", "Planta", "Eléctrico", "Hielo", "Lucha", "Veneno", "Tierra", "Volador", "Psíquico", "Bicho", "Roca", "Fantasma", "Dragón", "Siniestro", "Acero", "Hada"]

  // Título y categoría al azar
  const titulo = titulos[Math.floor(Math.random() * titulos.length)];
  const categoria = categorias[Math.floor(Math.random() * categorias.length)];
  const descripcion = `Pokemon  ${categoria}`;
  const precio = Math.floor(Math.random() * 10000) + 1; // Entre 1 y 1000
  const stock = Math.floor(Math.random() * 100) + 1; // Entre 1 y 100
  const status = Math.random() < 0.5; // Verdadero o falso al 50%
  const code = randomUUID();
  const id = randomUUID();

  // devuelvo el producto generado
  return {
    "_id": id,//simulo _id de mongo 
    "title": titulo,
    "description": descripcion,
    "price": precio,
    "thumbnail": `${titulo}.jpg`,
    "stock": stock,
    "code": code,
    "category": categoria,
    "status": status,
    "id": id
  };
}

// Generador de array productos segun cantidad
export function generarProductos(cantidad) {
   const productos = [];
  for (let i = 0; i < cantidad; i++) {
    const producto = generarProducto();
    productos.push(producto);
  }
  return productos;
}



