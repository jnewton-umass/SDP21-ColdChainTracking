const gatewayInSchema = require("../models/inTransitModel")
const gatewayOutSchema = require("../models/deliveredModel")

async function startTransit(query) {
    console.log(query)
}

async function endTransit(query) {
    await gatewayOutSchema.insertMany(query)
    .then(result => {
        console.log(result)
    })
    await gatewayInSchema.deleteMany(query.gatewayId)
    .then (result => {
        console.log(result)
    })
}
module.exports = {startTransit, endTransit,}