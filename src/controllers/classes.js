export const getSpecificClass = async (req, res, next) => {
  const classes = [
    {
      name: "Math 9B",
      id: 1,
      subject: "Math",
      teacher: "Antonia Kulas",
      description: "9th grade algebra",
      students: [
        "Alberto Wilkinson",
        "Dwight Bruen",
        "Clay Blanda",
        "Eunice Steuber",
        "Erik Koss"
      ]
    },
    {
      name: "English 9B",
      id: 2,
      subject: "English",
      teacher: "Samantha Schinner",
      description: "9th grade english lit",
      students: [
        "Alberto Wilkinson",
        "Dwight Bruen",
        "Clay Blanda",
        "Eunice Steuber",
        "Erik Koss"
      ]
    }
  ];
  const data = classes[parseInt(req.params.id) - 1];
  return res.status(200).send(data);
};

export const getAllClasses = async (req, res, next) => {
  const data = {
    institution: req.params.institution,
    payload: [
      {
        name: "Math 9B",
        id: 1,
        students: 5,
        teacher: "Antonia Kulas"
      },
      {
        name: "English 9B",
        id: 2,
        students: 5,
        teacher: "Samantha Schinner"
      }
    ]
  };
  return res.status(200).send(data);
};

export const getTeacherClasses = async (req, res, next) => {
  const classes = [
    {
      name: "Math 9B",
      id: 1,
      students: 5,
      teacher: "Antonia Kulas"
    },
    {
      name: "English 9B",
      id: 2,
      students: 5,
      teacher: "Samantha Schinner"
    }
  ];
  const data_ = classes.filter(
    (c) => c.teacher === req.params.teacher.toString()
  );

  const data = {
    teacher: req.params.teacher,
    payload: data_
  };

  return res.status(200).send(data);
};

export const postClass = async (req, res, next) => {
  console.log(req.body);
  const data = {
    institution: req.params.institution,
    body: req.body
  };
  return res.status(200).send(data);
};
