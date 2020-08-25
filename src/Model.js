// // var sql = require('./db_connection');
//
// //Task object constructor
// var User = function(user){
//     this.username = user.username;
//     this.firstname = user.firstname;
//     this.lastname = user.lastname;
//     this.password = user.password;
//     this.dob = user.dob;
//     this.gender= user.gender;
//
// };
// User.createUser = function (newUser, result) {
//     sql.query("INSERT INTO users set ?", newUser, function (err, res) {
//
//         if(err) {
//             console.log("error: ", err);
//             result(err, null);
//         }
//         else{
//             console.log(res.insertId);
//             result(null, res.insertId);
//         }
//     });
// };
// // User.getTaskById = function (taskId, result) {
// //     sql.query("Select task from tasks where id = ? ", taskId, function (err, res) {
// //         if(err) {
// //             console.log("error: ", err);
// //             result(err, null);
// //         }
// //         else{
// //             result(null, res);
// //
// //         }
// //     });
// // };
// // User.getAllTask = function (result) {
// //     sql.query("Select * from tasks", function (err, res) {
// //
// //         if(err) {
// //             console.log("error: ", err);
// //             result(null, err);
// //         }
// //         else{
// //             console.log('tasks : ', res);
// //
// //             result(null, res);
// //         }
// //     });
// // };
// // User.updateById = function(id, task, result){
// //     sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
// //         if(err) {
// //             console.log("error: ", err);
// //             result(null, err);
// //         }
// //         else{
// //             result(null, res);
// //         }
// //     });
// // };
// // User.remove = function(id, result){
// //     sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {
// //
// //         if(err) {
// //             console.log("error: ", err);
// //             result(null, err);
// //         }
// //         else{
// //
// //             result(null, res);
// //         }
// //     });
// // };
//
// module.exports= User;