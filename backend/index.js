const express  = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./dbconfig');
const UsersModal = require('./schemas/Users');
const UsersTasks = require('./schemas/Tasks');
const bcrypt = require('bcrypt');
// const ObjectId = require("mongoose").Types.ObjectId;
const jwt = require("jsonwebtoken");
const Auth = require("./middelware/auth")
const app = express();

const port = 5001;
connectDB();
app.use(cors());
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});

app.get("/hello", (req ,res) => {
    res.send("hello world")
});

let users = [];

app.post("/signup", async (req ,res) => {
// console.log(req);
const data = req.body;
const hashPassword = await bcrypt.hash(data.password, 16);


if(data.email && data.password){
    const user = await UsersModal.findOne ({email: data.email.toLowerCase()});
    console.log(user);
    if(user) {
        res.send({success: false, message: "User already exist"});
    }
    else{
        // users.push({...data, email: data.email.toLowerCase()});
        const userData = {
            name:data.name,
            email:data.email.toLowerCase(),
            password:hashPassword,
            phone_no:data.phone_no,
            address:data.address
        };
        const newUser = await UsersModal.create(userData);
        console.log(">>>>>>>>>>>>>>new User", newUser);


        res.send({success: true, message: "Signup Successfully!", data:newUser});
    }
}
else{
    res.send({success: false, message: "No Data Found!"});
}

});


app.post("/login", async(req,res) => {
    const data = req.body;
    console.log(">>>>>>>>>>>>>req.body",req.body);
    // console.log(data);
    if (data.email && data.password) {
        const user = await UsersModal.findOne ({email: data.email.toLowerCase()});
        if (user) { 
            if(await bcrypt.compare(data.password, user.password)){
                const token = jwt.sign(
                    {_id: user._id, email:user.email},
                    "nandwana"
                );
                // console.log(">>>>>>>>>>>>>>>>>>>>>>>>token", token);
                res.send({success:true, message:"Login Successfully", data:{token}});
            }
            else {
                res.send({success:false, message:"Password is Incorrect"});
            }
        }
        else{
            res.send({success:false, message:"User Not Found!"})
        }
    }
    else{
        res.send({success:false, message:"No Data Found!"})
    }
});

app.post("/add-task", Auth, async(req,res) => {
    const data = req.body;

    if (data.text && data.date) {
        const task = await UsersTasks.create({...data, userId: req.userId});
        res.send({success:true, message: "Task Added Successfully"});
    } else {
        res.send({ success:false, message:"No Data Found"});
    }

})

app.patch("/mark-as-complete/:taskId", Auth, async (req, res) => {
    const taskId = req.params.taskId;
    const data = req.query;
    console.log(data);
    console.log(taskId);

    const result = await UsersTasks.updateOne(
        {_id: taskId},
        { $set: {isCompleted: true}}
    );

    res.send({success:true, message:"Task Updated Successfully"})

});

app.delete("/delete-task/:taskId", Auth, async (req, res) => {
    const taskId = req.params.taskId;
    const result = await UsersTasks.deleteOne({_id: taskId});

    res.send({success:true, message: "Task Deleted Successfully" })
});

app.get("/get-tasks", Auth, async (req, res) =>{
    const userId = req.userId;
    const searchText = req.query.searchText
    const filter = {userId : userId}
    if(searchText){
        const re = new RegExp(searchText, "i")
        filter.text = {$regex:re}
    }
    console.log(">>>>>>>>>>>>>filter", filter);
    const tasks = await UsersTasks.find(filter);
    res.send({
        success:true,
        message:"Tasks fetched successfully!",
        data:tasks,

    });
});