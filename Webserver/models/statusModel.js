const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema ({
    statusId: {type: String},
    temperature1: {type: Number},    
    temperature2: {type: Number},
    light: {type: Boolean},
    latitude: {type: Number},
    longitude: {type: Number},
    updatedAt: {type: Date}
})

statusSchema.index({"__id": 1 })
module.exports = mongoose.model('status', statusSchema)
