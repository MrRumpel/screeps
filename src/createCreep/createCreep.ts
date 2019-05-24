export class CreateCreep {
  public static harvester(creep: Creep): void {
    if(creep.carry.energy < creep.carryCapacity) {
      const sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
    else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
            structure.energy < structure.energyCapacity;
        }
      });
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }
  }

  public static createHarvest(spawnName: string, hash: string): void {
    Game.spawns[spawnName].spawnCreep([WORK, CARRY, MOVE], hash, {memory: {role: 'harvester'}});
  }

  public static upgrader(creep: Creep):void {
    if(creep.memory.upgrading && creep.carry.energy === 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }
    if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller!) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller!, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }
    else {
      const sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
}
