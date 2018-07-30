/*
1. connect node to our todatabse
    - install mongodb package 

2. insert  record into database
    db.collection('collection Name').insertOne('record object', 'callback [results - error]')

3. info about id
    -i can insert the id i need {_id: 123}
    -there is a function that i can use to control the way id is created == result.ops[0]._id.getTimestamp()==

    -id contains the following
        - time satamp [the tome inwhich it was created] => to get it 
        - machine identifier
        - process id
        - random value
*/

// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

const obj = new ObjectID();

console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        return console.log('Unable to connect to database');
    } 

    console.log('conneted to Mongo server success.');

    // db.collection('Todos').insertOne({
    //     text: 'SOme text here',
    //     completed: false
    // }, ( error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert Todo ', error);
    //     }
    //     console.log(JSON.stringify( result.ops , undefined, 2));
    // });

    db.collection('Todos').insertOne({
        text: 'Walk the dog',
        completed: false
    }, (error, result) => {
        if(error){
            console.log('Unable to insert record');
        }

        console.log('One recode was added');
        console.log(JSON.stringify( result.ops , undefined, 2));
    })

    // db.collection('Users').insertOne({
    //     name: 'Mahmoud',
    //     age: 25,
    //     location: 'Cairo, Egypt'
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unbale to insert this recored');
    //     } 
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
    // });



    db.close(); //close the connetion
});