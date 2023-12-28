import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import Course from "../../Types/Course";
import CourseItem from "./CourseItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

type AllCoursesProps = {
  nameFilter: string;
};

const AllCoursesList: React.FC<AllCoursesProps> = ({ nameFilter }) => {
  const coursesContext = useContext(CoursesContext);
  const filterCourses = (nameFilter: string) => {
    return coursesContext!.allCourses.filter((course) =>
      course.name.includes(nameFilter)
    );
  };
  const filteredCourses: Course[] = filterCourses(nameFilter);
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
        {filteredCourses.map((course) => (
          <ListItem
            sx={{ borderBottom: 1, borderColor: "divider" }}
            key={course.name}
            disablePadding
          >
            <CourseItem course={course} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AllCoursesList;
