const mongoose = require('mongoose')
const validator = require('validator')

/*
 * ContactUs:
 * - FirstName
 * - LastName
 * - Email
 * - Subject
 * - Body
 */
const contactUsSchema = new mongoose.Schema({
    firstName: {
        type: String,
		required: true,
		trim: true
    },
    lastName: {
        type: String,
		required: true,
		trim: true
    },
    email: {
		type: String,
		trim: true,
		lowercase: true,
		required:true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid!')
			}
		}
	},
	subject: {
		type: String,
		required: true,
		trim: true
	},
    body: {
        type: String,
        required: true,
		trim: true
    }
})

const ContactUs = mongoose.model('ContactUs', contactUsSchema)

module.exports = ContactUs
