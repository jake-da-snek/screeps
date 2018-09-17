var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.task == 'upgrade' && creep.carry.energy == 0) {
            creep.memory.task = 'harvest';
        }
        if (creep.memory.task == 'harvest' && creep.carry.energy == creep.carryCapacity) {
            creep.memory.task = 'upgrade';
        }

        if (creep.memory.task == 'upgrade') {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else if (creep.memory.task == 'harvest') {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
    }
};

module.exports = roleUpgrader;
