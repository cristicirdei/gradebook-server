export const getClassGrades = async (req, res, next) => {
  const grades = [
    {
      name: "Math 9B",
      id: 1,
      grades: ["Test 1", "Test2"],
      students: [
        {
          name: "Alberto Wilkinson",
          grades: [
            { name: "Test 1", value: 10 },
            { name: "Test 2", value: 6 }
          ]
        },
        {
          name: "Dwight Bruen",
          grades: [
            { name: "Test 1", value: 7 },
            { name: "Test 2", value: 5 }
          ]
        },
        {
          name: "Clay Blanda",
          grades: [
            { name: "Test 1", value: 8 },
            { name: "Test 2", value: 6 }
          ]
        },
        {
          name: "Eunice Steuber",
          grades: [
            { name: "Test 1", value: 7 },
            { name: "Test 2", value: 4 }
          ]
        },
        {
          name: "Erik Koss",
          grades: [
            { name: "Test 1", value: 6 },
            { name: "Test 2", value: 8 }
          ]
        }
      ]
    },
    {
      name: "English 9B",
      id: 2,
      grades: ["Test 1", "Homework 1", "Homework 2"],
      students: [
        {
          name: "Alberto Wilkinson",
          grades: [
            { name: "Test 1", value: 10 },
            { name: "Homework 1", value: 7 },
            { name: "Homework 2", value: 9 }
          ]
        },
        {
          name: "Dwight Bruen",
          grades: [
            { name: "Test 1", value: 8 },
            { name: "Homework 1", value: 5 },
            { name: "Homework 2", value: 6 }
          ]
        },
        {
          name: "Clay Blanda",
          grades: [
            { name: "Test 1", value: 10 },
            { name: "Homework 1", value: 10 },
            { name: "Homework 2", value: 8 }
          ]
        },
        {
          name: "Eunice Steuber",
          grades: [
            { name: "Test 1", value: 7 },
            { name: "Homework 1", value: 4 },
            { name: "Homework 2", value: 10 }
          ]
        },
        {
          name: "Erik Koss",
          grades: [
            { name: "Test 1", value: 6 },
            { name: "Homework 1", value: 7 },
            { name: "Homework 2", value: 7 }
          ]
        }
      ]
    }
  ];

  const data = grades.find((g) => g.id === parseInt(req.params.class));

  return res.status(200).send(data);
};

export const getStudentGrades = async (req, res, next) => {
  return res.status(200).send("grades :)");
};
