import { Paper } from "@mui/material";
import { useEffect } from "react";
import StudentGrid from "../../app/components/StudentGrid";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { studentSelectors, fetchStudentsAsync } from "../student/studentSlice";

export default function StudentList() {
  const students = useAppSelector(studentSelectors.selectAll);
  const { studentsLoaded } = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!studentsLoaded) {
      dispatch(fetchStudentsAsync());
    }
  }, [studentsLoaded, dispatch]);

  return (
    <Paper>
      <StudentGrid rowItems={students} />
    </Paper>
  );
}
