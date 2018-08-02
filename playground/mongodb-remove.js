const { mongoose } = require('../server/db/connect');
const { User } = require('../server/models/user');
const { Todo } = require('../server/models/todo');

//remove all todos
Todo.remove().then( (result) => {
    console.log('ALl Todo are removed. ');
    console.log(result)
}).catch( () => {
    console.log('Unable to remove any todo. ');
});

//find one by id and get it back
Todo.findByIdAndRemove(ID).then( (todo) => {
    console.log(todo)
}).catch( () => {
    console.log('Unable to remove any todo. ');
});