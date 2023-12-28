import React, { useState, useEffect, useContext } from "react";
import SelectCourseDate from "./SelectCourseDate";
import Course from "../../Types/Course";
import { CoursesContext } from "../../CoursesContext";
import Typography from "@mui/material/Typography";
import { List, ListItem, Tooltip } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import InfoIcon from "@mui/icons-material/Info";

type CourseItemProps = {
  course: Course;
};

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const coursesContext = useContext(CoursesContext);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [disableCheckButton, setDisableCheckButton] = useState<boolean>(true);
  const [explanation, setExplanation] = useState<string>("בחר תאריך");

  const chosenCourses = coursesContext!.chosenCourses;
  const takenCourses = coursesContext!.takenCourses
  useEffect(() => {
    let isChosen: boolean = chosenCourses.some(
      (chosenCourse) => chosenCourse.id === course.id
    );
    let isTaken:boolean = takenCourses.some(
      (takenCourse) => takenCourse.id === course.id
    );
    if (pickedDate === null) {
      if (!isChosen && !isTaken ) {
        setIsChecked(false)
        setExplanation("בחר תאריך");
      } else {
        setIsChecked(true)
        setExplanation("הקורס נבחר");
      }     
      setDisableCheckButton(true)
    }
    else if (!isChosen && !isTaken ) {
      setIsChecked(false);
      setExplanation("")
      setDisableCheckButton(false)
    } else {
      setIsChecked(true);
      setExplanation("הקורס נבחר");
      setDisableCheckButton(true);
    }
  }, [chosenCourses, takenCourses, pickedDate]);

  const handleCheckboxChange = () => {
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
            <Checkbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              color="primary"
              disabled={disableCheckButton}
            />
          </span>
        </Tooltip>
        <Typography sx={{ fontSize: "1.1em" }} color="text.secondary">
          {course.name}
        </Typography>
      </ListItem>
      <ListItem sx={{ marginTop: "-2em", paddingLeft: "3.5em" }}>
        <SelectCourseDate
          dates={course.dates}
          setPickedDate={setPickedDate}
        />
        <Tooltip title={course.info} placement="top">
          <InfoIcon sx={{ marginLeft: "auto", marginTop: "auto" }} />
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default CourseItem;
