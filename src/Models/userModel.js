let {Model,knex} = require("../dbConfig/dbConfig");

class userModelTable extends Model{
    static get tableName(){
        return 'user'
    }
}

async function CreateUserModel(){

    if(await knex.schema.hasTable('user')){ return }
    await knex.schema.createTable('user',table=>{

        table.increments('user_id').primary();
        table.string("name");
        table.string("email");
        table.integer("number");

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
}

CreateUserModel()
    .then(data => {
        console.log('User table created successfully');
    })
    .catch(err => {
        console.log('User Table creation Failed');
});


module.exports = userModelTable;