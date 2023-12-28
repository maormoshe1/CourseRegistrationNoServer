import { Fragment, useContext, useEffect, useState } from "react";
import { CoursesContext } from "../../CoursesContext";
import Course from "../../Types/Course";
import Cart from "./Cart";
import Dialog from "@mui/material/Dialog";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";

export default function CartDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [chosenCoursesSum, setChosenCoursesSum] = useState<number>(0);
  const chosenCourses: Course[] = useContext(CoursesContext)!.chosenCourses;

  useEffect(() => {
    setChosenCoursesSum(chosenCourses.length);
  }, [chosenCourses]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Badge badgeContent={chosenCoursesSum} color="primary">
        <IconButton onClick={handleClickOpen}>
          <ShoppingCartIcon fontSize="large" />
        </IconButton>
      </Badge>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Cart />
      </Dialog>
    </Fragment>
  );
}
