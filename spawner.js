var spawner = {

    run: function(energy, roleName) {
        // create a balanced body as big as possible with the given energy
        var numberOfSets = Math.floor(energy / 200);
        var body = [];
        for (let i = 0; i < numberOfSets; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfSets; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfSets; i++) {
            body.push(MOVE);
        }

        Game.spawns.Spawn1.createCreep(body, undefined, { role: roleName, task: 'harvest' });
    };
};

module.exports = spawner;
