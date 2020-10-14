const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    userId: {type: String},
    createdAt: {type: Date}
})

userSchema.index({"userId": 1 })
module.exports = mongoose.model('user', userSchema)
