import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import FutureTakenCourseItem from "./FutureTakenCourseItem";
import Course from "../../Types/Course";
import dayjs from "dayjs";
import { List, ListItem, Box, Typography } from "@mui/material";

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
        {futureTakenCourses.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="body2" color="textSecondary">
              אין קורסים להצגה
            </Typography>
          </Box>
        ) : (
          futureTakenCourses.map((futureTakenCourse) => (
            <ListItem
              sx={{ borderBottom: 1, borderColor: "divider" }}
              key={futureTakenCourse.name}
              disablePadding
            >
              <FutureTakenCourseItem furureTakenCourse={futureTakenCourse} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default FutureTakenCoursesList;
