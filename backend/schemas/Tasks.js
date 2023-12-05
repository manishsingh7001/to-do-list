const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId
  

const TaskSchema = new Schema ({
    id:String,
    text:String,
    date:Date,
    isCompleted:{type:Boolean, default:false},
    userId:ObjectId

})

const UsersTasks = mongoose.model("tasks", TaskSchema);

module.exports = UsersTasks;