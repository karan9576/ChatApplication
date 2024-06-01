const mongoose = require('mongoose');//1
const Chat=require("./models/chat.js");//4

main().then(()=>{//2
    console.log('connection successsfull')
}).catch(err => console.log(err));
async function main() {//3
await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats=[{//5
    from: "neha",
    to: "priya",
    msg : "send me your exam sheets",
    created_at: new Date(),//new Date() automatically takes up the date according to UTC
},
{
    from: "rohit",
    to: "mohit",
    msg : "teach me JS collection",
    created_at: new Date(),//new Date() automatically takes up the date according to UTC
},
{
    from: "alpha",
    to: "beta",
    msg : "send me code",
    created_at: new Date(),//new Date() automatically takes up the date according to UTC
},
{
    from: "payal",
    to: "priya",
    msg : "send me your exam sheets asap",
    created_at: new Date(),//new Date() automatically takes up the date according to UTC
}
]
Chat.insertMany(allChats);//6
//7 to initialize dont run index.js, run init.js
    