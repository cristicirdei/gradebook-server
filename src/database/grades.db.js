var mysql = require("mysql");

export function getClassGradesData(classId, callback) {
  let array1 = [];
  let gradeList = [];
  let gradeSheet = [];
  let nameList = [];

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });

  con.connect(function (err) {
    if (err) throw err;
    var command0 = `SELECT name,ID as id FROM class WHERE ID = ${classId};`;
    var command = `SELECT DISTINCT gradeName FROM grade WHERE classID = ${classId};`;
    var command2 = `SELECT fullName,gradeName,value FROM grade WHERE classID = ${classId}`;
    con.query(
      mysql.format(command0 + command + command2),
      function (err, result, fields) {
        if (err) throw err;
        let classinfo = Object.values(JSON.parse(JSON.stringify(result[0][0])));
        let gradeNames = Object.values(JSON.parse(JSON.stringify(result[1])));
        let marks = Object.values(JSON.parse(JSON.stringify(result[2])));

        marks.forEach(function (item) {
          if (nameList.includes(item.fullName) == false)
            nameList.push(item.fullName);
        });
        gradeNames.forEach((item) => array1.push(item.gradeName));
        nameList.forEach((item) => {
          marks.forEach(function (element) {
            if (element.fullName == item) {
              gradeList.push({
                name: element.gradeName,
                value: element.value
              });
            }
          });
          gradeSheet.push({
            name: item,
            grades: gradeList
          });
          gradeList = [];
        });

        let final = {
          name: classinfo[0],
          id: classinfo[1],
          grades: array1,
          students: gradeSheet
        };

        if (final.length == 0) {
          callback(err, "Object not found!");
        } else {
          callback(null, final);
        }
      }
    );

    con.end();
  });
}

export function postNewGradeData(obj, callback) {
  let enrolled = [];
  let marked = obj.values;
  let names = [];
  marked.forEach((grade) => {
    names.push(grade.student);
  });

  getEnrollments(obj.class, function (err, data) {
    if (err) {
      console.log("ERROR : ", err);
    } else {
      console.log(data);
      enrolled = data;
      var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "fulger2001",
        database: "gradebook",
        multipleStatements: "True"
      });

      con.connect(function (err) {
        if (err) throw err.message;
        let command = "";
        enrolled.forEach((item) => {
          if (names.includes(item.fullName)) {
            var person = marked.find((mark) => mark.student === item.fullName);
            command =
              command +
              `INSERT INTO grade (value,gradeName,classID,studentID,fullName) VALUES (${person.value},'${obj.gradeName}',${obj.class},${item.studentID},'${item.fullName}');`;
            console.log(command);
          } else {
            command =
              command +
              `INSERT INTO grade (value,gradeName,classID,studentID,fullName) VALUES (${null},'${
                obj.gradeName
              }',${obj.class},${item.studentID},'${item.fullName}');`;
            console.log(command);
          }
        });
        command.slice(0, -1);
        var sql = mysql.format(command);
        con.query(sql, function (err, result, fields) {
          if (err) {
            callback(err, "Object not inserted!");
          } else {
            callback(null, "Object inserted!");
          }
        });

        con.end();
      });
    }
  });
}

export function postModifiedGradesData(obj, callback) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });

  con.connect(function (err) {
    if (err) throw err;
    let command = "";
    obj.changes.forEach((item) => {
      command =
        command +
        `UPDATE grade SET value = '${item.value}' WHERE gradeName = '${item.grade}' AND fullName = '${item.student}' AND classID = ${obj.class};`;
    });
    command.slice(0, -1);
    var sql = mysql.format(command);
    con.query(sql, function (err, result, fields) {
      if (err) {
        callback(err, "Object not inserted!");
      } else {
        callback(null, "Object inserted!");
      }
    });

    con.end();
  });
}

function getEnrollments(classID, callback) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "fulger2001",
    database: "gradebook",
    multipleStatements: "True"
  });

  con.connect(function (err) {
    if (err) throw err.message;
    var sql = mysql.format(
      'SELECT CONCAT(student.name," ",student.surname) as fullName,classID,studentID FROM gradebook.enrollment INNER JOIN student ON enrollment.studentID = student.ID WHERE classID = ?',
      [classID]
    );
    con.query(sql, function (err, result, fields) {
      if (err) callback(err, null);
      else {
        callback(null, Object.values(JSON.parse(JSON.stringify(result))));
      }
    });
    con.end();
  });
}
