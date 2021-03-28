const gatewayDao = require('../dataOps/gatewayDataOps')
const inTransitModel = require('../models/inTransitModel')
function registerGateway(req) {
    return new Promise(async function (resolve, reject){
        const query = new inTransitModel({
            gatewayId: req.gatewayId,
            products: req.products,
            fiftyPlus: 0,
            sixtyPlus: 0,
            sevtyPlus: 0,
            deliveredTime: new Date()
        })
        console.log(query)
        await inTransitModel.create(query)
            .then(result => {
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