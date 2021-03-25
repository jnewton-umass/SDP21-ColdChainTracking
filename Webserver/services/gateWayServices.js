const gatewayDao = require('../dataOps/gatewayDataOps')

async function registerGateway(req) {
    const query = {
        statusId: req.statusId,
        products: req.products,
        isDelivered: req.isDelivered
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
        statusId: req.statusId,
        products: req.products,
        isDelivered: req.isDelivered
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