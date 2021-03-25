const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gatewayInSchema = new Schema ({
    statusId: {type: String},
    products: {type: Object},
    isDelivered: {type: Boolean}
})

statusSchema.index({"__id": 1 })
module.exports = mongoose.model('inTransit', gatewayInSchema, 'inTransit')
