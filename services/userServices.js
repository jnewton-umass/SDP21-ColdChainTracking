const FILE_NAME = "userService.js";
const CONSTANTS = require("../constants/constants");

//import
const userDao = require('../dataOps/userDataOps')
const userModel = require("../models/userModel")

//constants
const errorObj = {}
//response Object
const responseObj = { user: {} }

/**
 * Function used to execute DAO function of registering a new user
 * @memberof userService
 * @function register
 * @param {Object} req body
 */
async function register(req) {
    //User Object
    const userObj = new userModel()
    //Generate hash for Password and Pin
    const password = await userObj.setPassword(req.body.password)
    //object to register the user
    const query = {
        userId: req.body.userId,
        password: req.body.password,
        createdAt: new Date()
    }
    //Query Object to check userId
    const userIdCheck = {
        userId: query.userId
    }

    const userIdAttribute = {
        _id: 0,
        userId: 1
    }


    return new Promise(async function (resolve, reject) {
        //check if userId already exists in the DB
        await userDao.checkUserIdExists(userIdCheck, userIdAttribute)
            .then(async result => {
                //If yes, throw error and don't register the user
                if (result.length !== 0) {
                    errorObj.code = CONSTANTS.APP_ERROR_CODE.USER_EXISTS
                    throw (errorObj)
                }
                return result
            })
            .then(async result => {
                //check if email already exists in the DB
                const ifEmailExists = await userDao.checkUserIdExists(emailCheck, emailAttribute)
                //If yes, throw error and don't register the user
                if (ifEmailExists.length !== 0) {
                    errorObj.code = CONSTANTS.APP_ERROR_CODE.EMAIL_EXISTS
                    throw (errorObj)
                }
                return result
            })
            .then(async result => {
                //Register the user
                return userDao.register(query)
            })
            .then(async result => {
                //generating the access and refresh tokens
                const tokens = await tokenService.generateToken(result.userId)
                resolve(tokens)
            })
            .catch(error => {
                return reject(error)
            })
    })
}

/**
 * Function used to execute DAO function of logging in or registering an unregistered user
 * @memberof userService
 * @function login
 * @param {Object} req body
 */
async function login(req) {
    return new Promise(async function (resolve, reject) {
        const userId = req.body.userId;
        // user id attribute of user
        const userIdAttribute = {
            _id: 0,
            userId: 1
        }

        // fetch user details from ScanIt using Login Radius Access token
        await utils.fetchUserProfile(lrAccessToken)
            .then(async result => {
                // If userId fetched from ScanIt is not the same as the one received from client
                if (result.userId !== userId) {
                    errorObj.code = CONSTANTS.APP_ERROR_CODE.USER_ID_INCORRECT
                    throw (errorObj)
                }
                return result
            })
            .then(async result => {

                // query with userId
                const userIdQuery = {
                    userId: result.userId
                }

                // check if the user already exists in the database
                const user = await userDao.checkUserIdExists(userIdQuery,userIdAttribute);

                // if user does not exist in the database
                if(user.length===0){
                    LOGGER.debug(`userId is added to the database :: ${FILE_NAME}`)

                    // user details to be saved in database
                    const setUserQuery ={
                        userId: result.userId,
                        createdAt: new Date()
                    }
                    await userDao.register(setUserQuery);
                }

                return result;
            })
            .then(async result => {
                LOGGER.debug(`generate the access token :: $(FILE_NAME)`)
                //generating the access and refresh tokens
                const tokens = await tokenService.generateToken(result.userId)
                LOGGER.debug(`exiting register service :: $(FILE_NAME)`)
                resolve(tokens)
            })
            .catch(error => {
                LOGGER.error(`Error in login service :: $(FILE_NAME)${error}`)
                return reject(error)
            })
    })
}

/**
 * Function used to execute DAO function for login by pin
 * @memberof userService
 * @function login
 * @param {Object} req body
 */
async function pinService(req) {
    LOGGER.debug(`Entering into user login pin service :: $(FILE_NAME)`);

    const query = {
        userId: req.body.userId,
        pin: (req.body.pin).toString()
    }

    //response Object
    const userObj = new userModel()
    const errObj = {}
    return new Promise(async function (resolve, reject) {
        await userDao.pinLoginDao(query)
            .then(async result => {
                if (result === null) {
                    LOGGER.debug(`userId not found :: $(FILE_NAME)`)
                    errorObj.code = CONSTANTS.APP_ERROR_CODE.USER_ID_NOT_FOUND
                    throw (errorObj)
                }
                const pinCheck = await userObj.compareHash(query.pin, result.pin)
                if (!pinCheck) {
                    LOGGER.debug(`pin invalid :: $(FILE_NAME)`);
                    errObj.code = CONSTANTS.APP_ERROR_CODE.PIN_INVALID
                    throw (errObj)
                }
                LOGGER.debug(`pin valid :: $(FILE_NAME)`);
                return result
            })
            .then(async result => {
                LOGGER.debug(`generate the access token :: $(FILE_NAME)`)
                //generating the access and refresh tokens
                const tokens = await tokenService.generateToken(result.userId)
                LOGGER.debug(`exiting register service :: $(FILE_NAME)`)
                resolve(tokens)
            })
            .catch(error => {
                LOGGER.error(`Error in user login pin service :: $(FILE_NAME)`)
                reject(error)
            })
    })
}

/**
 * Function used to execute DAO function for updating user profile
 * @memberof userService
 * @function updateProfile
 * @param {Object} req body
 */
async function updateProfile(req) {
    LOGGER.debug(`Entering into updateProfile service :: ${FILE_NAME}`);
    return new Promise(async function (resolve, reject) {

        const encryptedEmail = await encryptEmail(req.body.email);

        let query = {
            email: encryptedEmail.email
        }

        const attributes = {
            _id: 0,
            userId: 1
        }

        // check if email in body belongs to the user or already exists
        await userDao.checkUserIdExists(query, attributes).then(async emailExists => {

            // email does not exist in db or belongs to the user so no change to email
            if (emailExists.length === 0 || emailExists[0].userId === req.body.userId) {
                LOGGER.debug(`Entering this when email does not exist in the db or belongs to
                 the user who wants to update profile  :: ${FILE_NAME}`);

                query = {
                    "userId": req.body.userId
                }

                // set query Object with fields to be updated
                const setQuery = {
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "phoneNumber": req.body.phoneNumber,
                    "email": req.body.email,
                    __enc_firstName: false,
                    __enc_lastName: false,
                    __enc_phoneNumber: false,
                    __enc_email: false
                }

                // updating the profile with the setQuery update object
                const result = await userDao.updateProfileDao(query, setQuery);

                LOGGER.debug(`exiting update profile service :: ${FILE_NAME}`);
                resolve(result);
            } else {
                LOGGER.debug(`Entering this when email already is being used by another user :: ${FILE_NAME}`);
                // throw error for email being already present in db by some other user
                // sending resolve with emailAreadyPresent variable
                emailExists.emailPresent = true;
                LOGGER.debug(`exiting update profile service :: ${FILE_NAME}`);
                resolve(emailExists);

            }
        }).catch(error => {
            LOGGER.error(`error in update profile service :: ${FILE_NAME}`);
            reject(error);
        })

    })
}

/**
 * Function used to execute userDAO function getUserDetails
 * @memberof userService
 * @function fetchProfileService
 * @param {Object} req body
 */
async function fetchProfileService(req) {
    LOGGER.debug(`Entering into fetchProfile Service :: $(FILE_NAME)`);
    return new Promise(async function (resolve, reject) {
        const respObj = {};
        //query parameter that should make for getting data
        const query = {
            userId: req.query.userId
        }
        //attributes  that needed from the database which is a encrypted data
        const attributes = {
            _id: 0,
            userId: 1,
            firstName: 1,
            lastName: 1,
            email: 1,
            phoneNumber: 1,
            __enc_firstName: 1,
            __enc_lastName: 1,
            __enc_email: 1,
            __enc_phoneNumber: 1

        }
        //to fetch a particular user from database pass query and attributes that are required
        await userDao.getUserDetails(query, attributes)
            .then(result => {
                if (result === null) {
                    //If user not found throw a errorcode(Hannaford Appcode)
                    LOGGER.debug(`userId not found :: $(FILE_NAME)`)
                    errorObj.code = CONSTANTS.APP_ERROR_CODE.USER_ID_NOT_FOUND
                    throw (errorObj)
                }
                //filtering for the response based on result obtained from querying database->we recieve decrypted fields In response
                respObj.userId = result.userId;
                respObj.firstName = result.firstName;
                respObj.lastName = result.lastName;
                respObj.email = result.email;
                respObj.phoneNumber = result.phoneNumber;
                LOGGER.debug(`exiting  fetchProfileService:: $(FILE_NAME)`)
                resolve(respObj);
            }).catch(error => {
                LOGGER.error(` fetchProfileService error:: $(FILE_NAME)`)
                reject(error);
            })
    })

}

module.exports = {
    register,
    login,
    pinService,
    updateProfile,
    fetchProfileService
}
