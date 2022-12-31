export const getAllTeachers = async (req, res, next) => {
  const data = {
    institution: req.params.institution,
    payload: [
      { name: "Antonia Kulas", id: 1, nr: 3003, classes: ["Math 9B"] },
      { name: "Samantha Schinner", id: 2, nr: 3017, classes: ["English 9B"] }
    ]
  };
  return res.status(200).send(data);
};

export const getSpecificTeacher = async (req, res, next) => {
  const teachers = [
    { name: "Antonia Kulas", id: 1, nr: 3003, classes: ["Math 9B"] },
    { name: "Samantha Schinner", id: 2, nr: 3017, classes: ["English 9B"] }
  ];

  const data = teachers[parseInt(req.params.id) - 1];
  return res.status(200).send(data);
};

export const postTeacher = async (req, res, next) => {
  console.log(req.body);
  const data = {
    institution: req.params.institution,
    body: req.body
  };
  return res.status(200).send(data);
};
