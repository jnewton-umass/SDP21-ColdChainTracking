const gatewayDao = require('../dataOps/gatewayDataOps')
const inTransitModel = require('../models/inTransitModel')
const deliveredModel = require('../models/deliveredModel')
function registerGateway(req) {
    return new Promise(async function (resolve, reject){
        let query = {
            gatewayId: req.gatewayId,
            products: req.products,
            fiftyPlus: 0,
            seventyPlus: 0,
            eightyPlus: 0,
            startTime: new Date()
        }
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
    return new Promise(async function(resolve, reject){
        const query = {
            gatewayId: req
        }
        await gatewayInModel.findOne(query).then(async result => {
            let endModel = {
                gatewayId: result.gatewayId,
                products: result.products,
                fiftyPlus: result.fiftyPlus,
                seventyPlus: result.seventyPlus,
                eightyPlus: result.eightyPlus,
                startTime: result.startTime,
                deliveredTime: new Date()
            }
            await deliveredModel.create(endModel).then(async result => {
                await gatewayInModel.deleteMany(query).then(result => {
                    return resolve(result)
                })
                .catch(error => {
                    return reject(error);
                })
            })
            .catch(error => {
                return reject(error);
            })
        })
        .catch(error => {
            return reject(error);
        })
    })
}
module.exports = {
    registerGateway, endTransit
}