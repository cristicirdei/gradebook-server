export const getClassAttendance = async (req, res, next) => {
  const attendance = [
    {
      name: "Math 9B",
      id: 1,
      dates: ["22.11.22", "29.11.22"],
      students: [
        {
          name: "Alberto Wilkinson",
          att: [
            { name: "22.11.22", value: "Absent" },
            { name: "29.11.22", value: "Present" }
          ]
        },
        {
          name: "Dwight Bruen",
          att: [
            { name: "22.11.22", value: "Absent" },
            { name: "29.11.22", value: "Absent" }
          ]
        },
        {
          name: "Clay Blanda",
          att: [
            { name: "22.11.22", value: "Present" },
            { name: "29.11.22", value: "Present" }
          ]
        },
        {
          name: "Eunice Steuber",
          att: [
            { name: "22.11.22", value: "Absent" },
            { name: "29.11.22", value: "Motivated" }
          ]
        },
        {
          name: "Erik Koss",
          att: [
            { name: "22.11.22", value: "Present" },
            { name: "29.11.22", value: "Present" }
          ]
        }
      ]
    },
    {
      name: "English 9B",
      id: 2,
      dates: ["22.11.22", "29.11.22", "05.12.22"],
      students: [
        {
          name: "Alberto Wilkinson",
          att: [
            { name: "21.11.22", value: "Absent" },
            { name: "28.11.22", value: "Present" },
            { name: "5.12.22", value: "Present" }
          ]
        },
        {
          name: "Dwight Bruen",
          att: [
            { name: "21.11.22", value: "Present" },
            { name: "28.11.22", value: "Present" },
            { name: "5.12.22", value: "Present" }
          ]
        },
        {
          name: "Clay Blanda",
          att: [
            { name: "21.11.22", value: "Present" },
            { name: "28.11.22", value: "Present" },
            { name: "5.12.22", value: "Present" }
          ]
        },
        {
          name: "Eunice Steuber",
          att: [
            { name: "21.11.22", value: "Absent" },
            { name: "28.11.22", value: "Present" },
            { name: "5.12.22", value: "Present" }
          ]
        },
        {
          name: "Erik Koss",
          att: [
            { name: "21.11.22", value: "Present" },
            { name: "28.11.22", value: "Motivated" },
            { name: "5.12.22", value: "Present" }
          ]
        }
      ]
    }
  ];

  const data = attendance.find((g) => g.id === parseInt(req.params.class));

  return res.status(200).send(data);
};

export const getStudentAttendance = async (req, res, next) => {
  return res.status(200).send("attendance :)");
};

export const postNewAtt = async (req, res, next) => {
  console.log(req.body);
  const data = {
    class: req.params.class,
    body: req.body
  };
  return res.status(200).send(data);
};

export const postModifiedAtt = async (req, res, next) => {
  console.log(req.body);
  const data = {
    class: req.params.class,
    body: req.body
  };
  return res.status(200).send(data);
};
