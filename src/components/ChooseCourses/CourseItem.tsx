import React, { useState, useEffect, useContext } from "react";
import SelectCourseDate from "./SelectCourseDate";
import Course from "../../Types/Course";
import { CoursesContext } from "../../CoursesContext";
import Typography from "@mui/material/Typography";
import { IconButton, List, ListItem, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

type CourseItemProps = {
  course: Course;
};

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const coursesContext = useContext(CoursesContext);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [disableAddButton, setDisableAddButton] = useState<boolean>(true);
  const [explanation, setExplanation] = useState<string>("בחר תאריך");

  const chosenCourses = coursesContext!.chosenCourses;
  const takenCourses = coursesContext!.takenCourses;
  useEffect(() => {
    let isChosen: boolean = chosenCourses.some(
      (chosenCourse) => chosenCourse.id === course.id
    );
    let isTaken: boolean = takenCourses.some(
      (takenCourse) => takenCourse.id === course.id
    );
    if (pickedDate === null) {
      if (!isChosen && !isTaken) {
        setExplanation("בחר תאריך");
      } else {
        setExplanation("הקורס נבחר");
      }
      setDisableAddButton(true);
    } else if (!isChosen && !isTaken) {
      setExplanation("");
      setDisableAddButton(false);
    } else {
      setExplanation("הקורס נבחר");
      setDisableAddButton(true);
    }
  }, [chosenCourses, takenCourses, pickedDate]);

  const handleChange = () => {
    let chosenCourse: Course = { ...course };
    chosenCourse.dates = [pickedDate!];
    coursesContext?.addChosenCourse(chosenCourse);
  };
  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "10em",
      }}
    >
      <ListItem>
        <Tooltip title={explanation} placement="top">
          <span>
            <IconButton
              onClick={handleChange}
              disabled={disableAddButton}
              color="primary"
              sx={{ marginRight: "0.5em" }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Typography sx={{ fontSize: "1.1em" }} color="text.secondary">
          {course.name}
        </Typography>
      </ListItem>
      <ListItem sx={{ marginTop: "-2em", paddingLeft: "4em" }}>
        <SelectCourseDate dates={course.dates} setPickedDate={setPickedDate} />
        <Tooltip title={course.info} placement="top">
          <InfoIcon sx={{ marginLeft: "auto", marginTop: "auto" }} />
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default CourseItem;
