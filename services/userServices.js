const FILE_NAME = "userService.js";
const CONSTANTS = require("../constants/constants");
const userDao = require('../dataOps/userDataOps')
const userModel = require("../models/userModel")

const errorObj = {}

async function register(req) {
    const query = {
        userId: req.body.userId,
        password: req.body.password,
        createdAt: new Date()
    }
    const userIdCheck = {
        userId: query.userId
    }
    const userIdAttribute = {
        _id: 0,
        userId: 1
    }

    return new Promise(async function (resolve, reject) {
        await userDao.checkUserIdExists(userIdCheck, userIdAttribute)
            .then(async result => {
                if (result.length !== 0) {
                    errorObj.code = CONSTANTS.APP_ERROR_CODE.USER_EXISTS
                    throw (errorObj)
                }
                return result
            })
            .then(async result => {
                return resolve(userDao.register(query))
            })
            .catch(error => {
                return reject(error)
            })
    })
}


module.exports = {
    register
}
