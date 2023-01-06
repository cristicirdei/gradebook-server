var mysql = require('mysql');


export const getClassesByInstitutionID = async (req, res, next) => {
  let data = {};
  let final = {};
  let id = req.params.id;
  console.log(id);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
  });
  
  con.connect(function(err) {
    if (err) throw err;
    var sql = mysql.format("SELECT class.name,class.ID,count(studentID) AS students,CONCAT(teachers.name, ' ', teachers.surname) as teacher FROM class INNER JOIN enrollment ON class.ID = enrollment.classID INNER JOIN teachers ON teachers.ID = class.teacherID WHERE class.institutionID = ? GROUP BY class.ID", [id]);
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


export const getClassByID = async (req, res, next) => {
  let data1 = {};
  let data2 = {};
  let id = req.params.id;
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
        return res.status(404).send('Object not found!');
      }
      else{
        data2.forEach(element => lst.push(element.name + ' ' + element.surname));
        data1[0]["students"] = lst;
        return res.status(200).send(data1[0]);
      }   
    });
    con.end();
  });


};


export const getClassesByTeacherID = async (req, res, next) => {
  let data = {};
  let final = {};
  let id = req.params.id;
  console.log(id);

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    var sql = mysql.format("SELECT class.name,class.ID,count(studentID) AS students,CONCAT(teachers.name, ' ', teachers.surname) as teacher FROM class INNER JOIN enrollment ON class.ID = enrollment.classID INNER JOIN teachers ON teachers.ID = class.teacherID WHERE class.teacherID = ? GROUP BY class.ID", [id]);
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

export const postClass = async (req, res, next) => {
  let obj = req.body;
  let enroll = false;

  getClassCount(function(err,data){
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
        let command = ";";
        obj.students.forEach(studentID => {
          command = command + `INSERT INTO enrollment (classID,studentID) VALUES (${counter},${studentID});`;
        });
        command.slice(0, -1);
        var sql = mysql.format("INSERT INTO class (ID,name,subject,description,institutionID,teacherID) VALUES (?,?,?,?,?,?)" + command, [counter,obj.name,obj.subject,obj.description,obj.institutionID,obj.teacherID]);
        con.query(sql, function (err, result, fields) {
          if (err) 
            return res.status(400).send(err.message);
          else {
            enroll = true;
            return res.status(201).send(obj);
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
    if (err) throw err.message;
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



