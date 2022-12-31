import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchStudentsAsync,
  studentSelectors,
} from "./studentSlice";
import StudentGrid from "../../app/components/StudentGrid";

//ilgili rowun idsimni tutan kod
const getRowId = (row: any) => row.id;

//const columnItems = student

export default function StudentList() {
  const students = useAppSelector(studentSelectors.selectAll);
  const { studentsLoaded } = useAppSelector(
    (state) => state.student
  );
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
