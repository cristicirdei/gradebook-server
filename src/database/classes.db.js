var mysql = require('mysql');

module.exports = {getAllClasses,getSpecificClass,postClass,getTeacherClasses};

function getAllClasses(institution,callback){
  let data = {};
  let final = {};
  
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
  });
  
  con.connect(function(err) {
    if (err) throw err;
    var sql = mysql.format("SELECT class.name,class.ID as id,count(studentID) AS students,CONCAT(teachers.name, ' ', teachers.surname) as teacher FROM class INNER JOIN enrollment ON class.ID = enrollment.classID INNER JOIN teachers ON teachers.ID = class.teacherID WHERE class.institutionID = ? GROUP BY class.ID", [institution]);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      data = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length == 0){
        callback(err,'Object not found!');
      }
      else{
        final['institution'] = institution;
        final['payload'] = data;
        callback(null,final);
      }
        
    });
    con.end();
  });


};


function getSpecificClass(id,callback){
  let data1 = {};
  let data2 = {};
  let lst = [];

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    let command = ";SELECT student.name,student.surname FROM gradebook.enrollment INNER JOIN student ON enrollment.studentID = student.ID WHERE classID = ?";
    var sql = mysql.format("SELECT class.name,class.ID as id,subject,CONCAT(teachers.name, ' ', teachers.surname) as teacher,description FROM class INNER JOIN teachers ON teachers.ID = class.teacherID WHERE class.ID = ?" + command, [id,id]);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      data1 = Object.values(JSON.parse(JSON.stringify(result[0])));
      data2 = Object.values(JSON.parse(JSON.stringify(result[1])));

      if (data1.length == 0){
        callback(err,'Object not found!');
      }
      else{
        data2.forEach(element => lst.push(element.name + ' ' + element.surname));
        data1[0]["students"] = lst;
        callback(null,data1[0]);
      }   
    });
    con.end();
  });


};


function getTeacherClasses(teacher,callback){
  let data = {};
  let final = {};

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    var sql = mysql.format("SELECT class.name,class.ID as id,count(studentID) AS students,CONCAT(teachers.name, ' ', teachers.surname) as teacher FROM class INNER JOIN enrollment ON class.ID = enrollment.classID INNER JOIN teachers ON teachers.ID = class.teacherID WHERE class.teacherID = ? GROUP BY class.ID", [teacher]);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      data = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length == 0){
        callback(err,'Object not found!');
      }
      else{
        final['teacher'] = teacher;
        final['payload'] = data;
        callback(null,final);
      }
         
    });
    con.end();
  });
};

function postClass(institution,obj,callback){
  let enroll = false;

  getClassCount(function(err,data){
    if (err) {
      console.log("ERROR : ",err);            
    } else {
      let counter = data[0].counter + 1;
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "fulger2001",
        database: "gradebook",
        multipleStatements: "True"
      });
      con.connect(function(err) {
        if (err) throw err;
        let command = ";";
        obj.students.forEach(studentID => {
          command = command + `INSERT INTO enrollment (classID,studentID) VALUES (${counter},${studentID});`;
        });
        command.slice(0, -1);
        var sql = mysql.format("INSERT INTO class (ID,name,subject,description,institutionID,teacherID) VALUES (?,?,?,?,?,?)" + command, [counter,obj.name,obj.subject,obj.description,institution,obj.teacherID]);
        con.query(sql, function (err, result, fields) {
          if (err) 
            callback(err,'Object not found!');
          else {
            enroll = true;
            callback(null,obj);
          }
        });
        
        con.end();
      });
    };
  });
};

function getClassCount(callback){
  
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });

  con.connect(function(err) {
    if (err) throw err;
    var sql = mysql.format('SELECT COUNT(ID) as counter FROM class ');
    con.query(sql, function (err, result, fields) {
      if (err) 
        callback(err,null);
      else{
        callback(null,Object.values(JSON.parse(JSON.stringify(result))));
      }
  
    });
    con.end();
  });

};

let test = {
  "ID": 4,
  "name": "Politics 10A",
  "subject": "Politics",
  "description": "10th grade politics",
  "institutionID": 2,
  "teacherID": 3,
  "students" : [4,5]
}
// getAllClasses(1,function(err,result){
//   console.log(result);
  
// });

// getTeacherClasses(1,function(err,result){
//   console.log(result);
  
// });

// getSpecificClass(1,function(err,result){
//   console.log(result);
  
// });

// postClass(2,test,function(err,result){
// console.log(result);
// });


