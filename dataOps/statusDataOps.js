const statusModel = require("../models/statusModel");

async function register(query) {
    return new Promise(async function (resolve, reject) {
        await statusModel.create(query)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}
async function update(query) {
    return new Promise(async function (resolve, reject) {
        await statusModel.create(query)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}
async function checkStatusIdExists(query, attribute) {
    console.log(query, attribute);
    return new Promise(async function (resolve, reject) {
        await statusModel.find(query, attribute)
            .then(result => {
                console.log(result);
                resolve(result);
            })
            .catch(error => {
                console.log(error);
                reject(error)
            })
    })
}
module.exports = {
    register,
    update,
    checkStatusIdExists
}