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

function updateProfileDao(query, setQuery) {
    return new Promise(async function (resolve, reject) {
        // this operation will find the user profile and update it based on setQuery object
        await userModel.update(
            // Find Operation: will find the user profile based on the query passed
            query,
            // Update operation: will update the user profile based on the setQuery object
            {
                $set: setQuery
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
    })
}

module.exports = {
    register,
    login,
    checkUserIdExists,
    updateProfileDao
}
