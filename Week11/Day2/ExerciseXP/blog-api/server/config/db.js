const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        user: 'postgres',          
        host: '127.0.0.1',         
        database: 'postgres',       
        password: 'postgres', 
        port: 5432
    }            
});

module.exports = db;