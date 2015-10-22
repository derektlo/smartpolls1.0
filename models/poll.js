var mongoose = require('mongoose');

module.exports = mongoose.model('Poll', {
	name: String,
    userId: String,
    parameters: Array,
	values: Array
});
