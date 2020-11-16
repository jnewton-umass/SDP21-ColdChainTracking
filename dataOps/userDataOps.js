const userModel = require("../models/userModel");

async function register(query) {
    return new Promise(async function (resolve, reject) {
        await userModel.create(query)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

async function checkUserIdExists(query, attribute) {
    return new Promise(async function (resolve, reject) {
        await userModel.find(query, attribute)
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                console.log(error);
                reject(error)
            })
    })
}

async function login(query, attribute) {
    return new Promise(async function (resolve, reject) {
        await userModel.findOne(query,attribute)  
            .then(result => {
                console.log(result)
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}


module.exports = {
    register,
    login,
    checkUserIdExists
}
