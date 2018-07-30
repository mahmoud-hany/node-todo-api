const { MongoClient, ObjectID } = require('mongodb');

const disp = (user) => {
    console.log('__________________');
    console.log(`Name: ${user.name}`);
    console.log(`Age: ${user.age}`);
    console.log(`Location: ${user.location}`);
};

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error){
        return console.log('Unable to connect Database. '); 
    }
    console.log('Conneted to the Database.');

    /*
        cursor [find]
        .find() // fetch all the data
        .find({completed: false}) // fetch all the data that is not completed
        .find({completed: true}) // fetch all the data that is completed 
        .find({_id: new ObjectID('5b5f402a49a9120cae31d89f')})
        .find().count() // count no of records in database

        all method on the cursor like[toArray] are avaliable in the in the docs
    */
    // db.collection('Todos').find().limit(3).toArray().then( res => {
    //     console.log(JSON.stringify(res, undefined, 2));

    // }).catch( error => {
    //     console.log('Unable to fetch Data from Database.');

    // });
    
    // db.collection('Todos').find().count().then(count => {
    //     console.log(`Todos: ${count}`);
    // }).catch(error => {
    //     console.log('Unable to connect to Database.');
    // });

    db.collection('Users').find().toArray().then( users => {
        //displat user number
        console.log(`There are ${users.length} User(s)`);

        //diplay users
        users.map(user => {
            disp(user);
        })
    }).catch(error => {
        console.log('Unable to fetch Users');
    });

});

