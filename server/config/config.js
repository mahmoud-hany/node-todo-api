const env = process.env.NODE_ENV || 'development';

//serperate Database for develpment and test mode
if ( env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';

} else if ( env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

/*

    edit package.json
    "test":

    make the file above 
*/
