var mysql = require('mysql');
var moment = require('moment')
module.exports = {getSpecificStudent,getAllStudents,postStudent};

function getAllStudents(institution,callback){
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
    var sql = mysql.format("SELECT CONCAT(student.name,' ',student.surname) as name,student.ID as id FROM student WHERE institutionID = ?",[institution]);
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


function getSpecificStudent(id,callback){
  let gradeList = [];
  let gradeSheet = [];
  let nameList = [];
  var attList = [];
  var attSheet = [];
  var dateList = [];

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True" 
  });
  
  con.connect(function(err) {
    if (err) throw err;
    var command0 = `SELECT CONCAT(name," ",surname) as name,ID,nr,age FROM student WHERE ID = ${id};`;
    var command1 = `SELECT class.name,gradeName,value FROM grade INNER JOIN class on class.ID = grade.classID WHERE studentID = ${id};`
    var command2 = `SELECT class.name,date,value FROM attendance INNER JOIN class on class.ID = attendance.classID WHERE studentID = ${id}`
    con.query(mysql.format(command0+command1+command2), function (err, result, fields) {
      if (err) throw err;

      let info = Object.values(JSON.parse(JSON.stringify(result[0])));
      let grades = Object.values(JSON.parse(JSON.stringify(result[1])));
      let attendance = Object.values(JSON.parse(JSON.stringify(result[2])));
      
      if (info.length == 0){
        callback(err,'Object not found!');
      }
      else {
        grades.forEach(grade => nameList.push(grade.name));
        nameList.forEach(item => {
          grades.forEach(function(element){
            if (element.name == item){
              gradeList.push({
                name : element.gradeName,
                value : element.value
              })
            }    
          });
          gradeSheet.push({
            name : item,
            values : gradeList
          });
          gradeList = [];
        })
  
        attendance.forEach(check => dateList.push([check.date,check.name]));
        dateList.forEach(item => {
          attendance.forEach(function(element){
            if (element.date == item[0]){
              attList.push({
                name : moment.utc(element.date).format('MM.DD.YY'),
                value : element.value
              })
            }    
          });
          attSheet.push({
            name : item[1],
            values : attList
          });
          attList = [];
        })
        
        let final = {
          name : info[0].name,
          id : info[0].ID,
          nr : info[0].nr,
          age : info[0].age,
          classes : nameList,
          grades : gradeSheet,
          attendance : attSheet
        }
        callback(null,final);
      }

    });
    con.end();
  });

  
};

function postStudent(institution,obj,callback){

  getStudentCount(function(err,data){
    if (err) {
      console.log("ERROR : ",err);            
    } else {
      console.log(data);
      let counter = data[0].counter + 1;
      console.log(counter);
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "fulger2001",
        database: "gradebook",
        multipleStatements: "True"
      });

      con.connect(function(err) {
        if (err) throw err;
        var sql = mysql.format("INSERT INTO student (ID,name,surname,nr,age,institutionID) VALUES (?,?,?,?,?,?)", [counter,obj.name,obj.surname,obj.nr,obj.age,institution]);
        con.query(sql, function (err, result, fields) {
          if (err) 
            callback(err,"Object not inserted!");
          else 
            callback(null,"Object inserted!");
        });
        con.end();
      });
    };
  });
};

function getStudentCount(callback){
  
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });

  con.connect(function(err) {
    if (err) throw err.message;
    var sql = mysql.format('SELECT COUNT(ID) as counter FROM student ');
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
  "name": "Shogun", 
  "surname": "Diplomat", 
  "nr": 172, 
  "age": 23,
}
// getAllStudents(1,function(err,result){
//   console.log(result);
  
// });

// getSpecificStudent(1,function(err,result){
//   console.log(result);
  
// });

// postStudent(2,test,function(err,result){
//   console.log(result);
// });
