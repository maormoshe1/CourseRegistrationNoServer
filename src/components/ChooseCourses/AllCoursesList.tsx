import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import Course from "../../Types/Course";
import CourseItem from "./CourseItem";
import { List, ListItem, Box, Typography } from "@mui/material";

type AllCoursesProps = {
  courseName: string;
};

const AllCoursesList: React.FC<AllCoursesProps> = ({ courseName }) => {
  const coursesContext = useContext(CoursesContext);
  const filterCourses = (courseName: string) => {
    return coursesContext!.allCourses.filter((course) =>
      course.name.includes(courseName)
    );
  };
  const filteredCourses: Course[] = filterCourses(courseName);
  return (
    <Box
      sx={{
        width: "100%",
        background: "white",
        borderRadius: "0.75em",
        overflow: "hidden",
      }}
    >
      <List style={{ minHeight: "20em", maxHeight: "20em", overflow: "auto" }}>
        {filteredCourses.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="body2" color="textSecondary">
              אין קורסים להצגה
            </Typography>
          </Box>
        ) : (
          filteredCourses.map((course) => (
            <ListItem
              sx={{ borderBottom: 1, borderColor: "divider" }}
              key={course.name}
              disablePadding
            >
              <CourseItem course={course} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default AllCoursesList;
