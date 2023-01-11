import {
  getClassGradesData,
  postNewGradeData,
  postModifiedGradesData
} from "../database/grades.db";

export const getClassGrades = async (req, res, next) => {
  getClassGradesData(req.params.class, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};

export const getStudentGrades = async (req, res, next) => {
  return res.status(200).send("grades :)");
};

export const postNewGrade = async (req, res, next) => {
  console.log("i've been called", req.body);
  postNewGradeData(req.body, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};

export const postModifiedGrade = async (req, res, next) => {
  console.log("i've been called");
  postModifiedGradesData(req.body, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};
