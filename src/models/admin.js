const mongoose = require('mongoose')
const validator = require('validator')

/*
 * Admin:
 * - Name
 * - Email
 * - Password
 * - age
 */
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
		required: true,
		trim: true
    },
    email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Email is invalid!')
			}
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('What are you doing?')
			}
		}
	},
    age: {
		type: Number,
		default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
	},
	admin: {
		type: Boolean
	}
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
