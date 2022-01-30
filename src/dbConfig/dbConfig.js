const { Model } = require('objection')
const Knex = require('knex');

// Initialize knex
const knex = Knex({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "userTaskSystem"
    },
    debug: true
})



Model.knex(knex);

knex.on('query', function (queryData) {
    console.log(queryData.sql);
    console.log(queryData);
})

module.exports = {
    Model,
    knex,
};