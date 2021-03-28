const gatewayDao = require('../dataOps/gatewayDataOps')

async function registerGateway(req) {
    const query = {
        gatewayId: req.gatewayId,
        products: req.products,
        fiftyPlus: 0,
        sixtyPlus: 0,
        sevtyPlus: 0
    }
    await gatewayDao.startTransit(query)
        .then(result => {
            return result
        })
        .catch(error => {
            return error
        })
}
async function endTransit(req) {
    const query = {
        gatewayId: req.gatewayId,
        products: req.products,
        fiftyPlus: req.fiftyPlus,
        sixtyPlus: req.sixtyPlus,
        sevtyPlus: req.sevtyPlus,
        deliveredTime: new Date()
    }
    await gatewayDao.endTransit(query)
        .then(result => {
            return result
        })
        .catch(error => {
            return error
        })
}
module.exports = {
    registerGateway, endTransit
}