import { useEffect } from "react";
import { courseSelectors, fetchCoursesAsync } from "../../features/courses/courseSlice";

import { useAppSelector, useAppDispatch } from "../store/configureStore";

export default function useCourses() {
  const courses = useAppSelector(courseSelectors.selectAll);
  const {
    coursesLoaded,
    metaData,
  } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!coursesLoaded) dispatch(fetchCoursesAsync());
  }, [coursesLoaded, dispatch]);

  return {
    courses,
    coursesLoaded,
    metaData,
  };
}
