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
    if (creep.memory.role === 'harvester') {
      CreateCreep.harvester(creep);
    }
    if (creep.memory.role === 'upgrader') {
      CreateCreep.upgrader(creep);
    }
  }
  // for (const spawnName in Game.spawns) {
  //   const hash = new Date().getTime().toString();
  //   if (countCreeps < 3) {
  //     CreateCreep.createHarvest(spawnName, hash);
  //   }
  // }
  const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
  console.log('Harvesters: ' + harvesters.length);

  if(harvesters.length < 2) {
    const newName = 'Harvester' + Game.time;
    console.log('Spawning new harvester: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
      {memory: {role: 'harvester'}});
  }
  if(Game.spawns['Spawn1'].spawning) {
    const spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning!.name];
    Game.spawns['Spawn1'].room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      Game.spawns['Spawn1'].pos.x + 1,
      Game.spawns['Spawn1'].pos.y,
      {align: 'left', opacity: 0.8});
  }

});
