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
import AppPagination from "../../app/components/AppPagination";
import { useAppDispatch } from "../../app/store/configureStore";
import { useState } from "react";
import CourseMatchForm from "./CourseMatchForm";
import { CourseMatch } from "../../app/models/courseMatch";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import useCourseMatches from "../../app/hooks/useCourseMatches";
import { removeCourseMatch, setCurrentPage } from "../courseMatch/courseMatchSlice";
import { toast } from "react-toastify";

export default function CourseMatchPanel() {
  const { courseMatches, metaData } = useCourseMatches();
  const [editMode, setEditMode] = useState(false);
  const [selectedCourseMatch, setSelectedCourseMatch] = useState<CourseMatch | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState(0);
  const dispatch = useAppDispatch();

  function handleSelectCourseMatch(courseMatch: CourseMatch) {
    setSelectedCourseMatch(courseMatch);
    setEditMode(true);
  }

  function handleDeleteCourseMatch(id: number) {
    setLoading(true);
    setTarget(id);
    console.log(target);
    agent.Admin.deleteCourseMatch(id)
    .then(() => {
      dispatch(removeCourseMatch(id));
      toast.success("Course Match removed successfully");
    })
    .catch((error) => {
      console.log(error);
      toast.success(error.response.data.Detail);
    })
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedCourseMatch) setSelectedCourseMatch(undefined);
    setEditMode(false);
  }

  if (editMode)
    return <CourseMatchForm courseMatch={selectedCourseMatch} cancelEdit={cancelEdit} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Course Match Affairs
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
              <TableCell align="center">Course Id</TableCell>
              <TableCell align="center">Course Name</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courseMatches.map((courseMatch) => (
              <TableRow
                key={courseMatch.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {courseMatch.id}
                </TableCell>
                <TableCell align="center">{courseMatch.studentNumber}</TableCell>
                <TableCell align="center">{courseMatch.studentFirstName}</TableCell>
                <TableCell align="center">{courseMatch.studentLastName}</TableCell>
                <TableCell align="center">{courseMatch.courseId}</TableCell>
                <TableCell align="center">{courseMatch.courseName}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleSelectCourseMatch(courseMatch)}
                    startIcon={<Edit />}
                  />
                  <LoadingButton
                    loading={loading && target === courseMatch.id}
                    onClick={() => handleDeleteCourseMatch(courseMatch.id)}
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
