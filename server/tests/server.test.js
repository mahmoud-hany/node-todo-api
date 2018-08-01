const expect = require('expect');
const request = require('supertest');

const { app } = require('../server');
const { Todo } = require('../models/todo');

beforeEach( (done) => {
    Todo.remove({}).then(() => done() ); // clean our Database
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

                Todo.find().then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch( er => {
                    done(er);
                });
            });

    });
});