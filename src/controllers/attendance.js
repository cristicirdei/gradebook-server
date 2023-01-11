import {
  getClassAttendanceData,
  postModifiedAttendanceData,
  postNewAttendanceData
} from "../database/attendance.db";

export const getClassAttendance = async (req, res, next) => {
  getClassAttendanceData(req.params.class, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};

export const getStudentAttendance = async (req, res, next) => {
  return res.status(200).send("attendance :)");
};

export const postNewAtt = async (req, res, next) => {
  console.log("i've been called");
  postNewAttendanceData(req.body, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};

export const postModifiedAtt = async (req, res, next) => {
  console.log("i've been called");
  postModifiedAttendanceData(req.body, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};
