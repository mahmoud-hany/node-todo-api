const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error ) {
        return console.log('Unable to connect with the Database.');
    }
    console.log('Connected successfully. ');

    //update record 
    // db.collection('Todos').findOneAndUpdate({
    //     _id: ObjectID('5b5f408649a9120cae31d8a9')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, 
    // {
    //     returnOriginal: false // to return updated one
    // }).then( res => {
    //     console.log(res);
    // }).catch( error => {
    //     console.log('Unable to update the record.');
    // });

    //update user
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b5f1e9f670baa16f87565bd')
    }, {
        $set: {
            name: 'Zinab' // modifiy name to zinab
        },
        $inc: {
            age: -4 // decrease age by 4
        }
    }, {
        returnOriginal: false
    }).then(res => {
        console.log(res);
    }).catch(error => {
        console.log('Unable to update this record.');
    })

});