import { info } from "console";
import fs from "fs";

const path = "./database/tareas.json";

const guardarinfo = (tareas = []) => {
  fs.writeFileSync(path, JSON.stringify(tareas));
};

const leerDb = () => {
  if (!fs.existsSync(path)) {
    null;
  }
  const file = fs.readFileSync(path, { encoding: "utf-8" });
  const data = JSON.parse(file);

  return data;
};

export { guardarinfo, leerDb };
