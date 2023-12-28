import { useState } from "react";
import AllCoursesList from "../components/ChooseCourses/AllCoursesList";
import SearchCourse from "../components/SearchAddCourses/SearchCourse";
import CartDialog from "../components/Cart/CartDailog";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

const CourseRegistrationPage: React.FC<{}> = () => {
  const [nameFilter, setNameFilter] = useState<string>("");
  return (
    <Box sx={{ margin: "1em" }}>
      <CartDialog />
      <Grid container justifyContent={"center"}>
        <Grid item xs={4} justifyContent="center">
          <Grid item xs={12}>
            <SearchCourse setNameFilter={setNameFilter} />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "1vh" }}>
            <AllCoursesList nameFilter={nameFilter} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseRegistrationPage;
