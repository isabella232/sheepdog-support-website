const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Event = require('./event')

/*
 * User Schema
 * - Properties
 * 		o Username
 * 		o Email
 * 		o Password
 * 			> Hashed
 * 		o Tokens
 * 			> List of all login sessions
 * 			> Current implementation is encoded object id
 * 			> Each token is used for authentication @See ../middleware/auth.js for more
 * 		o PDF Verification
 * 		o First Name
 * 		o Last Name
 * 		o Biography
 * 		o Location
 * 		o Profile Picture
 * 		o Display Email on Public Profile
 *		o Display Location on Public Profile
 * 		o Display Subscribed Events on Public Profile
 * 		o Display Location on Veteran's Directory
 */
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		minlength: 4,
		maxlength: 16,
		validate(value) {
			if (!validator.matches(value, '[a-zA-Z0-9_]')) {
				throw new Error('only numbers and letters allowed')
			}
		}
	},
    email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true,
		maxlength: 255,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('invalid email')
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
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}],
	verification: {
		// type: File,
		// required: true
	},
    firstName: {
        type: String,
		required: true,
		maxlength: 69,
		trim: true
    },
    lastName: {
        type: String,
		required: true,
		maxlength: 69,
		trim: true
	},
	biography: {
		type: String,
		trim: true,
		maxlength: 500
	},
	location: {
		type: String,
		maxlength: 255,
		trim: true
	},
	profilePicture: {
		// type: File,
	},
	emailOnProf: {
		type: Boolean,
	},
	locationOnProf: {
		type: Boolean,
	},
	subscribedEventsOnProf: {
		type: Boolean,
	},
	locationOnVD: {
		type: Boolean,
	}
})

/*
 * Relationship 
 * - Between Event Id and User's owner field
 */
userSchema.virtual('tasks', {
	ref: 'Event',
	localField: '_id',
	foreignField: 'owner'
})

/*
 * Hide Private Data
 * 	- Remove the return of password and token through hack
 * 		(which occurs when object is converted to JSON object)
 */
userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens

	return userObject
}

/*
 * Generate Authentication Token
 * - Current implementation 
 */
userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, 'BL1T-8R0J$CT')

	user.tokens = user.tokens.concat({ token })
	await user.save()

	return token
}

/*
 * Find User Using Email Password Combo
 */
userSchema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email })
	if (!user) {
		throw new Error('Unable to login')
	}

	const isMatch = await bcrypt.compare(password, user.password)
	if (!isMatch) {
		throw new Error('Unable to login')
	}

	return user
}

/*
 * Hash Plaintext Password
 * - Uses bcrypt 8 times
 */
userSchema.pre('save', async function (next) {
	const user = this
	//hi 
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
	const user = this
	await Event.deleteMany({ owner: user._id })
	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
