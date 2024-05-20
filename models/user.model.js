const {Schema, model} = require('mongoose');

const userSchema = Schema({
    userName:{
        type: String,
        required: true,
        unique: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
    img: {
        type: String,
        required: false,
        unique: false
    },
    role: {
        type: String,
        required: true,
        unique: false,
        default: "USER_ROLE"
    },
    google: {
        type : Boolean,
        default: false
    }
});

userSchema.method('toJSON', function() {
const {__v, _id, password, ...object} = this.toObject();
object.uid = _id;
return object;
});

module.exports = model('user', userSchema);