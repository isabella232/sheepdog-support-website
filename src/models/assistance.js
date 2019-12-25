const mongoose = require('mongoose')
const validator = require('validator')

/*request for assistance schema
    -properties
        o program
        o firstName
        o lastName
        o recipientFirstName
        o recipientLastName
        o email
*/

const requestAssistanceSchema = new mongoose.Schema({
    program:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    recipientFirstName: {
        type:String,
        trim:true
    },
    recipientLastName:{
        type:String,
        trim:true
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        required:true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid!')
			}
		}
    }

})

const requestAssistanceForm = mongoose.model('RequestAssistance', requestAssistanceSchema)

module.exports = requestAssistanceForm