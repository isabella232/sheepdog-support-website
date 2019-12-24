const mongoose = require('mongoose')
const validator = require('validator')

/*
 * ContactForm:
 * - Name
 * - Email
 * - Subject
 * - Body
 */
const contactFormSchema = new mongoose.Schema({
    name: {
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
		required: true
	},
    body: {
        type: String,
        required: true
    }
})

const ContactForm = mongoose.model('ContactForm', contactFormSchema)

module.exports = ContactForm
