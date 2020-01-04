const mongoose = require('mongoose')

const veteranFileSchema = new mongoose.Schema({
    veteranFile: {
        type: Buffer,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
})

const VeteranFile = mongoose.model('VeteranFile', veteranFileSchema)


module.exports = VeteranFile