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
        listado.crearTarea(opt);
        console.log("Tarea Creada");
        guardarinfo(listado.listaTareas);
        await pausa();

        break;

      case 2:
        await interfazListaTareas(listado.listaTareas);
        await pausa();
        break;
      case 3:
        await listaTareasCompletadasPendientes(true, listado.listaTareas);
        await pausa();
        break;
      case 4:
        await listaTareasCompletadasPendientes(false, listado.listaTareas);
        await pausa();
        break;
      case 5:
        const id = await interfazCompletarTarea(listado.listaTareas);
        listado.completarTareas(id);
        guardarinfo(listado.listaTareas);

        await pausa();
        break;
      case 6:
        const ids = await interfazEliminarTarea(listado.listaTareas);

        listado.eliminarTarea(ids);
        guardarinfo(listado.listaTareas);

        await pausa();

        break;
    }
  } while (opcion !== 0);
};

main();
