const { knex, Model } = require("../dbConfig/dbConfig");

exports.taskCreateController = (req,res,next) => {
	knex("task")
		.insert({
			user : req.body.user,
            taskName : req.body.taskName,
            TaskType : req.body.TaskType
		})
		.then(TaskCreated => res.redirect("/"))
		.catch(err => res.send(err));
}

