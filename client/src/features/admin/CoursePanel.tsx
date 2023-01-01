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
import useCourses from "../../app/hooks/useCourses";
import AppPagination from "../../app/components/AppPagination";
import { useAppDispatch } from "../../app/store/configureStore";
import { useState } from "react";
import CourseForm from "./CourseForm";
import { Course } from "../../app/models/course";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { removeCourse, setCurrentPage } from "../courses/courseSlice";
import { toast } from "react-toastify";

export default function CoursePanel() {
  const { courses, metaData } = useCourses();
  const [editMode, setEditMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);
  const dispatch = useAppDispatch();

  function handleSelectCourse(course: Course) {
    setSelectedCourse(course);
    setEditMode(true);
  }

  function handleDeleteCourse(id: number) {
    setLoading(true);
    setTarget(id);
    console.log(target);
    agent.Admin.deleteCourse(id)
      .then(() => {
        dispatch(removeCourse(id));
        toast.success("Course removed successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.success(error.response.data.Detail);
      })
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedCourse) setSelectedCourse(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <CourseForm course={selectedCourse} cancelEdit={cancelEdit} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Course Affairs
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
              <TableCell align="center">Course Id</TableCell>
              <TableCell align="center">Course Name</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow
                key={course.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {course.id}
                </TableCell>
                <TableCell align="center">{course.courseId}</TableCell>
                <TableCell align="center">{course.courseName}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleSelectCourse(course)}
                    startIcon={<Edit />}
                  />
                  <LoadingButton
                    loading={loading && target === course.id}
                    onClick={() => handleDeleteCourse(course.id)}
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
