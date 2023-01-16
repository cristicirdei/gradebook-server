import {
  getAllClassesData,
  getSpecificClassData,
  getTeacherClassesData,
  postClassData
} from "../database/classes.db";

export const getSpecificClass = async (req, res, next) => {
  getSpecificClassData(req.params.id, function (err, result) {
    return res.status(200).send(result);
  });
};

export const getAllClasses = async (req, res, next) => {
  getAllClassesData(req.params.institution, function (err, result) {
    return res.status(200).send(result);
  });
};

export const getTeacherClasses = async (req, res, next) => {
  getTeacherClassesData(req.params.teacher, function (err, result) {
    return res.status(200).send(result);
  });
};

export const postClass = async (req, res, next) => {
  postClassData(req.params.institution, req.body, function (err, result) {
    return res.status(200).send(result);
  });
};
