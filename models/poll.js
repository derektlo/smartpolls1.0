var mongoose = require('mongoose');

module.exports = mongoose.model('Poll', {
	name: String,
    username: String,
    parameters: Array,
	values: Array
});
