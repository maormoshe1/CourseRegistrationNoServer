import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

const MenuAppBar: React.FC<{}> = ({}) => {
  const [auth, setAuth] = useState(false);

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
};

export default MenuAppBar;
