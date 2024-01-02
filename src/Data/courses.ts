import Course from "../Types/Course";

let courses: Course[] = [
  {
    id: 1,
    name: "אינפי 1",
    dates: [new Date("2024-10-25"), new Date("2024-10-24")],
    info: "רק בשעות הבוקר",
  },
  {
    id: 2,
    name: "אינפי 2",
    dates: [new Date("2024-02-19")],
    info: "תנאי קדם: אינפי 1",
  },
  {
    id: 3,
    name: "בדידה 1",
    dates: [new Date("2024-10-25")],
    info: "רק בשעות הערב",
  },
  {
    id: 4,
    name: "בדידה 2",
    dates: [new Date("2024-02-23")],
    info: "תנאי קדם: בדידה 1",
  },
  {
    id: 5,
    name: "אלגו 1",
    dates: [new Date("2023-02-23")],
    info: "אין מידע",
  },
  {
    id: 6,
    name: "אלגו 2",
    dates: [new Date("2023-12-23")],
    info: "תנאי קדם:אלגו 1",
  },
];

export default courses;
