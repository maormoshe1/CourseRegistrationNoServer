import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import PastTakenCourseItem from "./PastTakenCourseItem";
import Course from "../../Types/Course";
import dayjs from "dayjs";
import { List, ListItem, Box, Typography } from "@mui/material";

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
        {pastTakenCourses.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="body2" color="textSecondary">
              אין קורסים להצגה
            </Typography>
          </Box>
        ) : (
          pastTakenCourses.map((pastTakenCourse) => (
            <ListItem
              sx={{ borderBottom: 1, borderColor: "divider" }}
              key={pastTakenCourse.name}
              disablePadding
            >
              <PastTakenCourseItem PastTakenCourse={pastTakenCourse} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default PastTakenCoursesList;
