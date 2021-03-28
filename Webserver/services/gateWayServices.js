const gatewayDao = require('../dataOps/gatewayDataOps')
const gatewayInModel = require('../models/inTransitModel')
async function registerGateway(req) {
    return new Promise(async function (resolve, reject){
        let query = {
            gatewayId: req.gatewayId,
            products: req.products,
            fiftyPlus: req.fiftyPlus,
            sixtyPlus: req.sixtyPlus,
            sevtyPlus: req.sevtyPlus,
            deliveredTime: new Date()
        }
        await gatewayInModel.create(query)
            .then(result => {
                console.log(result)
                return resolve(result)
            })
            .catch(error => {
                console.log(error)
                return reject(error)
            })
    })
}
async function endTransit(req) {
    const query = {
        gatewayId: req
    }
    await gatewayInModel.find(query).then(async result => {
        await gatewayDao.endTransit(result)
        .then(result => {
            return (result)
        })
        .catch(error => {
            return (error)
        })
    })
}
module.exports = {
    registerGateway, endTransit
}