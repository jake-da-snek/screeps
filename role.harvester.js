module.exports = roleHarvester;

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.task == 'supply' && creep.carry.energy == 0) {
            creep.memory.task = 'harvest';
        }
        if (creep.memory.task == 'harvest' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.task = 'supply';
        }

        if (creep.memory.task == 'supply') {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        } else if (creep.memory.task == 'harvest') {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    }
};

module.exports = roleHarvester;
