import {
  getAllStudentsData,
  getSpecificStudentData,
  postStudentData
} from "../database/student.db";

export const getAllStudents = async (req, res, next) => {
  getAllStudentsData(req.params.institution, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};

export const getSpecificStudent = async (req, res, next) => {
  getSpecificStudentData(req.params.id, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};

export const postStudent = async (req, res, next) => {
  postStudentData(req.params.institution, req.body, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};

export const postStudents = async (req, res, next) => {
  return res
    .status(200)
    .send("post multiple student at class " + req.params.class);
};
