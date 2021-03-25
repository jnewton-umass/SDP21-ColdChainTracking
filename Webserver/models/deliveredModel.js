const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gatewayOutSchema = new Schema ({
    statusId: {type: String},
    products: {type: Object},
    isDelivered: {type: Boolean}
})

gatewayOutSchema.index({"__id": 1 })
module.exports = mongoose.model('delivered', gatewayOutSchema, 'delivered')
