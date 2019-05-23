import {ErrorMapper} from "utils/ErrorMapper";
import {CreateCreep} from "./createCreep/createCreep";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // console.log(`Current game tick is ${Game.time}`);

  let countCreeps = 0;
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    countCreeps += 1;
    if (!(name in Game.creeps)) {
      countCreeps += -1;
      delete Memory.creeps[name];
    }
  }
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    CreateCreep.run(creep);
  }
  for (const spawnName in Game.spawns) {
    if (countCreeps < 3) {
      const hash = new Date().getTime().toString();
      if (Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], hash) === 0) {
        Game.creeps[hash].memory.role = 'harvest';
      }
    }
  }
});
