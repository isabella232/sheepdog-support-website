const mongoose = require('mongoose')

//mongodb+srv://bitPrj:Veteran123@sheepdog-support-da8gp.mongodb.net/test?retryWrites=true

const connectionURL = 'mongodb://127.0.0.1:27017'
mongoose.connect(process.env.MONGODB_URI + '/sheepdog-support-api', {
    useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
    useCreateIndex: true
})
