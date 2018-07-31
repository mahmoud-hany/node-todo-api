const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if(error) {
        return console.log('Unable to connect with Mongo Server.');
    }
    console.log('Connected Successfully.');

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'read a book'}).then(res => {
    //     console.log('The task was deleted: ');
    //     console.log(JSON.stringify(res.message.documents, undefined, 2))
    // }).catch(error => {
    //     console.log(error);
    // })
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'SOme text here'}).then(res => {
    //     console.log('One task deleted')
    //     console.log(res);
    // }).catch(error => {
    //     console.log('Unable to delete the task');
    // });

    // //findOneAndDelete
    db.collection('Todos').findOneAndDelete({text: 'DO the homework'}).then(res => {
        console.log('One task deleted');
        console.log(JSON.stringify(res.value, undefined, 2) );
    }).catch(error => {
        console.log('Unable to delete the task');
    });

    // db.close();
});