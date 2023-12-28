import Typography from "@mui/material/Typography";
import Course from "../../Types/Course";
import { Button, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";

type ChosenCourseItemProps = {
  chosenCourse: Course;
};

const ChosenCourseItem: React.FC<ChosenCourseItemProps> = ({
  chosenCourse,
}) => {
  const coursesContext = useContext(CoursesContext);
  const date: string = chosenCourse.dates[0].toLocaleDateString();

  const handleOnClick = () => {
    coursesContext?.deleteChosenCourse(chosenCourse.id);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "10em",
      }}
    >
      <ListItem disablePadding>
        <Button onClick={handleOnClick} sx={{ color: "black" }}>
          <DeleteIcon />
        </Button>
        <ListItemText primary={chosenCourse.name} />
      </ListItem>
      <ListItem sx={{ paddingLeft: "4em" }}>
        <Typography sx={{ fontSize: "1em" }} color="text.secondary">
          {date}
        </Typography>
        <Tooltip title={chosenCourse.info} placement="top">
          <InfoIcon sx={{ marginLeft: "auto", marginTop: "auto" }} />
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default ChosenCourseItem;
