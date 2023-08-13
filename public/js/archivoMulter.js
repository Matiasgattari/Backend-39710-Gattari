// import { schemaProducts } from "../dao/models/schemaProducts.js";

// // Función para validar el archivo .json
// function validarArchivo(input) {
//     // Obtener el archivo seleccionado
//     let archivo = input.files[0];
//     // Crear una instancia de FileReader
//     let lector = new FileReader();
//     // Leer el archivo como texto
//     lector.readAsText(archivo);
//     // Cuando se termine la lectura
//     lector.onload = function(e) {
//       // Obtener el resultado de la lectura
//       // @ts-ignore
//       let resultado = e.target.result;
//       // Convertir el resultado a un objeto JSON
//       let json = JSON.parse(resultado);
//       // Mostrar el objeto JSON en la pantalla
//       // @ts-ignore
//       document.getElementById("contenido").innerHTML = JSON.stringify(json, null, 2);
//       // Validar el objeto JSON contra el esquema de mongoose
//       let error = schemaProducts.validateSync(json);
//       // Verificar si hay un error o no
//       if (error) {
//         // Mostrar un mensaje de error al usuario
//         alert('El archivo no cumple con el esquema');
//       } else {
//         // Mostrar un mensaje de éxito al usuario
//         alert('El archivo cumple con el esquema');
//       } };
//     }