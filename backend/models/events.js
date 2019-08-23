// 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newuser = new mongoose.Schema()
let Event = new Schema({
    
    id:{
        type:Number
    },

    name: {
        type: String
    },

    descript:{
        type:String
    },

    category:{
        type:String
    },

    start_date:{
        type:String
    },

    end_date:{
        type:String
    },
    event_status:{
        type:String
    },
    address: {
        type: String
    },
    website:{
        type:String
    },
    capacity: {
        type: Number
    },
    cost: {
        type: Number
    },
    venue:{
        type:String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});


module.exports = mongoose.model('Event', Event);
