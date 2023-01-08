var lib = require("./student.db")
var lib2 = require("./grades.db")
var lib3 = require("./attendance.db")
var lib4 = require("./teacher.db")
var lib5 = require("./institution.db")
var lib6 = require("./classes.db")


// lib.getSpecificStudent(1,function(err,result){
//     console.log(result);
    
// });

// lib2.getClassGrades(1,function(err,result){
//     console.log(result);
//     console.log(result.students[0]);
// });

lib3.getClassAttendance(2,function(err,result){
    console.log(result);
    console.log(result.students[0]);
});