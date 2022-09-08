// Contributed by Echedey Luis

// # Instrucciones de Uso
// ## Importante
// 
// - Para que todo trabaje correctamente, en el proyecto deben encontrarse Globales.gs (este archivo si lo lees desde el código) y Main.gs
// - O, en su defecto, la unión del contenido de ambas.
// - El código va ligado a la hoja de Gooogle SpreadSheet: Menú Barra superior de la hoja > Extensiones > Apps Scripts
// - Copy&pastea todo lo que está incluido ahí y sigye leyendo Deploy.
// 
// ## Deploy
// 
// 0) Antes de lanzar el formulario, con el excel que debe estar ligado a este script,
// deben actualizarse con los valores del nuevo curso.
// 
//     0) Siempre se modifica LABEL_GRUPO_SOCIXS para reflejar el curso académico.
//     1) Además, si se modifica el formulario es muy posible que deba modificarse las constantes
//        que están debajo del AVISO
//     Dejo constancia de que estos valores son acordes al formulario "[renovado2022]" en 2022
// 
//     Ya debería estar disponible el botón para añadir manualmente los contactos en
//     Barra de Menús > Gestor Contactos > Añadir contacto manualmente
//     Sin embargo, los contactos no se añadirán al grupo de contactos, pues no se ha creado.
// 
// 1) Ve a Main.gs, selecciona la función 'inicializador_global' y ejecútala.
//   Creará el grupo de contactos y establecerá el activador para que se añadan los contactos
//   automáticamente conforme se inscriban lxs socixs
// 
// Ahora todo debería ir sobre ruedas

// Título del grupo de contactos en el que se guardarán los contactos de los inscritos en este curso
const LABEL_GRUPO_SOCIXS = "Socixs CREA [22-23]"

// AVISO: los siguientes valores deben modificarse si
// se modifican las preguntas o el orden en el formulario
const SOCIX_DATA = { // Diccionario con indexes de una fila de proyecto EN EL ARRAY (sumar 1 si trabajas en el SPREADSHEET directamente)
  timestamp: 0,
  email: 1,
  first_name: 2,
  surname1: 3,
  surname2: 4,
  num_matricula: 5,
  nif: 6,
  telephone: 7
};
// Columna en la que se pone la etiqueta de "contacto añadido" -> "Si"
// Igual al último índice de ARRAY más 2
// Se ve fácil escribiendo en la A un 1, en B un 2 y con la herramienta de autocompletar (arrastrando esquina)
// llevarlo hasta la que toque. Será ese número.
const COLUMNA_ADDED = 32;
