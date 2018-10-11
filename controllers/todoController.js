const db = require('./dbConnect');
const mail = require('./mail');

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
        db.TodoModel.find({}, (err, data)=>{
            if (err) throw err;
            res.render('todo', {data : data});
        });
        if(userName !== req.body.name && email !== req.body.email){
            db.UserModel(req.body).save((err)=>{
                if(err) throw err;
            });
            userName = req.body.name;
            email = req.body.email;
        }
    });

    //insert reminders into todo-apps collection
    app.post('/act', (req, res)=>{
        db.TodoModel(req.body).save((err, data)=>{
            if(err) throw err;
            res.send(data);  //note: success code block in ajax will only be executed if theres a response from server 
        }); 
    });

    //remove a document from todo-apps collection
    app.delete('/act/:act', (req,res)=>{
        db.TodoModel.find({act: req.params.act.replace(/\-/g, " ")}).deleteOne((err, data)=>{
            if(err) throw err;
            res.send(data);
        }); 
    });

    //logout operation and database clear
    app.get('/logout', (req, res)=>{
        db.TodoModel.remove({}, (err)=>{
            if(err) throw err;
        });
        db.UserModel.remove({}, (err)=>{
            if(err) throw err;
        });
        res.send('Done');
    });

    setInterval(function(){
        var time = new Date();
        db.TodoModel.find({}, (err, data)=>{
            if(err) throw err
            if(data.length > 0){
                data.forEach((item)=>{
                    if(item.time.toString() === time.toString()){
                        var mailDeets = mail.mailOptions(userName, email, item.act); //mailOptions(receiverName, receieverEmail) function in mail.js module
                        mail.transporter.sendMail(mailDeets, (error, info) => {
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message sent: %s', info.messageId);
                        });
                    }
                });
            }
        });
    }, 1000);
}