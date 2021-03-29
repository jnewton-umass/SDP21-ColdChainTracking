const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gatewayOutSchema = new Schema ({
    gatewayId: {type: String},
    products: {type: Object},
    fiftyPlus: {type: Number},
    seventyPlus: {type: Number},
    eightyPlus: {type: Number},
    startTime: {type: Date},
    deliveredTime: {type: Date}
})

gatewayOutSchema.index({"__id": 1 })
module.exports = mongoose.model('delivered', gatewayOutSchema, 'delivered')
