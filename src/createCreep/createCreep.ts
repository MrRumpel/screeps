export class CreateCreep {

  public static run(creep: Creep): void {
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

}
