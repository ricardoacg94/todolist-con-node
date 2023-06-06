import { guardarinfo, leerDb } from "./helpers/guardarBaseDatos.js";
import {
  interfazMenu,
  interfazCreacionTarea,
  interfazListaTareas,
  pausa,
  interfazEliminarTarea,
  listaTareasCompletadasPendientes,
  interfazCompletarTarea,
} from "./helpers/interfaz.js";

import { Tareas } from "./models/tareas.js";

let opcion;
let listado = new Tareas();
const tareasDb = leerDb();

if (tareasDb) {
  listado.cargarTarear(tareasDb);
}

console.clear();
const main = async () => {
  do {
    opcion = await interfazMenu();
    console.clear();

    switch (opcion) {
      case 1:
        const opt = await interfazCreacionTarea();
        if (opt.length == 0) {
          console.log("Debe rellenar el campo");
          await pausa();
        } else {
          listado.crearTarea(opt).then(() => {
            guardarinfo(listado.listaTareas);
          });
          console.log("Tarea Creada");

          await pausa();
        }

        break;

      case 2:
        if (listado.listaTareas.length == 0) {
          console.log("No hay pendientes tareas para desplegar");
          await pausa();
        } else {
          await interfazListaTareas(listado.listaTareas);
          await pausa();
        }

        break;
      case 3:
        if (
          listado.listaTareas.filter((tarea) => tarea.completadoEn == true)
            .length == 0
        ) {
          console.log("No hay Completadas tareas para desplegar");
          await pausa();
        } else {
          await listaTareasCompletadasPendientes(true, listado.listaTareas);
          await pausa();
        }

        break;
      case 4:
        if (
          listado.listaTareas.filter((tarea) => tarea.completadoEn == null)
            .length == 0
        ) {
          console.log("No hay pendientes tareas para desplegar");
          await pausa();
        } else {
          await listaTareasCompletadasPendientes(false, listado.listaTareas);
          await pausa();
        }

        break;
      case 5:
        const arrFiltrado = listado.listaTareas.filter(
          (tarea) => tarea.completadoEn == null
        );

        const id = await interfazCompletarTarea(arrFiltrado);
        listado.completarTareas(id);
        guardarinfo(listado.listaTareas);

        await pausa();
        break;
      case 6:
        const ids = await interfazEliminarTarea(listado.listaTareas);

        await listado.eliminarTarea(ids);
        guardarinfo(listado.listaTareas);

        await pausa();

        break;
    }
  } while (opcion !== 0);
};

main();
