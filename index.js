const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/Chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("Connection successful");
    })

    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//Delete/destroy route

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

//edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

//update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newmsg } = req.body;
    console.log(newmsg);
    let newChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newmsg },
        { runValidators: true, new: true });

    res.redirect("/chats");
})



//new route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//create route
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let chat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
    chat.save()
        .then(() => {
            console.log("added to DB");
        })
        .catch(err => {
            console.log(err);
        })
    res.redirect("/chats");
});

//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    console.log(chats);
    // res.send("Working");
    res.render("index.ejs", { chats });
});

// let chat1 = new Chat({
//     from: "Ayush",
//     to: "Shruti",
//     msg: "Yes babe!",
//     created_at: new Date(),
// });

// chat1.save()
// .then(res => {
//     console.log(res);
// })
// .catch(err => {
//     console.log(err);
// })



app.get("/", (req, res) => {
    res.send("Working root");
});

app.listen(8080, () => {
    console.log("app is listening at 8080...");
});
