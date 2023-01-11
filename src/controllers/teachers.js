import {
  getAllTeachersData,
  getSpecificTeacherData,
  postTeacherData
} from "../database/teacher.db";
import { hashPassword } from "../util/hashPassword";

export const getAllTeachers = async (req, res, next) => {
  getAllTeachersData(req.params.institution, function (err, result) {
    console.log("result ", result);
    return res.status(200).send(result);
  });
};

export const getSpecificTeacher = async (req, res, next) => {
  getSpecificTeacherData(req.params.id, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};

export const postTeacher = async (req, res, next) => {
  const { name, email, surname, nr, age } = req.body;
  const password = await hashPassword(req.body.password);
  const user = {
    name: name,
    surname: surname,
    nr: nr,
    age: age,
    email: email,
    password: password
  };

  postTeacherData(req.params.institution, user, function (err, result) {
    console.log(result);
    return res.status(200).send(result);
  });
};
