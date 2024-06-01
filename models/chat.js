const mongoose = require('mongoose');//1

const chatSchema =new mongoose.Schema({//2
       from :{
        type:String,
        required:true
       },
       to :{
        type:String,
        required:true
       },
       msg :{
        type:String,
        maxLength :50
       },
       created_at: {
        type: Date,
        required: true,
       }
    });
    const Chat=mongoose.model('Chat',chatSchema);//3
    module.exports = Chat;//4