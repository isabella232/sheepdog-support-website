const mongoose = require('mongoose')

/*
 * Event Schema
 * - Properties
 * 		o Description
 * 		o Loaction
 *      o Time and Date of event
 *          > should this be two seperate fields???
 * 		o Owner ID
 * 			> Used for determining who created the evnent
 */

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    time:{
        type:  String,
        trim:true,
        required: true
    },
    location:{
        type:String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'User'
	}
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
