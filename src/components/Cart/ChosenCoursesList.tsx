import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import ChosenCourseItem from "./ChosenCourseItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";

const ChosenCoursesList: React.FC<{}> = ({}) => {
  const coursesContext = useContext(CoursesContext);
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <List style={{ minHeight: "20em", maxHeight: "20em", overflow: "auto" }}>
        {coursesContext?.chosenCourses.map((chosenCourse) => (
          <ListItem
            sx={{ borderBottom: 1, borderColor: "divider" }}
            key={chosenCourse.name}
            disablePadding
          >
            <ChosenCourseItem chosenCourse={chosenCourse} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChosenCoursesList;
