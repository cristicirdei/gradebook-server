export const getAllStudents = async (req, res, next) => {
  const data = {
    institution: req.params.institution,
    payload: [
      { name: "Alberto Wilkinson", id: 1 },
      { name: "Dwight Bruen", id: 2 },
      { name: "Clay Blanda", id: 3 },
      { name: "Eunice Steuber", id: 4 },
      { name: "Erik Koss", id: 5 }
    ]
  };
  return res.status(200).send(data);
};

export const getSpecificStudent = async (req, res, next) => {
  const students = [
    {
      name: "Alberto Wilkinson",
      id: 1,
      nr: 1201,
      age: 17,
      classes: ["Math 9B", "English 9B"],
      grades: [
        {
          name: "Math 9B",
          values: [
            { name: "Test 1", value: 7 },
            { name: "Test 2", value: 4 }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "Test 1", value: 10 },
            { name: "Homework 1", value: 9 },
            { name: "Homework 2", value: 7 }
          ]
        }
      ],
      attendance: [
        {
          name: "Math 9B",
          values: [
            { name: "21.11.22", value: "Absent" },
            { name: "28.11.22", value: "Motivated" },
            { name: "5.12.22", value: "Present" }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "22.11.22", value: "Present" },
            { name: "29.11.22", value: "Present" }
          ]
        }
      ]
    },
    {
      name: "Dwight Bruen",
      id: 2,
      nr: 1202,
      age: 17,
      classes: ["Math 9B", "English 9B"],
      grades: [
        {
          name: "Math 9B",
          values: [
            { name: "Test 1", value: 8 },
            { name: "Test 2", value: 9 }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "Test 1", value: 5 },
            { name: "Homework 1", value: 9 },
            { name: "Homework 2", value: 5 }
          ]
        }
      ],
      attendance: [
        {
          name: "Math 9B",
          values: [
            { name: "21.11.22", value: "Absent" },
            { name: "28.11.22", value: "Present" },
            { name: "5.12.22", value: "Present" }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "22.11.22", value: "Present" },
            { name: "29.11.22", value: "Present" }
          ]
        }
      ]
    },
    {
      name: "Clay Blanda",
      id: 3,
      nr: 1203,
      age: 17,
      classes: ["Math 9B", "English 9B"],
      grades: [
        {
          name: "Math 9B",
          values: [
            { name: "Test 1", value: 7 },
            { name: "Test 2", value: 4 }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "Test 1", value: 10 },
            { name: "Homework 1", value: 9 },
            { name: "Homework 2", value: 7 }
          ]
        }
      ],
      attendance: [
        {
          name: "Math 9B",
          values: [
            { name: "21.11.22", value: "Absent" },
            { name: "28.11.22", value: "Motivated" },
            { name: "5.12.22", value: "Present" }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "22.11.22", value: "Present" },
            { name: "29.11.22", value: "Present" }
          ]
        }
      ]
    },
    {
      name: "Eunice Steuber",
      id: 4,
      nr: 1204,
      age: 17,
      classes: ["Math 9B", "English 9B"],
      grades: [
        {
          name: "Math 9B",
          values: [
            { name: "Test 1", value: 7 },
            { name: "Test 2", value: 4 }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "Test 1", value: 10 },
            { name: "Homework 1", value: 9 },
            { name: "Homework 2", value: 7 }
          ]
        }
      ],
      attendance: [
        {
          name: "Math 9B",
          values: [
            { name: "21.11.22", value: "Absent" },
            { name: "28.11.22", value: "Motivated" },
            { name: "5.12.22", value: "Present" }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "22.11.22", value: "Present" },
            { name: "29.11.22", value: "Present" }
          ]
        }
      ]
    },
    {
      name: "Erik Koss",
      id: 5,
      nr: 1205,
      age: 17,
      classes: ["Math 9B", "English 9B"],
      grades: [
        {
          name: "Math 9B",
          values: [
            { name: "Test 1", value: 7 },
            { name: "Test 2", value: 4 }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "Test 1", value: 10 },
            { name: "Homework 1", value: 9 },
            { name: "Homework 2", value: 7 }
          ]
        }
      ],
      attendance: [
        {
          name: "Math 9B",
          values: [
            { name: "21.11.22", value: "Absent" },
            { name: "28.11.22", value: "Motivated" },
            { name: "5.12.22", value: "Present" }
          ]
        },
        {
          name: "English 9B",
          values: [
            { name: "22.11.22", value: "Present" },
            { name: "29.11.22", value: "Present" }
          ]
        }
      ]
    }
  ];

  const data = students[parseInt(req.params.id) - 1];

  return res.status(200).send(data);
};

export const postStudent = async (req, res, next) => {
  console.log(req.body);
  const data = {
    institution: req.params.institution,
    body: req.body
  };
  return res.status(200).send(data);
};

export const postStudents = async (req, res, next) => {
  return res
    .status(200)
    .send("post multiple student at class " + req.params.class);
};
