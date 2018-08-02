const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

// fake todo
const todos = [
    {   
        _id: new ObjectID(),
        text: 'Run 10 km'
    },
    {
        _id: new ObjectID(),
        text: 'Watch Dog'
    }
];

// clear Database
beforeEach( (done) => {
    Todo.remove({}).then(() => { 
        return Todo.insertMany(todos); // add the fake array after clear Database
    }).then( () => done() ); // clean our Database
});

describe('Post / todos', () => {
    it('Should create a new todo.', (done) => {
        const text = 'Read a book';

        request(app)
            .post('/todos')
            .send({text}) // as Json 
            .expect(200) // status is ok
            .expect(res => {
                expect(res.body.text).toBe(text);
            })
            .end((error, res) => {
                if(error) {
                    return done(error);
                }

                Todo.find({text}).then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch( er => done(er) );
            });
    });

    it('Should not create new todo if has invalid body Data', (done) => {
        request(app)
            .post('/todos')
            .send() // there's no data send [ text invalid]
            .expect(400) // http status to be 400
            .end( (error, res) => {
                if(error) {
                    return done();
                }

                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(2); // the length should not change = stay 2
                    done(); 
                }).catch(er => done(er));
            });
            
    })
});

describe('GET/ todos', () => {
    it('Should Get all todos ', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
            
    });
});

describe('GET /todos:id', () => {
    it('Should get Todo by id', (done) => {
        
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`) // toHexString() => convert Object to string
            .expect(200)
            .expect( res => {
                expect(res.body.todo.text).toBe(todos[0].text)
            }).end(done);
       
    });

    it('Should return 404 if the iD is not found', (done) => {
        const ID = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${ID}`) //real object id but is't right
            .expect(404)
            .end(done);
    })

    it('Should return 400 if the id is facke', done => {
        request(app)
            .get(`/todos/1234ad`)
            .expect(400)
            .end(done)
    })
})


// run test using   [npm run test - npm run test-watch]