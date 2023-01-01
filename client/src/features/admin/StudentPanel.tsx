import {
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import useStudents from "../../app/hooks/useStudents";
import AppPagination from "../../app/components/AppPagination";
import { useAppDispatch } from "../../app/store/configureStore";
import { useState } from "react";
import StudentForm from "./StudentForm";
import { Student } from "../../app/models/student";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { removeStudent, setCurrentPage } from "../student/studentSlice";

export default function StudentPanel() {
  const { students, metaData } = useStudents();
  const [editMode, setEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);
  const dispatch = useAppDispatch();

  function handleSelectStudent(student: Student) {
    setSelectedStudent(student);
    setEditMode(true);
  }

  function handleDeleteStudent(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteStudent(id)
      .then(() => dispatch(removeStudent(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedStudent) setSelectedStudent(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <StudentForm student={selectedStudent} cancelEdit={cancelEdit} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Student Affairs
        </Typography>
        <Button
          onClick={() => setEditMode(true)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Create
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="center">Student Number</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.id}
                </TableCell>
                <TableCell align="center">{student.studentNumber}</TableCell>
                <TableCell align="center">{student.firstName}</TableCell>
                <TableCell align="center">{student.lastName}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleSelectStudent(student)}
                    startIcon={<Edit />}
                  />
                  <LoadingButton
                    loading={loading && target === student.id}
                    onClick={() => handleDeleteStudent(student.id)}
                    startIcon={<Delete />}
                    color="error"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && (
        <Box sx={{ pt: 2 }}>
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setCurrentPage({ pageNumber: page }))
            }
          />
        </Box>
      )}
    </>
  );
}
