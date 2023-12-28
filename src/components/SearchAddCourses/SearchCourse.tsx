import { useState, ChangeEvent, useContext, useEffect } from "react";
import Course from "../../Types/Course";
import { CoursesContext } from "../../CoursesContext";
import { Dayjs } from "dayjs";
import "dayjs/locale/he";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

type RegistrationProps = {
  setNameFilter: (nameFilter: string) => void;
};

const SearchCourse: React.FC<RegistrationProps> = ({ setNameFilter }) => {
  const coursesContext = useContext(CoursesContext);
  const [courseName, setCourseName] = useState<string>("");
  const [courseDate, setCourseDate] = useState<Dayjs | null>(null);
  const [disableAddButton, setDisableAddButton] = useState<boolean>(true);
  const [explanation, setExplanation] = useState<string>("מלא את השדות");

  const allCourses: Course[] = coursesContext!.allCourses;
  useEffect(() => {
    setNameFilter(courseName);
  }, [allCourses]);

  useEffect(() => {
    setDisableAddButton(true);
    if (courseName === "") {
      setExplanation("מלא את השדות");
    } else if (!courseDate?.isValid()) {
      setExplanation("התאריך אינו חוקי");
    } else if (findCourseByName(courseName)) {
      let inputDate: Date = courseDate.toDate();
      let dates: Date[] = findCourseByName(courseName)!.dates;
      if (isDateInArray(inputDate, dates)) {
        setExplanation("התאריך קיים");
      } else {
        setExplanation("");
        setDisableAddButton(false);
      }
    } else {
      setExplanation("");
      setDisableAddButton(false);
    }
  }, [courseDate, courseName]);

  const isDateInArray = (targetDate: Date, dateArray: Date[]) => {
    return dateArray.find(
      (date) => date.toLocaleDateString() === targetDate.toLocaleDateString()
    );
  };

  const findCourseByName = (name: string) => {
    return allCourses.find((course) => course.name === name);
  };

  const createCourse = () => {
    let newId: number = allCourses.length + 1;
    let newDates: Date[] = [courseDate!.toDate()];
    let newCourse: Course = {
      id: newId,
      name: courseName,
      dates: newDates,
      info: "",
    };
    return newCourse;
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    let name: string = event.target.value;
    setCourseName(name);
    setNameFilter(name);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setCourseDate(date);
  };

  const handleClick = () => {
    if (findCourseByName(courseName)) {
      let newDate: Date = courseDate!.toDate();
      coursesContext?.addNewDate(newDate, courseName);
    } else {
      let newCourse: Course = createCourse();
      coursesContext?.addNewCourse(newCourse);
    }
    setDisableAddButton(true);
  };

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
              onClick={handleClick}
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
