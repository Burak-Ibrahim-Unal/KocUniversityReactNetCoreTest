import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import StudentPanel from "../../features/admin/StudentPanel";
import ContactPage from "../../features/Contact/Contact";
import CourseMatchDetails from "../../features/courseMatch/CourseMatchDetails";
import CourseMatchList from "../../features/courseMatch/CourseMatchList";
import CourseDetails from "../../features/courses/CourseDetails";
import CourseList from "../../features/courses/CourseList";
import HomePage from "../../features/home/HomePage";
import StudentDetails from "../../features/student/StudentDetails";
import StudentList from "../../features/student/StudentList";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import { useAppDispatch } from "../store/configureStore";
import Header from "./Header";
import LoadingComponent from "./LoadingComponent";
import PrivateRoute from "./PrivateRoute";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import CoursePanel from "../../features/admin/CoursePanel";
import CourseMatchPanel from "../../features/admin/CourseMatchPanel";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleDarkThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        theme="colored"
      />
      <CssBaseline />
      <Header
        darkMode={darkMode}
        handleDarkThemeChange={handleDarkThemeChange}
      />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Container sx={{ mb: 4 }}>
            <Switch>
              <Route exact path="/students" component={StudentList} />
              <Route path="/students/:id" component={StudentDetails} />
              <Route exact path="/courses" component={CourseList} />
              <Route path="/courses/:id" component={CourseDetails} />
              <Route exact path="/coursematches" component={CourseMatchList} />
              <Route path="/coursematches/:id" component={CourseMatchDetails} />
              <PrivateRoute path="/studentPanel" component={StudentPanel} />
              <PrivateRoute path="/coursePanel" component={CoursePanel} />
              <PrivateRoute
                path="/courseMatchPanel"
                component={CourseMatchPanel}
              />
              <Route path="/about" component={AboutPage} />
              <Route path="/contact" component={ContactPage} />
              <Route path="/server-error" component={ServerError} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        )}
      />
    </ThemeProvider>
  );
}

export default App;
