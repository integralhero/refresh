var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;;

var userSchema = new Schema({
	id: ObjectId,
	name: String,
	password: String,
	friends: [{type: ObjectId, ref: 'User'}],
	activities: [{type: ObjectId, ref: 'Activity'}]
});

var activitySchema = Schema({
	name: {type: String, required: true},
	users: [{type: ObjectId, ref: 'User'}]
});

exports.User = mongoose.model('User', userSchema);
exports.Activity = mongoose.model('Activity', activitySchema);