const CONSTANTS = require("../constants/constants");
const statusDao = require('../dataOps/statusDataOps')
const statusModel = require("../models/statusModel")

const errorObj = {}

async function registerStatus(req) {
    const query = {
        statusId: req.body.statusId,
        temperature: req.body.temperature,
        light: req.body.light,
        updatedAt:  new Date()
    }
    const statusIdObj  = {
        statusId: req.body.statusId
    }
    const statusIdAttribute = {
        _id: 0,
        userId: 1
    }

    return new Promise(async function (resolve, reject) {
        await statusDao.checkStatusIdExists(statusIdObj, statusIdAttribute)
            .then(async result => {
                if (result.length !== 0) {
                    errorObj.code = CONSTANTS.ERROR_CODES.BAD_REQUEST
                    throw (errorObj)
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
async function updateStatus(req) {
    const query = {
        statusId: req.body.statusId,
        temperature: req.body.temperature,
        light: req.body.light,
        updatedAt:  new Date()
    }
    const statusIdObj  = {
        statusId: req.body.statusId
    }
    const statusIdAttribute = {
        _id: 0,
        userId: 1
    }

    return new Promise(async function (resolve, reject) {
        await statusDao.checkStatusIdExists(statusIdObj, statusIdAttribute)
            .then(async result => {
                if (result.length !== 0) {
                    return resolve(statusDao.update(query))
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