import { useState, ChangeEvent, useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import Course from "../../Types/Course";
import { Dayjs } from "dayjs";
import "dayjs/locale/he";
import {
  TextField,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Tooltip,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

type RegistrationProps = {
  courseName: string;
  setCourseName: (courseName: string) => void;
};

const SearchCourse: React.FC<RegistrationProps> = ({
  courseName,
  setCourseName,
}) => {
  const coursesContext = useContext(CoursesContext);
  const [courseDate, setCourseDate] = useState<Dayjs | null>(null);
  const allCourses: Course[] = coursesContext!.allCourses;

  let explanation: string = "";
  let disableAddButton = true;

  const isDateInArray = (targetDate: Date, dateArray: Date[]) => {
    return dateArray.find(
      (date) => date.toLocaleDateString() === targetDate.toLocaleDateString()
    );
  };

  const findCourseByName = (name: string) => {
    return allCourses.find((course) => course.name === name);
  };

  const handleExplanationAndDisable = () => {
    if (courseName === "") {
      explanation = "מלא את השדות";
    } else if (!courseDate?.isValid()) {
      explanation = "התאריך אינו חוקי";
    } else if (findCourseByName(courseName)) {
      let inputDate: Date = courseDate.toDate();
      let dates: Date[] = findCourseByName(courseName)!.dates;
      if (isDateInArray(inputDate, dates)) {
        explanation = "התאריך קיים";
      } else {
        disableAddButton = false;
      }
    } else {
      disableAddButton = false;
    }
  };

  const createCourse = (courseName: string, courseDate: Date) => {
    let newId: number = allCourses.length + 1;
    let newDates: Date[] = [courseDate];
    let newCourse: Course = {
      id: newId,
      name: courseName,
      dates: newDates,
      info: "אין מידע",
    };
    return newCourse;
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    let name: string = event.target.value;
    setCourseName(name);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setCourseDate(date);
  };

  const addCourseToList = (courseName: string, courseDate: Date) => {
    if (findCourseByName(courseName)) {
      coursesContext?.addNewDate(courseName, courseDate);
    } else {
      let newCourse: Course = createCourse(courseName, courseDate);
      coursesContext?.addNewCourse(newCourse);
    }
    disableAddButton = true;
  };

  handleExplanationAndDisable();

  return (
    <Card>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "2em" }} color="text.secondary">
          רישום לקורסים
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: "1em", width: "10em" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="שם קורס"
            variant="outlined"
            onChange={handleNameChange}
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
          <DatePicker
            value={courseDate}
            format="DD/MM/YYYY"
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Tooltip title={explanation}>
          <span>
            <Button
              variant="contained"
              onClick={() => addCourseToList(courseName, courseDate!.toDate())}
              disabled={disableAddButton}
            >
              הוסף
            </Button>
          </span>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default SearchCourse;
