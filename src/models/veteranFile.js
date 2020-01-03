const mongoose = require('mongoose')

const VeteranFile = new mongoose.model('VeteranFile', {
    veteranFile: {
        type: Buffer,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})


module.exports = VeteranFile