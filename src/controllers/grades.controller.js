var mysql = require('mysql');

export const getClassGrades = async (req, res, next) => {
  let array1 = [];
  let gradeList = [];
  let gradeSheet = [];
  let nameList = [];
  let id = req.params.id;

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });

  con.connect(function(err) {
    if (err) throw err;
    var command0 = `SELECT name,ID as id FROM class WHERE ID = ${id};`;
    var command = `SELECT DISTINCT gradeName FROM grade WHERE classID = ${id};`;
    var command2 = `SELECT fullName,gradeName,value FROM grade WHERE classID = ${id}`;
    con.query(mysql.format(command0+command+command2), function (err, result, fields) {
      if (err) throw err;
      let classinfo = Object.values(JSON.parse(JSON.stringify(result[0][0])));
      let gradeNames = Object.values(JSON.parse(JSON.stringify(result[1])));
      let marks = Object.values(JSON.parse(JSON.stringify(result[2])));
    
      marks.forEach(item => nameList.push(item.fullName))
      gradeNames.forEach(item => array1.push(item.gradeName))
      nameList.forEach(item => {
        marks.forEach(function(element){
          if (element.fullName == item){
            gradeList.push({
              name : element.gradeName,
              value : element.value
            })
          }    
        });
        gradeSheet.push({
          name : item,
          grades : gradeList
        });
        gradeList = [];
      })

      let final = {
        name : classinfo[0],
        id : classinfo[1],
        grades : array1,
        students : gradeSheet
      }

      if (final.length == 0){
        return res.status(404).send('Object not found!');
      }
      else
        return res.status(200).send(final);
      
    });

    con.end();
  });
};

export const getStudentGrades = async (req, res, next) => {
  let data = {};
  let final = {};
  let id = req.params.id;

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook"
  });

  con.connect(function(err) {
    if (err) throw err.message;
    var values = "SELECT name,value FROM grade WHERE studentID = ?";
    var classes = "SELECT class.name as name FROM class INNER JOIN enrollment ON enrollment.classID = class.ID WHERE studentID = 1?";
    var sql = mysql.format("SELECT CONCAT(student.name,' ',student.surname) as name,student.ID as id,nr,age,FROM grade WHERE studentID = ?",[id]);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      data = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length == 0){
        return res.status(404).send('Object not found!');
      }
      else{
        final['teacher'] = id;
        final['payload'] = data;
        return res.status(200).send(final);
      }
    });

    con.end();
  });
};

export const postNewGrade = async (req, res, next) => {
  let obj = req.body;
  let enrolled = [];
  let marked = obj.values;
  let names = [];
  marked.forEach(grade =>{names.push(grade.student)})

  getEnrollments(obj.class,function(err,data){
    if (err) {
      console.log("ERROR : ",err);            
    } else {
      enrolled = data;
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "fulger2001",
        database: "gradebook",
        multipleStatements: "True"
      });
    
      con.connect(function(err) {
        if (err) throw err.message;
        let command = "";
        enrolled.forEach(item => {
          if (names.includes(item.fullName)){
            var person = marked.find(mark => mark.student === item.fullName);
            command = command + `INSERT INTO grade (value,gradeName,classID,studentID,fullName) VALUES (${person.value},'${obj.gradeName}',${obj.class},${item.studentID},'${item.fullName}');`;
            console.log(command);
          }
          else{
            command = command + `INSERT INTO grade (value,gradeName,classID,studentID,fullName) VALUES (${null},'${obj.gradeName}',${obj.class},${item.studentID},'${item.fullName}');`;
            console.log(command);
          }
        });
        command.slice(0, -1);
        var sql = mysql.format(command);
        con.query(sql, function (err, result, fields) {
          if (err) 
            return res.status(400).send(err.message);
          else {
            return res.status(201).send(obj);
          }
        });
        
        con.end();
      });

    } 
  })
};


function getEnrollments(classID,callback){
  
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });

  con.connect(function(err) {
    if (err) throw err.message;
    var sql = mysql.format('SELECT CONCAT(student.name," ",student.surname) as fullName,classID,studentID FROM gradebook.enrollment INNER JOIN student ON enrollment.studentID = student.ID WHERE classID = ?', [classID]);
    con.query(sql, function (err, result, fields) {
      if (err) 
        callback(err,null);
      else{
        callback(null,Object.values(JSON.parse(JSON.stringify(result))));
      }
  
    });
    con.end();
  });
}
