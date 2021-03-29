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
    
    return new Promise(async function (resolve, reject) {
        await inTransitModels.findOne(gatewayIdObj)
            .then(async result => {
                let avgTemp = ((temp1 + temp2)/2.0);
                if (50.0 <= avgTemp) {
                    result.fiftyPlus = result.fiftyPlus + 1;
                }
                if (70.0 <= avgTemp) {
                    result.seventyPlus = result.seventyPlus + 1;
                }
                if (80.0 <= avgTemp) {
                    result.eightyPlus = result.eightyPlus + 1;
                }
                result.save()
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