import { useEffect } from "react";
import { courseMatchSelectors, fetchCourseMatchesAsync } from "../../features/courseMatch/courseMatchSlice";

import { useAppSelector, useAppDispatch } from "../store/configureStore";

export default function useCourseMatches() {
  const courseMatches = useAppSelector(courseMatchSelectors.selectAll);
  const {
    courseMatchesLoaded,
    metaData,
  } = useAppSelector((state) => state.courseMatch);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourseMatchesAsync());
  }, [courseMatchesLoaded, dispatch]);

  return {
    courseMatches,
    courseMatchesLoaded,
    metaData,
  };
}
