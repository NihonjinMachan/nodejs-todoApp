const mongoose = require('mongoose');

//mongodb connect
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser:true});

//mongodb todo schema
var todoSchema = new mongoose.Schema({
    act: String,
    time: {type: Date, default: Date.now}
});

//mongodb user schema
var userSchema = new mongoose.Schema({
    name: String,
    email: String
});

//mongodb todo model
var TodoModel = mongoose.model('todo-app', todoSchema);

//mongodb user model
var UserModel = mongoose.model('user', userSchema);

//checks to prevent same user being saved to dB multiple times 
var userName = "";
var email = "";

module.exports = function(app){

    //open main page
    app.get('/', (req,res)=>{
        res.sendFile('/public/index.html');
    });
        
    //insert new user into users collection and retrieve all reminders
    app.post('/todo', (req,res)=>{
        TodoModel.find({}, (err, data)=>{
            if (err) throw err;
            res.render('todo', {data : data});
        });
        if(userName !== req.body.name && email !== req.body.email){
            UserModel(req.body).save((err)=>{
                if(err) throw err;
            });
            userName = req.body.name;
            email = req.body.email;
        }
    });

    //insert reminders into todo-apps collection
    app.post('/act', (req, res)=>{
        TodoModel(req.body).save((err, data)=>{
            if(err) throw err;
            res.send(data);  //note: success code block in ajax will only be executed if theres a response from server 
        }); 
    });

    //remove a document from todo-apps collection
    app.delete('/act/:act', (req,res)=>{
        TodoModel.find({act: req.params.act.replace(/\-/g, " ")}).deleteOne((err, data)=>{
            if(err) throw err;
            res.send(data);
        }); 
    });
    
}