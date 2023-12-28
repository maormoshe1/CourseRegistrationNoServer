import { useContext } from "react";
import Course from "../../Types/Course";
import { CoursesContext } from "../../CoursesContext";
import Typography from "@mui/material/Typography";
import { Button, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

type FutureTakenCourseItemProps = {
  furureTakenCourse: Course;
};

const FutureTakenCourseItem: React.FC<FutureTakenCourseItemProps> = ({
  furureTakenCourse,
}) => {
  const date: string = furureTakenCourse.dates[0].toLocaleDateString();
  const deleteTakenCourse = useContext(CoursesContext)!.deleteTakenCourse;

  const handleOnClick = () => {
    deleteTakenCourse(furureTakenCourse.id);
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
        <ListItemText primary={furureTakenCourse.name} />
      </ListItem>
      <ListItem sx={{ paddingLeft: "4em" }}>
        <Typography sx={{ fontSize: "1em" }} color="text.secondary">
          {date}
        </Typography>
        <Tooltip title={furureTakenCourse.info} placement="top">
          <InfoIcon sx={{ marginLeft: "auto", marginTop: "auto" }} />
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default FutureTakenCourseItem;
