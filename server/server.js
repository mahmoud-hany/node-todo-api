const _ = require('lodash');
const { ObjectID } = require('mongodb'); 
const express = require('express');
const bodyParser = require('body-parser');

//connection file && models
const { mongoose } = require('./db/connect');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//Make todos
app.post('/todos', (req, res) => {
    const newTodo = new Todo({
       text: req.body.text
    });
   
    newTodo.save().then(doc => {
       res.send(doc);
    }).catch(error => {
        res.status(400).send(error)
    });
});

//Get All Todos 
app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({ todos }); //todos is array
    }).catch(error => {
        res.status(400).send(error); 
    })
});

//Get Todo by id [id is variable]
//req params is object contains our varaiables
app.get(`/todos/:id`, (req, res) => {
    // res.send(req.params); 
    const ID = req.params.id;

    if(! ObjectID.isValid(ID) ){
        return res.status(400).send(); //send status NotFound: 404
    }

    Todo.findById( ID ).then( todo => {
        if(!todo){
            return res.status(404).send(); //send status badRequest: 400
        }
        
        res.status(200).send({todo, status: "OK"}); //send status Ok: 200
    }).catch(error => {
        console.log('Unable to find thid one');
        res.status(400).send(error) //send status badRequest: 400
    })

});

app.delete('/todos/:id', (req, res) => {
    const ID = req.params.id;
    
    if(! ObjectID.isValid(ID) ){ // id is'nt valid
        return res.status(400).send();
    }

    Todo.findByIdAndRemove(ID).then( todo => {
        if(!todo){
            return res.status(404).send(); // Not found if the todo empty
        }

        res.send({todo})
    }).catch( err => {
        res.status(400).send(err);
    });

});


//update todo
app.patch('/todos/:id', (req, res) => {
    //get the id
    const ID = req.params.id;
    
    //check the id validaty
    if (! ObjectID.isValid(ID)){
        return res.status(400).send();
    }

    //pick this two propeties from our todo
    const body = _.pick(req.body, ['text', 'completed']);
    
    //if ther was completed property
    if(_.isBoolean(body.completed) && body.completed ){
        body.completed = true;
        body.completedAt = + new Date(); //current time in meliseconds.
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    //update todo | {new: true} => to get the updated todo
    Todo.findOneAndUpdate(ID, {$set: body}, {new: true}).then(todo => {
        if(!todo ) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch(err => {
        res.status(400).send(err);
    });
    
});

//server listen
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} .`);
});

module.exports = { app };

/*
    ----------  for deploy our app using heroku ----------
    server.js
    const port = process.env.PORT || 3000; 
    
    package.Json 
    "scripts":{
        "start": "node server/server.js"
    },
    engines: {
        "node": "version"
    }

    1. create heroku app 
    $ heroku create
    
    2. add this addon 
    $ heroku addons:create mongolab:sandbox

*/ 