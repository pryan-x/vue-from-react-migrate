const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ObjectId = mongoose.SchemaTypes.ObjectId


const UserSchema = new Schema({
    username: { type: String, default: '', unique: true },
    // email: { type: String, default: '', unique: true}
    password: { type: String, default: '' }
 
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
// UserSchema.index({ facebook_id: 1 })
// UserSchema.plugin(require('mongoose-autopopulate'))

// /**
//  * find one user by `auth_token`
//  * @param token
//  * @returns {Promise}
//  */
// UserSchema.statics.findOneByAuthToken = function (token) {
//   return this.findOne({
//     auth_token: token
//   }).exec()
// }

const User = mongoose.model('User', UserSchema)
module.exports = User
