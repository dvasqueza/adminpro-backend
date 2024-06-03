const {Schema, model, Collection} = require('mongoose');

const HospitalSchema = Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: false,
        unique: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: false
    },
}, { collection: 'hospital' } );

HospitalSchema.method('toJSON', function() {
const {__v,  ...object} = this.toObject();

return object;
});

module.exports = model('hospital', HospitalSchema);