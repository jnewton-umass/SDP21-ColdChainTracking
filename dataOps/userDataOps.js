/**
 * @file userDAO.js
 * @author Sumit Janawlekar
 * @version 1.0
 * @createdDate 04/27/2020
 * @copyright Ahold USA 2020
 */
//import
const userModel = require("../models/userModel");
//Commons
const FILE_NAME = "userDAO.js";

/**
 * @description function used to register a new user
 * @memberof user
 * @function register
 * @param {Object} query the query condition
 */
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
/**
 * @description function used to check if a userId or Email already exists
 * @memberof user
 * @function checkUserIdExists
 * @param {Object} query the query condition
 * @param {Object} attribute the projection condition
 */
async function checkUserIdExists(query, attribute) {
    return new Promise(async function (resolve, reject) {
        await userModel.find(query, attribute)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}
/**
 * @description function used to login a user by email and password
 * @memberof user
 * @function login
 * @param {Object} query the query condition
 * * @param {Object} attribute the projection condition
 */
async function login(query, attribute) {
    return new Promise(async function (resolve, reject) {
        await userModel.findOne(
            query,
            attribute
        )
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * @description function used to register a new user
 * @memberof user
 * @function login
 * @param {Object} query the query condition
 */
async function pinLoginDao(query) {
    const pinQuery = {
        userId: query.userId
    }
    const attribute = {
        _id: 0,
        pin: 1,
        userId: 1
    }

    return new Promise(async function (resolve, reject) {
        await userModel.findOne(pinQuery, attribute)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * @description function used to the get user details
 * @memberof user
 * @function getUserDetails
 * @param {Object} query the query condition
 * @param {Object} attribute the projections
 */
function getUserDetails(query, attribute) {
    return new Promise(async function (resolve, reject) {
        await userModel.findOne(query, attribute)
            .then(async result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * @description function used to update user profile
 * @memberof user
 * @function updateProfileDao
 * @param {Object} query the query condition
 * @param {Object} setQuery the update object
 */
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
    pinLoginDao,
    checkUserIdExists,
    getUserDetails,
    updateProfileDao
}
