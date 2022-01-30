let {Model,knex} = require("../dbConfig/dbConfig");

class TaskModelTable extends Model{
    static get tableName(){
        return 'task'
    }
}

async function CreateTaskModel(){

    if(await knex.schema.hasTable('task')){ return }
    await knex.schema.createTable('task',table=>{

        table.increments('task_id').primary();
        table.integer('user').unsigned()
        table.foreign('user').references('user.user_id')
        table.string("taskName");
        table.string("TaskType");

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

}

CreateTaskModel()
    .then(data => {
        console.log('Task table created successfully');
    })
    .catch(err => {
        console.log('Task Table creation Failed');
});


module.exports = TaskModelTable;