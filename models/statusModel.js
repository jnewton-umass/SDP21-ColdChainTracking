const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema ({
    statusId: {type: String},
    temperature: {type: Number},    
    light: {type: Number},
    updatedAt: {type: Date}
})

statusSchema.index({"statusId": 1 })
module.exports = mongoose.model('status', statusSchema)
