import { Tarea } from "./tarea.js";

class Tareas {
  listaTareas;
  nuevoArray;
  constructor() {}

  cargarTarear = (tareas = []) => {
    this.listaTareas = tareas;
  };

  crearTarea = (desc) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tarea = new Tarea(desc);
        resolve(this.listaTareas.push(tarea));
      }, 3000);
    }).then((response) => {
      console.log(response);
    });
  };

  eliminarTarea = (ids) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        ids.forEach((id) => {
          resolve(
            (this.listaTareas = this.listaTareas.filter(
              (tarea) => tarea.id != id
            ))
          );
        });
      }, 3000);
    });
  };

  completarTareas = async (ids) => {
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
