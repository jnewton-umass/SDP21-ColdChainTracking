const CONSTANTS = require("../constants/constants");
const statusDao = require('../dataOps/statusDataOps')

const errorObj = {}

async function registerStatus(id, temp1, temp2, light, lat, lon) {
    const query = {
        statusId: id,
        temperature1: temp1,
        temperature2: temp2,
        light: light,
        latitude: lat,
        longitude: lon,
        updatedAt:  new Date()
    }
    const statusIdObj  = {
        statusId: id
    }

    return new Promise(async function (resolve, reject) {
        await statusDao.checkStatusIdExists(statusIdObj)
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
async function updateStatus(id, temp1, temp2, light, lat, lon) {
    const query = {
        statusId: id,
        temperature1: temp1,
        temperature2: temp2,
        light: light,
        latitude: lat,
        longitude: lon,
        updatedAt:  new Date()
    }
    const statusIdObj  = {
        statusId: id
    }

    return new Promise(async function (resolve, reject) {
        await statusDao.checkStatusIdExists(statusIdObj)
            .then(async result => {
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