const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gatewayInSchema = new Schema ({
    statusId: {type: String},
    products: {type: Object}
})

gatewayInSchema.index({"__id": 1 })
module.exports = mongoose.model('inTransit', gatewayInSchema, 'inTransit')
