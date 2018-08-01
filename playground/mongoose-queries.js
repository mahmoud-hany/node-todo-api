const { ObjectID } = require('mongodb'); 

const { mongoose } = require('../server/db/connect');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// const id = '5b61e627b5cc07f40ac6099d';

// //check the validaty of the id
// if( ! ObjectID.isValid(id) ){
//     console.log('ID is not valid')
// }

// Todo.find({
//     _id: id //mongoose create the objectID
// }).then(todos => {
//     if(!todos) { // id is wrong
//         return console.log('ID was not found');
//     }
//     console.log('-------------find ----------');
//     console.log(`Todos: ${todos}`);
// })
// .catch(error => {
//     console.log('Unable to get this todo.[find]');
// });

// //Faster than findOne 
// Todo.findOne({
//     _id: id
// }).then(todo => {
//     if(!todo) { // id is wrong
//         return console.log('ID was not found');
//     }
//     console.log('-------------findOne ----------');
//     console.log(`Todo: ${todo}`);
// }).catch(error => {
//     console.log('Unable to get this todo. [findOne]');
// });


// Todo.findById(id).then(todo => {
//     if(!todo) { // id is wrong
//         return console.log('ID was not found');
//     }
//     console.log('------------ findById -----------');
//     console.log(`Todos: ${todo}`);
// })
// .catch(error => {
//     console.log('Unable to get this todo.[findById]');
// });

// get the record by the defined iD
User.findById('5b61b3af864d39f817cc92cf').then(user => {
    console.log(JSON.stringify(user, undefined, 2));
}).catch(err => {
   console.log('This user is not Exist. try again! ');
});