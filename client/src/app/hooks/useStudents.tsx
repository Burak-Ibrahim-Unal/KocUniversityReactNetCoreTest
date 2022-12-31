import { useEffect } from "react";
import {
  studentSelectors,
  fetchStudentsAsync,
} from "../../features/student/studentSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";

export default function useStudents() {
  const students = useAppSelector(studentSelectors.selectAll);
  const {
    studentsLoaded,
    metaData,
  } = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!studentsLoaded) dispatch(fetchStudentsAsync());
  }, [studentsLoaded, dispatch]);

  return {
    students,
    studentsLoaded,
    metaData,
  };
}
