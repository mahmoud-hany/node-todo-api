const { ObjectID } = require('mongodb'); 
const express = require('express');
const bodyParser = require('body-parser');

//connection file && models
const { mongoose } = require('./db/connect');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

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
})

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

//server listen
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000 .');
});

module.exports = { app };