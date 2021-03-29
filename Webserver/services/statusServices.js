const CONSTANTS = require("../constants/constants");
const statusDao = require('../dataOps/statusDataOps')
const inTransitModels = require('../models/inTransitModel')
const errorObj = {}

async function registerStatus(id, temp1, temp2, light, lat, lon, date) {
    const query = {
        gatewayId: id,
        tempCeil: temp1,
        tempSide: temp2,
        light: light,
        latitude: lat,
        longitude: lon,
        updatedAt:  date
    }
    const gatewayIdObj  = {
        gatewayId: id
    }

    return new Promise(async function (resolve, reject) {
        await statusDao.checkgatewayIdExists(gatewayIdObj)
            .then(async result => {
                if (result.length !== 0) {
                    return  resolve(statusDao.update(query))
                }
                return result
            })
            .then(async result => {
                return resolve(statusDao.register(query))
            })
            .catch(error => {
                return reject(error)
            })
    })
}
async function updateStatus(id, temp1, temp2, light, lat, lon, date) {
    const query = {
        gatewayId: id,
        tempCeil: temp1,
        tempSide: temp2,
        light: light,
        latitude: lat,
        longitude: lon,
        updatedAt: date
    }
    const gatewayIdObj  = {
        gatewayId: id
    }
    /*if ((50.0 <= temp1 + temp2)/2.0 < 60.0) {
        const update = {
            gatewayId: result.gatewayId,
            products: result.products,
            fiftyPlus: result.fiftyPlus + 1,
            sixtyPlus: result.sixtyPlus,
            sevtyPlus: result.sevtyPlus,
            deliveredTime: date
        }
    }
    else if ((60.0 <= temp1 + temp2)/2.0 < 70.0) {
        const update = {
            gatewayId: result.gatewayId,
            products: result.products,
            fiftyPlus: result.fiftyPlus,
            sixtyPlus: result.sixtyPlus + 1,
            sevtyPlus: result.sevtyPlus,
            deliveredTime: date
        }
    }
    else if ((70.0 <= temp1 + temp2)/2.0 < 80.0) {
        const update = {
            gatewayId: result.gatewayId,
            products: result.products,
            fiftyPlus: result.fiftyPlus,
            sixtyPlus: result.sixtyPlus,
            sevtyPlus: result.sevtyPlus + 1,
            deliveredTime: date
        }
    }*/
    return new Promise(async function (resolve, reject) {
        await (await inTransitModels.findOne(gatewayIdObj)).updateOne(update)
            .then(async result => {
                console.log(result)
                if (result.length !== 0) {
                    return resolve(statusDao.update(query))
                }
                else {
                    return resolve(statusDao.register(query))
                }
            })
            .catch(error => {
                return reject(error)
            })
    })
}
module.exports = {
    registerStatus,
    updateStatus
}