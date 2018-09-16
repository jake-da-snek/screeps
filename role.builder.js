var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if(creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false;
    }

    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true;
    }

    if(creep.memory.building) {
      var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
      if(sites.length) {
        if(creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sites[0], {visualizePathStyle: {stroke: '#BA7900'}});
        }
      }
    }
    else {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#BA7900'}});
      }
    }
  }
};

module.exports = roleBuilder;
