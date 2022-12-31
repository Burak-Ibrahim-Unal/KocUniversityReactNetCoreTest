import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  courseMatchSelectors, fetchCourseMatchesAsync,
} from "./courseMatchSlice";
import CourseMatchGrid from "../../app/components/CourseMatchGrid";

//ilgili rowun idsimni tutan kod
const getRowId = (row: any) => row.id;

//const columnItems = courseMatch

export default function CourseMatchList() {
  const courseMatches = useAppSelector(courseMatchSelectors.selectAll);
  const { courseMatchesLoaded } = useAppSelector(
    (state) => state.courseMatch
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!courseMatchesLoaded) {
      dispatch(fetchCourseMatchesAsync());
    }
  }, [courseMatchesLoaded, dispatch]);

  return (
    <Paper>
      <CourseMatchGrid rowItems={courseMatches} />
    </Paper>
  );
}
