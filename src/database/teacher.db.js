var mysql = require('mysql');


export function getAllTeachers(institution,callback){
  let nameList = [];
 

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    var command = `SELECT CONCAT(name,' ',surname) as name,ID as id,nr FROM teachers WHERE institutionID = ${institution};`;
    var command2 = `SELECT class.name,teacherID FROM class WHERE institutionID = ${institution}`;
    con.query(command+command2, function (err, result, fields) {
      if (err) throw err;
      let teachers = Object.values(JSON.parse(JSON.stringify(result[0])));
      let classes = Object.values(JSON.parse(JSON.stringify(result[1])));

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
        institution : institution,
        payload : payload
      }
      if (final.length == 0){
        callback(err,'Objects not found!');
      }
      else
        callback(null,final);
      
    });
    con.end();
  });

};


export function getSpecificTeacher(id,callback){
  let data = [];

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
        callback(err,'Object not found!');
      }
      else{
        info = info[0];
        
        let final  = {
          name : info.name,
          id : info.id,
          nr : info.nr,
          classes : data
        }
        callback(null,final);
      }    
    });
    con.end();
  });

  
};

export function postTeacher(institution,obj,callback){


  getTeacherCount(function(err,data){
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
        var sql = mysql.format("INSERT INTO teachers (ID,name,surname,nr,age,email,password,institutionID) VALUES (?,?,?,?,?,?,?,?)", [counter,obj.name,obj.surname,obj.nr,obj.age,obj.email,obj.password,institution]);
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
    var sql = mysql.format('SELECT COUNT(ID) as counter FROM teachers');
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
  "name": "Jack", 
  "surname": "Reacher", 
  "nr": 423, 
  "age": 30,
  "email": "jreacher@asd",
  "password": "jumanji392"
}
getAllTeachers(1,function(err,result){
  console.log(result);
  
});

getSpecificTeacher(1,function(err,result){
  console.log(result);
  
});

postTeacher(2,test,function(err,result){
  console.log(result);
});
