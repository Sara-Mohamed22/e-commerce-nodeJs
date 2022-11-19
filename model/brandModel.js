/// shape of schema in mongoose .

const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String ,
        required:[true , "This field is Required"] ,
        unique : true ,
        trim : true ,

    },

    slug: {
        type: String,
        lowercase : true ,

    },

    image : String 
},{
    timestamps: true
});


module.exports = mongoose.model('Brand', brandSchema);