var mysql = require('mysql');


export const getUser = async (req, res, next) => {

  let obj = req.body;

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    var command = `SELECT ID as id,email,password,CONCAT(name," ",surname) as name,institutionID as institution FROM teachers WHERE email = '${obj.email}' AND password = '${obj.password}';`;
    var command2 = `SELECT admin.ID as id,email,password,institution.name as name,institutionID as institution FROM admin INNER JOIN institution ON institution.ID = admin.institutionID WHERE email = '${obj.email}' AND password = '${obj.password}'` ;
    con.query(command+command2, function (err, result, fields) {
      if (err) throw err.message;
      let soldier = Object.values(JSON.parse(JSON.stringify(result[0])));
      let senpai = Object.values(JSON.parse(JSON.stringify(result[1])));
      
      let final = {};

      if (soldier.length == 0 && senpai.length != 0){
        final  = {
          message : 'User found!',
          data : {
            id : senpai[0].id,
            email : senpai[0].email,
            password : senpai[0].password,
            type : 'admin',
            name : senpai[0].name,
            institution : senpai[0].institutionID
          }
        }
      }
      else if (soldier.length != 0 && senpai.length == 0){
        final  = {
          message : 'User found!',
          data : {
            id : soldier[0].id,
            email : soldier[0].email,
            password : soldier[0].password,
            type : 'teacher',
            name : soldier[0].name,
            institution : soldier[0].institutionID
          }
        }
      }
      else if (soldier.length == 0 && senpai.length == 0){
        final  = {
          message : 'User not found!',
          data : {}
        }
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

export const postInstitution = async (req, res, next) => {
    let obj = req.body;
  
    getInstitutionCount(function(err,data){
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
          console.log(obj);
          var command2 = `INSERT INTO admin (ID,login,password,institutionID) VALUES (${counter},'${obj.email}','${obj.password}',${counter})`;
          var command1 = `INSERT INTO institution (ID,name,adminID) VALUES (${counter},'${obj.name}',${counter});`;
          //var command3 = `ALTER TABLE institution ADD FOREIGN KEY (adminID) REFERENCES administrator(ID);`;
          //var command4 = `ALTER TABLE administrator ADD FOREIGN KEY (institutionID) REFERENCES institution(ID)`;
          con.query(mysql.format(command1+command2), function (err, result, fields) {
            if (err) 
              return res.status(400).send(err);
            else 
              return res.status(201).send("Objects inserted!");
          });
          con.end();
        });
      };
  
    });
  
  }
  
  function getInstitutionCount(callback){
    
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "fulger2001",
      database: "gradebook",
      multipleStatements: "True"
    });
  
    con.connect(function(err) {
      if (err) throw err.message;
      var sql = mysql.format('SELECT COUNT(ID) as counter FROM institution');
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