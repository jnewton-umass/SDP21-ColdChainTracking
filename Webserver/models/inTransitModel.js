const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gatewayInSchema = new Schema ({
    gatewayId: {type: String},
    products: {type: Object},
    fiftyPlus: {type: Number},
    seventyPlus: {type: Number},
    eightyPlus: {type: Number},
    startTime: {type: Date}
})

gatewayInSchema.index({"__id": 1 })
module.exports = mongoose.model('inTransit', gatewayInSchema, 'inTransit')
