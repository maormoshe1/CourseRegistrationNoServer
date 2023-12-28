import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import FutureTakenCourseItem from "./FutureTakenCourseItem";
import dayjs from "dayjs";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Course from "../../Types/Course";

const FutureTakenCoursesList: React.FC<{}> = () => {
  const takenCourses: Course[] = useContext(CoursesContext)!.takenCourses;
  const futureTakenCourses: Course[] = takenCourses.filter((course) =>
    dayjs(course.dates[0]).isAfter(dayjs())
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
        {futureTakenCourses.map((futureTakenCourse) => (
          <ListItem
            sx={{ borderBottom: 1, borderColor: "divider" }}
            key={futureTakenCourse.name}
            disablePadding
          >
            <FutureTakenCourseItem furureTakenCourse={futureTakenCourse} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FutureTakenCoursesList;
