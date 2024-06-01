const express =require("express");//1
const app=express();//2
const mongoose = require('mongoose');//5
const path = require('path');//8
const Chat=require("./models/chat.js");//12
const methodOverride=require("method-override");//22.1

app.set("views",path.join(__dirname,"views"));//9
app.set("view engine","ejs");//10
app.use(express.static(path.join(__dirname,"public")));//17 we are including public folder in index.js so that css could be applied on index.js
app.use(express.urlencoded({extended : true}));//19 for request body to work
app.use(methodOverride("_method"));//22.2


main().then(()=>{//7
        console.log('connection successsfull')
}).catch(err => console.log(err));
async function main() {//6
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');//8
}

// let chat1=new Chat({//13
//     from: "neha",
//     to: "priya",
//     msg : "send me your exam sheets",
//     created_at: new Date(),//new Date() automatically takes up the date according to UTC
// })
// chat1.save().then((res)=>{//14
//     console.log(res);
// })


app.get("/",(req,res)=>{//4
    res.send("root is working");
})

app.get("/chats",async (req,res)=>{//16 since find is a asynchrounous function we have to use await keyword to use await we need to make the function as async
   let chats=await Chat.find();
   console.log(chats);
   res.render("index.ejs",{chats})
})

app.get("/chats/new", (req,res)=>{//18
    res.render("new.ejs",)
 })

app.post("/chats",(req,res)=>{//19 route is same as 16 but we are looking for post request
    let {from, to, msg}=req.body;
    let newchat=new Chat({
        from: from,
        to: to ,
        msg: msg,
        created_at: new Date(),});

    newchat.save().then((res)=>{//20 here sava is a async function but we do not need to write await and make the function asyn because we are already using then and catch 
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
})
app.get("/chats/:id/edit",async(req,res)=>{//21edit route
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
    
});
app.put("/chats/:id",async (req,res)=>{//23
    let { id }=req.params;
    let {msg : newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id ,{msg:newMsg},{runValidators:true ,new:true});
    console.log(updatedChat);
    res.redirect("/chats");
})
app.delete("/chat/:id",async (req,res)=>{
    let { id }=req.params;
    let chatToBeDeleted=await Chat.findByIdAndDelete(id);
    console.log(chatToBeDeleted);
    res.redirect("/chats"); 
})

app.listen(8081, ()=>{//3
    console.log(`app is listing on 8081`);
})


//11 comment present in models->chat.js because we will not create every schema in index.js because index.js will be clutered when we will create many schema
//15 comment present in init.js we are initializing the database with some sample data , this is only done once in the beginning