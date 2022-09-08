// Créditos originales a Marcelo Luna
// Mantenido posteriormente por Leonel Alejandro Aguilera
// 2022-09 Modificado por Echedey Luis

function inicializador_global() {
  // AVISO: ejecutar una sola vez manualmente tras editar todas las globales pertinentes
  // Contributed by Echedey Luis

  // Toma el grupo de contacto de lxs socixs, si no existe lo crea
  let grupo_contactos = ContactsApp.getContactGroup(LABEL_GRUPO_SOCIXS);
  if (grupo_contactos == null) { // I.e., no existe
    grupo_contactos = ContactsApp.createContactGroup(LABEL_GRUPO_SOCIXS);
    console.info("Se ha creado el grupo de contactos: "+LABEL_GRUPO_SOCIXS);
  }
  else {
    console.info("Ya existía el grupo de contactos: "+LABEL_GRUPO_SOCIXS);
  }

  // Crea el activador del añadidor automático de socixs
  // Pero solo cuando no existe ninguno
  // Damos por hecho que solo existe este
  let ss = SpreadsheetApp.getActive();
  let form = FormApp.openByUrl(ss.getFormUrl());
  // Importante ver los triggers del formulario
  let triggers = ScriptApp.getUserTriggers(form);
  if (triggers.length == 0) {
    CreadorDelActivador();
    console.info("No existía ningún trigger, así que se ha añadido el de agregar contactos.");
  }
  else if (triggers.length == 1) {
    console.info("Ya existe un trigger.");
  }
  else if (triggers.length > 1) {
    console.warn("Hay más de un trigger, tal vez deberías revisar esta sorpresa.");
  }
  else {
    console.error("Hay un problema gordo al leer los triggers.");
  }
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Gestor Contactos')
      .addItem('Añadir contacto manualmente', 'addContactManually')
      .addToUi();
}


function addContactFromRow(row_number) {
  // Contributed by Echedey Luis
  // Merges duplicated code
  let sheet = SpreadsheetApp.getActiveSheet();
  let lista_datos_usuario = sheet.getRange(row_number, 1, 1, COLUMNA_ADDED).getValues()[0]; // En principio, después de COLUMNA_ADDED no hay nada que editar

  let first_name = lista_datos_usuario[SOCIX_DATA.first_name];
  let last_name  = lista_datos_usuario[SOCIX_DATA.surname1];
  let email      = lista_datos_usuario[SOCIX_DATA.email];
  let telephone  = lista_datos_usuario[SOCIX_DATA.telephone];
  console.info("Inscrito: "+"Nombre: "+first_name+" Apellido: "+last_name+" Email: "+email+" Tlf: "+telephone);

  // Añadimos el contacto, luego al grupo, y añadimos teléfono
  // Sidenote: no sé si el orden procedural con el que se ha hecho es por algo en especial
  // Se mantiene la estructura original por si acaso

  let contacto = ContactsApp.createContact(first_name, last_name, email);
  console.info("Contacto creado");
  let grupo_socixs = ContactsApp.getContactGroup(LABEL_GRUPO_SOCIXS);
  if (grupo_socixs == null) {
    console.error("Duh, parece que no has iniciado el grupo de contactos...\nPor favor, lee las instrucciones en Globales.gs");
  }
  grupo_socixs.addContact(contacto);
  console.info("Añadido a grupo: "+LABEL_GRUPO_SOCIXS);
  contacto.addPhone(ContactsApp.Field.WORK_PHONE, telephone);
  console.info("Teléfono actualizado en el contacto");

  // Se entiende que si hemos llegado aquí no ha habido problemas
  let exito = sheet.getRange(row_number, COLUMNA_ADDED).setValue('Si');
  console.info("Estado indicado en la hoja de inscripciones");
}

function addContactManually() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var cell = sheet.getActiveCell();
    var active_row = cell.getRow();
    
    addContactFromRow(active_row);
}

function showOutputBox(str, title) {
  var html = HtmlService.createHtmlOutput('<pre>'+str+'</pre>')
    .setWidth(400)
    .setHeight(300);
  
    SpreadsheetApp.getUi() 
    .showModalDialog(html, title);
}

function showContactGroups() {
  var groups = ContactsApp.getContactGroups();
  var str ='Groups\n';
  for(var g = 0; g < groups.length; g++) 
  {
    str +='\n'+groups[g].getName()
    
  }
  
  showOutputBox(str,'Your Contact Groups');
}
/*function onOpen() 
{
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Contacts')
      .addItem('show Groups', 'showContactGroups')
      .addItem('add Contact', 'addContactManually')
      .addToUi();
}*/

/////////////////////////////////////////////////////////////////////////////////////

function addContactFromTrigger() {
  Utilities.sleep(500);
  var sheet = SpreadsheetApp.getActiveSheet();
  SpreadsheetApp.flush();
  Utilities.sleep(1000);
  SpreadsheetApp.flush();
  var active_row = Math.max(sheet.getLastRow()-10,1);
  Logger.log("Posible* Fila de escritura = "+active_row);
  while(true)
  {
    Logger.log("Fila:" + active_row+"  Nombre: "+sheet.getRange(active_row,3).getValue())
    if(sheet.getRange(active_row,3).getValue() == "")
    {
      active_row--;
      break;
    }
    else
    {
      active_row++;
    }
  }
  Logger.log("Fila de escritura = "+active_row);
  
  addContactFromRow(active_row-1); // Bro por qué unas cosas las hacen de una forma y otras de otra
}

function CreadorDelActivador() {
  // Originally designed by Leonel and modified by Echedey
  // 1) Obtenemos la URL del form que estamos utilizando
  let form_url = SpreadsheetApp.getActiveSheet().getFormUrl();
  //Sanity check
  if (form_url == null) {
    console.error("No existe un formulario ligado a la hoja de datos, ¡no me seas pendejx!");
  }
  // 2) Buscamos el form
  let form_ligado = FormApp.openByUrl(form_url);
  // 3) Aplicamos el trigger
  ScriptApp.newTrigger('addContactFromTrigger').forForm(form_ligado).onFormSubmit().create();
}
