export class CreateCreep {
  public static harvester(creep: Creep): void {
    if (creep.carry.energy < creep.carryCapacity) {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
    else if (Game.spawns["Spawn1"].energy < Game.spawns['Spawn1'].energyCapacity) {
      if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns['Spawn1']);
      }
    }
  }

  public static createHarvest(spawnName: string, hash: string): void {
    Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], hash, {memory: {role: 'harvest'}});
  }

  public static upgrader(creep: Creep):void {
    console.log(JSON.stringify(creep));
  }
}
