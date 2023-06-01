import { Tarea } from "./tarea.js";

class Tareas {
  listaTareas;
  nuevoArray;
  constructor() {}

  cargarTarear = (tareas = []) => {
    this.listaTareas = tareas;
  };

  crearTarea = (desc) => {
    const tarea = new Tarea(desc);
    this.listaTareas.push(tarea);
  };

  eliminarTarea = (ids) => {
    ids.forEach((id) => {
      this.listaTareas = this.listaTareas.filter((tarea) => tarea.id != id);
    });
  };

  completarTareas = (ids) => {
    ids.forEach((id) => {
      this.listaTareas.forEach((tarea) => {
        if (id == tarea.id) {
          tarea.completadoEn = true;
        }
      });
    });
  };
}

export { Tareas };
