const {Schema, model, Collection} = require('mongoose');

const MedicoSchema = Schema({
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
    hospitalId: {
        type: Schema.Types.ObjectId,
        ref: 'hospital',
        required: true,
        unique: false
    },
}, { collection: 'medicos' } );

MedicoSchema.method('toJSON', function() {
const {__v,  ...object} = this.toObject();

return object;
});

module.exports = model('medico', MedicoSchema);