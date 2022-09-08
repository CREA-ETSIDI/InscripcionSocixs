# InscripcionSocixs
Código de Google AppScripts que tenemos en el SpreadSheet para incluir lxs socixs que se inscriben en Google Contacts.

Las Instrucciones de Uso se encuentran también en Globales.gs

# Instrucciones de Uso
## Importante

- Para que todo trabaje correctamente, en el proyecto deben encontrarse Globales.gs y Main.gs
- O, en su defecto, la unión del contenido de ambas.
- El código va ligado a la hoja de Gooogle SpreadSheet: Menú Barra superior de la hoja > Extensiones > Apps Scripts
- Copy&pastea todo lo que está incluido ahí y sigye leyendo Deploy.

## Deploy

0) Antes de lanzar el formulario, con el excel que debe estar ligado a este script,
deben actualizarse con los valores del nuevo curso.

    0) Siempre se modifica LABEL_GRUPO_SOCIXS para reflejar el curso académico.
    1) Además, si se modifica el formulario es muy posible que deba modificarse las constantes
       que están debajo del AVISO
    Dejo constancia de que estos valores son acordes al formulario "[renovado2022]" en 2022

    Ya debería estar disponible el botón para añadir manualmente los contactos en
    Barra de Menús > Gestor Contactos > Añadir contacto manualmente
    Sin embargo, los contactos no se añadirán al grupo de contactos, pues no se ha creado.

1) Ve a Main.gs, selecciona la función 'inicializador_global' y ejecútala.
  Creará el grupo de contactos y establecerá el activador para que se añadan los contactos
  automáticamente conforme se inscriban lxs socixs

Ahora todo debería ir sobre ruedas
