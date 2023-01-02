import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import AdminMenu from "./AdminMenu";
import DarkModeSwitch from "./DarkModeSwitch";
import SignedInMenu from "./SignedInMenu";

interface Props {
  darkMode: boolean;
  handleDarkThemeChange: () => void;
}

const midLinks = [
  { title: "students", path: "/students" },
  { title: "courses", path: "/courses" },
  { title: "coursematches", path: "/coursematches" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header({ darkMode, handleDarkThemeChange }: Props) {
  const { user } = useAppSelector((state: any) => state.account);
  // if (user && user.roles?.includes("Admin")) {
  //   midLinks.push({ title: "adminPanel", path: "/adminPanel" });
  // }

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            exact
            to="/"
            sx={navStyles}
          >
            KUSYS
          </Typography>
        </Box>
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
          <AdminMenu />
        </List>
        <Box display="flex" alignItems="center">
          <DarkModeSwitch
            darkMode={darkMode}
            handleDarkThemeChange={handleDarkThemeChange}
          />
          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
