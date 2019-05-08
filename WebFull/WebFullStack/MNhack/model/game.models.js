const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    player : [String],
    scores : [[Number]]
});
const GameModel = mongoose.model('Game', GameSchema);
module.exports = GameModel; 