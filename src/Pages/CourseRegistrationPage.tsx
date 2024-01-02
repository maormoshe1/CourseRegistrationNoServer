import { useState } from "react";
import AllCoursesList from "../components/ChooseCourses/AllCoursesList";
import SearchCourse from "../components/SearchAddCourses/SearchCourse";
import CartDialog from "../components/Cart/CartDialog";
import { Box, Grid } from "@mui/material";

const CourseRegistrationPage: React.FC<{}> = () => {
  console.log(`render CourseRegistrationPage.tsx`);
  const [courseName, setCourseName] = useState("");

  return (
    <Box sx={{ margin: "1em" }}>
      <CartDialog />
      <Grid container justifyContent={"center"}>
        <Grid item xs={4} justifyContent="center">
          <Grid item xs={12}>
            <SearchCourse
              courseName={courseName}
              setCourseName={setCourseName}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "1vh" }}>
            <AllCoursesList courseName={courseName} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseRegistrationPage;
