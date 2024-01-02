import { useContext, useState } from "react";
import { CoursesContext } from "../../CoursesContext";
import ChosenCoursesList from "./ChosenCoursesList";
import Course from "../../Types/Course";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";

const Cart: React.FC<{}> = ({}) => {
  console.log(`render cart.tsx`);
  const coursesContext = useContext(CoursesContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const chosenCourses: Course[] = coursesContext!.chosenCourses;
  const disableAddButton: boolean = chosenCourses.length === 0;

  const registerForCourses = () => {
    chosenCourses.forEach((chosenCourse) =>
      coursesContext?.addTakenCourse(chosenCourse)
    );
    setIsLoading(true);
    setTimeout(() => {
      coursesContext?.clearChosenCourses();
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const closeSnackbar = () => {
    setIsSuccess(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minWidth: "20em",
        minHeight: "28em",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            סלסלה
          </Typography>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ position: "absolute", paddingTop: "5vh", width: "100%" }}
      >
        <Alert onClose={closeSnackbar} severity="success">
          נרשמת בהצלחה
        </Alert>
      </Snackbar>
      <ChosenCoursesList />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          onClick={registerForCourses}
          sx={{ marginTop: "1vh", marginBottom: "1vh", width: "5em" }}
          disabled={disableAddButton}
        >
          הרשם
        </Button>
      )}
    </Box>
  );
};

export default Cart;
