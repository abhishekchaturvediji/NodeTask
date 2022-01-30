require("../Models/taskModel");
require("../Models/userModel");
var fs = require('fs');
var excel = require('excel4node');

const { knex } = require("../dbConfig/dbConfig");

exports.userCreateController = (req,res,next) => {
	knex("user")
		.insert({
			name : req.body.name,
            email : req.body.email,
            number : req.body.number
		})
		.then(UserCreated => res.redirect("/"))
		.catch(err => res.send(err));
}

exports.findUserController = (req,res,next)=>{
	knex.select()
			.table("user")
			.then(allData => {
				knex.select()
					.table("task")
					.then(taskData => res.render('index', { user: allData , task : taskData}))
			})
			.catch(err => console.log(err));
}


//excel file config---
var workbook = new excel.Workbook();
var worksheet = workbook.addWorksheet('User');
var worksheet1 = workbook.addWorksheet('Task');
var style = workbook.createStyle({
	font: {
	  color: '#EA3A14',
	  size: 18
	},
	numberFormat: '$#,##0.00; ($#,##0.00); -'
  });

  var styleForData = workbook.createStyle({
	font: {
	  color: '#47180E',
	  size: 12
	},
	alignment: {
	  wrapText: true,
	  horizontal: 'center',
	},
	numberFormat: '$#,##0.00; ($#,##0.00); -'
  });

//Tab 1 headers
worksheet.cell(1,1).string('id').style(style);
worksheet.cell(1,2).string('name').style(style);
worksheet.cell(1,3).string('email').style(style);
worksheet.cell(1,4).string('number').style(style);



//Tab 2 headers
worksheet1.cell(1,1).string('Id').style(style);
worksheet1.cell(1,2).string('taskName').style(style);
worksheet1.cell(1,3).string('TaskType').style(style);


//Some logic
function generateExcelSheetUser(array,worksheet){
  let row=2;//Row starts from 2 as 1st row is for headers.
  for(let i in array){
    let o=1;
    //This depends on numbers of columns to fill.
    worksheet.cell(row,o).number(array[i].user_id).style(styleForData);
    worksheet.cell(row,o+1).string(array[i].name).style(styleForData);
    worksheet.cell(row,o+2).string(array[i].email).style(styleForData);
    worksheet.cell(row,o+3).number(array[i].number).style(styleForData);

    row=row+1;
  }
}

function generateExcelSheetTask(array,worksheet){
	let row=2;//Row starts from 2 as 1st row is for headers.
	for(let i in array){
	  let o=1;
	  //This depends on numbers of columns to fill.
	  worksheet.cell(row,o).number(array[i].task_id).style(styleForData);
	  worksheet.cell(row,o+1).string(array[i].taskName).style(styleForData);
	  worksheet.cell(row,o+2).string(array[i].TaskType).style(styleForData);
  
	  row=row+1;
	}
  }



exports.exportDataIntoSheetController =(req,res,next)=>{
	knex.select()
			.table("user")
			.then(allData => {
				knex.select()
					.table("task")
					.then(taskData => {
						generateExcelSheetUser(allData,worksheet)
						generateExcelSheetTask(taskData,worksheet1)
						workbook.write('./excelSheet/Excel.xlsx')
						res.redirect("/");
					})
			})
			.catch(err => console.log(err));
}

exports.downloadSheetController =(req,res,next)=>{
	res.download('./excelSheet/Excel.xlsx'); 
}
