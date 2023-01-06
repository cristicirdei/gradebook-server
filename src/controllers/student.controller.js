import moment from 'moment/moment.js'; 

var mysql = require('mysql');


export const getStudents = async (req, res, next) => {
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
    if (err) throw err;
    var sql = mysql.format("SELECT CONCAT(student.name,' ',student.surname) as name,student.ID FROM student WHERE institutionID = ?",[id]);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      data = Object.values(JSON.parse(JSON.stringify(result)));
      if (data.length == 0){
        return res.status(404).send('Object not found!');
      }
      else{
        final['institution'] = id;
        final['payload'] = data;
        return res.status(200).send(final);
      }
    });

    con.end();
  });

};


export const getStudentByID = async (req, res, next) => {
  let gradeList = [];
  let gradeSheet = [];
  let nameList = [];
  var attList = [];
  var attSheet = [];
  var dateList = [];
 
  
  let id = req.params.id;
  console.log(id);

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
        return res.status(404).send('Object not found!');
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
  
        attendance.forEach(check => dateList.push(check.date));
        dateList.forEach(item => {
          attendance.forEach(function(element){
            if (element.date == item){
              attList.push({
                name : moment.utc(element.date).format('MM.DD.YY'),
                value : element.value
              })
            }    
          });
          attSheet.push({
            name : moment.utc(item).format('MM.DD.YY'),
            values : attList
          });
          attList = [];
        })
  
        let final = {
          name : info.name,
          id : info.id,
          nr : info.nr,
          age : info.age,
          classes : nameList,
          grades : gradeSheet,
          attendance : attSheet
        }
        return res.status(200).send(final);
      }

    });
    con.end();
  });

  
};

export const postStudent = async (req, res, next) => {
  let obj = req.body;


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
        var sql = mysql.format("INSERT INTO student (ID,name,surname,nr,age,institutionID) VALUES (?,?,?,?,?,?)", [counter,obj.name,obj.surname,obj.nr,obj.age,obj.institutionID]);
        con.query(sql, function (err, result, fields) {
          if (err) 
            return res.status(400).send(err.message);
          else 
            return res.status(201).send(obj);
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