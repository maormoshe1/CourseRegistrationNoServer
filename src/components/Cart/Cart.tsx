import { useContext, useState, useEffect } from "react";
import ChosenCoursesList from "./ChosenCoursesList";
import { CoursesContext } from "../../CoursesContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Cart: React.FC<{}> = ({}) => {
  const coursesContext = useContext(CoursesContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableAddButton, setDisableAddButton] = useState<boolean>(true);

  const chosenCourses = coursesContext!.chosenCourses;

  useEffect(() => {
    if (chosenCourses.length === 0) {
      setDisableAddButton(true);
    } else {
      setDisableAddButton(false);
    }
  }, [chosenCourses]);

  const handleClick = () => {
    chosenCourses.forEach((chosenCourse) =>
      coursesContext?.addTakenCourse(chosenCourse)
    );
    setIsLoading(true);
    coursesContext?.clearChosenCourses();
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
      <ChosenCoursesList />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          onClick={handleClick}
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
