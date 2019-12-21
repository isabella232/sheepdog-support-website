const mongoose = require('mongoose')

/*
 * Task Schema
 * - Properties
 * 		o Description
 * 		o Completed
 * 		o Owner ID
 * 			> Used for determining whose is whose
 */
const taskSchema = mongoose.Schema({
    description: {
		type: String,
		required: true,
		trim: true
    },
    completed: {
		type: Boolean,
		default: false
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
