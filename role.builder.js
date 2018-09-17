var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.task == 'build' && creep.carry.energy == 0) {
            creep.memory.task = 'harvest';
        }
        if (creep.memory.task == 'harvest' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.task = 'build';
        }

        if (creep.memory.task == 'build') {
            var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (sites.length) {
                if (creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sites[0]);
                }
            } else if (!sites.length) {
                creep.memory.task = 'repair'
            }
        } else if (creep.memory.task == 'harvest') {
            var sources = creep.room.find(FIND_SOURCES);
            var closestSource = creep.pos.findClosestByPath(sources);
            if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource);
            }
        } else if (creep.memory.task == 'repair') {
            var repairs = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < 3000});
            if (repairs.length) {
                if (creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairs[0]);
                }
            }
        }
    }
};

module.exports = roleBuilder;
