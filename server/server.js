//express
const express = require('express');
const bodyParser = require('body-parser');

//connection file && models
const { mongoose } = require('./db/connect');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();

app.use(bodyParser.json());

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

//server listen
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000 .');
});