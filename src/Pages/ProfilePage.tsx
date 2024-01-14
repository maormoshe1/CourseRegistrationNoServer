import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PastTakenCoursesList from "../components/PersonalDetails/PastTakenCoursesList";
import FutureTakenCoursesList from "../components/PersonalDetails/FutureTakenCourseList";
import Profile from "../components/PersonalDetails/Profile";
import { Box, Tab, Grid, IconButton } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import User from "../Types/User";
import APIRequest from "../APIRequests";

const ProfilePage: React.FC<{}> = () => {
  const [value, setValue] = useState("1");
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    APIRequest.getUser()
      .then((result) => {
        setUser(result);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  let navigate = useNavigate();

  const switchTabs = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ margin: "1em" }}>
      <IconButton onClick={() => navigate("/Registration")}>
        <EditCalendarIcon />
      </IconButton>
      <Grid container justifyContent={"center"}>
        <Grid
          item
          xs={4}
          justifyContent="center"
          sx={{ background: "white", borderRadius: "1em" }}
        >
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Grid item xs={12}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={switchTabs}
                    aria-label="lab API tabs example"
                    sx={{ fontSize: "1em" }}
                  >
                    <Tab
                      label="פרטים אישיים"
                      value="1"
                      sx={{ fontSize: "1em", width: "33%" }}
                    />
                    <Tab
                      label="קורסים שעשיתי"
                      value="2"
                      sx={{ fontSize: "1em", width: "33%" }}
                    />
                    <Tab
                      label="קורסים שאעשה"
                      value="3"
                      sx={{ fontSize: "1em", width: "33%" }}
                    />
                  </TabList>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ minHeight: "32em" }}>
                <TabPanel value="1">
                  <Profile user={user} />
                </TabPanel>
                <TabPanel value="2">
                  <PastTakenCoursesList />
                </TabPanel>
                <TabPanel value="3">
                  <FutureTakenCoursesList />
                </TabPanel>
              </Grid>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
