const mongoose = require('mongoose');

//mongodb connect
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser:true});

//mongodb todo schema
var todoSchema = new mongoose.Schema({
    act: String
});

//mongodb user schema
var userSchema = new mongoose.Schema({
    name: String,
    email: String
});

//mongodb todo model
var TodoModel = mongoose.model('todo-app', todoSchema);

//mongodb user model
var UserModel = mongoose.model('users', userSchema);

module.exports = function(app){

    //open main page
    app.get('/', (req,res)=>{
        res.sendFile('/public/index.html');
    });
        
    //get all reminders OR insert new documents into datatbase
    app.post('/todo', (req,res)=>{
        if(req.body.name && req.body.email){
            TodoModel.find({}, (err, data)=>{
                if (err) throw err;
                res.render('todo', {data : data});
            });
        }
        else{
            TodoModel(req.body).save((err, data)=>{
                if(err) throw err;
                res.send(data);  //note: success code block in ajax will only be executed if theres a response from server 
            }); 
        } 
    });

    //remove a document from database
    app.delete('/todo/:act', (req,res)=>{
        TodoModel.find({act: req.params.act.replace(/\-/g, " ")}).deleteOne((err, data)=>{
            if(err) throw err;
            res.send(data);
        }); 
    });
    
}