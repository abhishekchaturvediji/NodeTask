var express = require('express');
var router = express.Router();


// user controlled routes----------------
let {
  userCreateController,
  findUserController,
  exportDataIntoSheetController,
  downloadSheetController
} = require("./Controllers/userController");

/**
 * @route POST /createUser
 * @desc creates the user
 * @access Public
 */
router.post('/createUser',userCreateController);

/**
 * @route GET /
 * @desc renders index and sends all found Users
 * @access Public
 */
router.get('/', findUserController);


/**
 * @route GET /export
 * @desc Exports the data into excel sheet
 * @access Public
 */
router.get('/export', exportDataIntoSheetController);



/**
 * @route GET /download
 * @desc downloads the excel sheet
 * @access Public
 */
 router.get('/download', downloadSheetController);



// task controlled routes-----------
let {
  taskCreateController
} = require("./Controllers/taskControllers");


/**
 * @route POST /createTask
 * @desc Creates the task
 * @access Public
 */
router.post('/createTask',taskCreateController);




module.exports = router;
