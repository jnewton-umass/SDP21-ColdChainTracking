const gatewayInSchema = require("../models/inTransitModel")
const gatewayOutSchema = require("../models/deliveredModel")

async function startTransit(query) {
    return new Promise(async function (resolve, reject) {
        await gatewayInSchema.create(query)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

async function endTransit(query) {
    return new Promise(async function (resolve, reject) {
        await gatewayInSchema.deleteOne(query)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
        await gatewayOutSchema.create(query)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}
module.exports = {startTransit, endTransit,}