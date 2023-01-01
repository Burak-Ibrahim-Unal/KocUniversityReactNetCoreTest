import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchCoursesAsync,
  courseSelectors,
} from "./courseSlice";
import CourseGrid from "../../app/components/CourseGrid";

export default function CourseList() {
  const courses = useAppSelector(courseSelectors.selectAll);
  const { coursesLoaded } = useAppSelector(
    (state) => state.course
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!coursesLoaded) {
      dispatch(fetchCoursesAsync());
    }
  }, [coursesLoaded, dispatch]);

  return (
    <Paper>
      <CourseGrid rowItems={courses} />
    </Paper>
  );
}
