const mongoose = require('mongoose');

//mongodb connect
mongoose.connect('mongodb://localhost:27017/todo', {useNewUrlParser:true});

//mongodb schema
var todoSchema = new mongoose.Schema({
    act: String
});

//mongodb model
var TodoModel = mongoose.model('todo-app', todoSchema);

module.exports = function(app){

    //display database content
    app.get('/todo', (req, res)=>{
        TodoModel.find({}, (err, data)=>{
            if (err) throw err;
            res.render('todo', {data : data});
        });
    });

    //insert new documents into datatbase
    app.post('/todo', (req,res)=>{
        TodoModel(req.body).save((err, data)=>{
            if(err) throw err;
            res.send(data);  //note: success code block in ajax will only be executed if theres a response from server 
        });  
    });

    //remove a document from database
    app.delete('/todo/:act', (req,res)=>{
        TodoModel.find({act: req.params.act.replace(/\-/g, " ")}).deleteOne((err, data)=>{
            if(err) throw err;
            res.send(data);
        }); 
    });
    
}