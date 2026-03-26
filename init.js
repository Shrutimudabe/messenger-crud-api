const mongoose = require("mongoose");
const Chat = require("./models/Chat.js");

main()
    .then(res => {
        console.log("successfully connected");
    })
    .catch(err => {
        console.log(err);
    });



async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const chats = [
    {
        from: "Janhavi",
        to: "Shrutika",
        msg: "Find the syllabus of AI/ML..",
        created_at: new Date()
    },
    {
        from: "Janhavi",
        to: "Kshitija",
        msg: "we are leaving on 18th feb",
        created_at: new Date()
    },
    {
        from: "Shruti",
        to: "Janhavi",
        msg: "Just two papers are left!",
        created_at: new Date()
    },
    {
        from: "Bruno",
        to: "Shruti",
        msg: "Hii, I'm your new friend.",
        created_at: new Date()
    },
    {
        from: "Janhavi",
        to: "Yadnyesh",
        msg: "I want chocolates today!",
        created_at: new Date()
    },
    {
        from: "Ayush",
        to: "Shruti",
        msg: "How about I send you Chocolates today?",
        created_at: new Date()
    },
    {
        from: "Shruti",
        to: "Ayush",
        msg: "Okay, I have found a new name..",
        created_at: new Date()
    }
];

Chat.insertMany(chats);
