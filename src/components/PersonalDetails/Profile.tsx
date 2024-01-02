import users from "../../Data/users";
import User from "../../Types/User";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const Profile: React.FC<{}> = () => {
  let user: User = users[0];
  return (
    <List>
      <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ListItemText
          primary="שם פרטי:"
          secondary={<Typography variant="h6">{user.firstName}</Typography>}
        />
      </ListItem>
      <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ListItemText
          primary="שם משפחה:"
          secondary={<Typography variant="h6">{user.lastName}</Typography>}
        />
      </ListItem>
      <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ListItemText
          primary={'דוא"ל:'}
          secondary={<Typography variant="h6">{user.email}</Typography>}
        />
      </ListItem>
      <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ListItemText
          primary={"תאריך לידה:"}
          secondary={
            <Typography variant="h6">
              {user.birthday.toLocaleDateString()}
            </Typography>
          }
        />
      </ListItem>
      <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ListItemText
          primary={"טלפון נייד:"}
          secondary={<Typography variant="h6">{user.phoneNumber}</Typography>}
        />
      </ListItem>
    </List>
  );
};

export default Profile;
