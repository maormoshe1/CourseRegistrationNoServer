import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import PastTakenCourseItem from "./PastTakenCourseItem";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Course from "../../Types/Course";

const PastTakenCoursesList: React.FC<{}> = () => {
  const takenCourses: Course[] = useContext(CoursesContext)!.takenCourses;
  const pastTakenCourses: Course[] = takenCourses.filter(
    (course) => !dayjs(course.dates[0]).isAfter(dayjs())
  );
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "0.75em",
        overflow: "hidden",
      }}
    >
      <List style={{ maxHeight: "28em", overflow: "auto" }}>
        {pastTakenCourses.map((pastTakenCourse) => (
          <ListItem
            sx={{ borderBottom: 1, borderColor: "divider" }}
            key={pastTakenCourse.name}
            disablePadding
          >
            <PastTakenCourseItem PastTakenCourse={pastTakenCourse} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PastTakenCoursesList;
