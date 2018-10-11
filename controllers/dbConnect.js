const mongoose = require('mongoose');

//mongodb connect
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser:true});

//mongodb todo schema
var todoSchema = new mongoose.Schema({
    actID: Number,
    act: String,
    time: {type: Date, default: Date.now}
});

//mongodb user schema
var userSchema = new mongoose.Schema({
    actID: Number,
    name: String,
    email: String
});

//mongodb todo model
var TodoModel = mongoose.model('todo-app', todoSchema);

//mongodb user model
var UserModel = mongoose.model('user', userSchema);

module.exports = {
    TodoModel, UserModel
}