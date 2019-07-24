const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required:[true, 'Name Field is required']
        },
        age : Number,
        address : String
    }
);
var User = mongoose.model('User', UserSchema);
module.exports = User;