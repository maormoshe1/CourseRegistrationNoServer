import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Box from "@mui/material/Box";


export default function MenuAppBar() {
  const [auth, setAuth] = React.useState<boolean>(false);

  let navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let isLogin: boolean = event.target.checked;
    setAuth(isLogin);
    if (isLogin) {
      navigate("/Registration");
    } else {
      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
        <Toolbar>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => navigate("/Profile")}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
          <Typography
            variant="h5"
            component="div"
            sx={{ paddingRight: "1em", paddingLeft: "1em" }}
          >
            {auth ? "הרשמה לקורסים" : ""}
          </Typography>
          <FormGroup sx={{ marginLeft: "auto" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={auth}
                  onChange={handleChange}
                  aria-label="login switch"
                />
              }
              label={auth ? "Logout" : "Login"}
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
