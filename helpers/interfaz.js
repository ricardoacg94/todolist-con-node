import inquirer from "inquirer";
import colors from "colors";

const interfazMenu = async () => {
  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "Que accion desea realizar?\n",
      choices: [
        {
          name: `${`1.`.green} Crear Tarea`,
          value: 1,
        },
        {
          name: `${`2.`.green} Listar Tareas`,
          value: 2,
        },
        {
          name: `${`3.`.green} Tareas Completadas`,
          value: 3,
        },
        {
          name: `${`4.`.green} Tareas Pendientes`,
          value: 4,
        },
        {
          name: `${`5.`.green} Completar Tarea`,
          value: 5,
        },
        {
          name: `${`6.`.green} Eliminar Tarea`,
          value: 6,
        },
        {
          name: `${`0.`.green} Salir`,
          value: 0,
        },
      ],
    },
  ]);
  const { opcion } = answer;
  return opcion;
};

const interfazCreacionTarea = async () => {
  const pregunta = [
    {
      type: "input",
      name: "tarea",
      message: "Digita la tarea que deseas agregar\n",
    },
  ];

  const desc = await inquirer.prompt(pregunta);

  const { tarea } = desc;

  return tarea;
};

const pausa = async () => {
  const pausa = await inquirer.prompt([
    {
      type: "input",
      name: "opcion",
      message: `Presione ${`ENTER`.green} para continuar`,
      choices: [],
    },
  ]);
  console.clear();

  return pausa;
};

const interfazListaTareas = async (tareas = []) => {
  const listaTareas = await inquirer.prompt([
    {
      type: "list",
      name: "opcion",
      message: "Lista de Tareas",
      choices: tareas.map((tarea) => ({
        name: tarea.completadoEn
          ? `${tarea.desc} ${`::Completada`.green}`
          : `${tarea.desc} ${`::Pendiente`.red}`,
      })),
    },
  ]);

  return listaTareas;
};

const listaTareasCompletadasPendientes = async (status, tareas = []) => {
  let opciones = [];
  if (status) {
    const newArray = tareas.filter((tarea) => tarea.completadoEn == true);
    newArray.forEach((tarea) => {
      opciones.push(`${tarea.desc} ${`::Completada`.green}`);
    });
  } else {
    const newArray = tareas.filter((tarea) => tarea.completadoEn == null);
    newArray.forEach((tarea) => {
      opciones.push(`${tarea.desc} ${`::Pendiente`.red}`);
    });
  }
  const listaTareas = await inquirer.prompt([
    {
      type: "list",
      name: "lista",
      message: status
        ? "Listado de Tareas Completadas"
        : "Listado de Tareas Pendientes",
      choices: opciones ? opciones : ["No hay tareas para listar"],
    },
  ]);

  return listaTareas;
};

const interfazCompletarTarea = async (tareas = []) => {
  const value = await inquirer.prompt([
    {
      type: "checkbox",
      name: "opcion",
      message: "Que accion desea realizar?",
      choices: tareas.map((tarea) => {
        return {
          value: tarea.id,
          name: tarea.desc,
        };
      }),
    },
  ]);

  const { opcion } = value;
  return opcion;
};

const interfazEliminarTarea = async (tareas) => {
  const value = await inquirer.prompt([
    {
      type: "checkbox",
      name: "opcion",
      message: "Que accion desea realizar?",
      choices: tareas.map((tarea) => {
        return {
          value: tarea.id,
          name: tarea.completadoEn
            ? `${tarea.desc} ${`::Completada`.green}`
            : `${tarea.desc} ${`::Pendiente`.red}`,
        };
      }),
    },
  ]);

  const { opcion } = value;
  return opcion;
};

export {
  interfazMenu,
  interfazCreacionTarea,
  interfazListaTareas,
  pausa,
  interfazEliminarTarea,
  listaTareasCompletadasPendientes,
  interfazCompletarTarea,
};
