const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gatewayOutSchema = new Schema ({
    gatewayId: {type: String},
    products: {type: Object},
    fiftyPlus: {Number},
    sixtyPlus: {Number},
    sevtyPlus: {Number},
    deliveredTime: {Date}
})

gatewayOutSchema.index({"__id": 1 })
module.exports = mongoose.model('delivered', gatewayOutSchema, 'delivered')
