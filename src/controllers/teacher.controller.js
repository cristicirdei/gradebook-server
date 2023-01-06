

var mysql = require('mysql');


export const getTeachersByInstitutionID = async (req, res, next) => {
  let nameList = [];
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
    var command = `SELECT CONCAT(name,' ',surname) as name,ID as id,nr FROM teachers WHERE institutionID = ${id};`;
    var command2 = `SELECT class.name,teacherID FROM class WHERE institutionID = ${id}`;
    con.query(command+command2, function (err, result, fields) {
      if (err) throw err;
      let teachers = Object.values(JSON.parse(JSON.stringify(result[0])));
      let classes = Object.values(JSON.parse(JSON.stringify(result[1])));

      console.log(teachers);
      console.log(classes);
      let payload = [];
      teachers.forEach(item => {
        classes.forEach(function(element){
          if (element['teacherID'] == item['id']){
            nameList.push(element.name)
          }
        });
        payload.push({
          name : item.name,
          id : item.id,
          nr : item.nr,
          classes : nameList
        })
        nameList = [];
      });
      
      let final  = {
        id : id,
        payload : payload
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


export const getTeacherByID = async (req, res, next) => {
  let data = [];
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
    var command = `SELECT CONCAT(name,' ',surname) as name,ID as id,nr FROM teachers WHERE ID = ${id};`;
    var command2 = `SELECT class.name FROM class WHERE teacherID = ${id}`;
    con.query(command+command2, function (err, result, fields) {
      if (err) throw err;

      let info = Object.values(JSON.parse(JSON.stringify(result[0])));
      let classes = Object.values(JSON.parse(JSON.stringify(result[1])));
      classes.forEach(item => data.push(item.name))
      
      if (info.length == 0){
        return res.status(404).send('Object not found!');
      }
      else{
        info = info[0];
        
        let final  = {
          name : info.name,
          id : info.id,
          nr : info.nr,
          classes : data
        }
        return res.status(200).send(final);
      }    
    });
    con.end();
  });

  
};

export const postTeacher = async (req, res, next) => {
  let obj = req.body;

  getTeacherCount(function(err,data){
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
        var sql = mysql.format("INSERT INTO teachers (ID,name,surname,nr,age,email,password,institutionID) VALUES (?,?,?,?,?,?,?,?)", [counter,obj.name,obj.surname,obj.nr,obj.age,obj.email,obj.password,obj.institutionID]);
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

}

function getTeacherCount(callback){
  
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });

  con.connect(function(err) {
    if (err) throw err.message;
    var sql = mysql.format('SELECT COUNT(ID) as counter FROM teacher ');
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