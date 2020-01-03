const mongoose = require('mongoose')

//mongodb+srv://bitPrj:Veteran123@sheepdog-support-da8gp.mongodb.net/test?retryWrites=true

//To set up environment variables for your local machine:
//npm i
//This will add the package : env-cmd
//This package lets us create environment variables
//Then set up a config folder
//Inside the config folder, create a dev.env file
//Inside that file, put:
//MONGODB_URI=mongodb://127.0.0.1:27017
//NODE_ENV=development
//This sets up the environment variables for our local machine

//Please do not push in the config folder or node_modules folder!!!
//make a .ignore file for config folder and node_modules folder first and then push 
//const connectionURL = 'mongodb://127.0.0.1:27017'

mongoose.connect(process.env.MONGODB_URI + '/sheepdog-support-api', {
    useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
    useCreateIndex: true
})


//heroku config:add MONGODB_URI=mongodb+srv://bitPrj:Veteran1234@sheepdog-support-da8gp.mongodb.net/test?retryWrites=true hereenv
