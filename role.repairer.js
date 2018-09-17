var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.task == 'repair' && creep.carry.energy == 0) {
            creep.memory.task = 'harvest';
        }
        if (creep.memory.task == 'harvest' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.task = 'repair';
        }

        if (creep.memory.task == 'repair') {
            var repairs = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < 3000});
            if (repairs.length) {
                if (creep.repair(repairs[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairs[0]);
                }
            }
        }
        else if (creep.memory.task == 'harvest') {
            var sources = creep.room.find(FIND_SOURCES);
            var closestSource = creep.pos.findClosestByPath(sources);
            if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource);
            }
        }
    }
};

module.exports = roleRepairer;
