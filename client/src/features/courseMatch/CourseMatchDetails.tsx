import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchCourseMatchAsync, courseMatchSelectors } from "./courseMatchSlice";

export default function CourseMatchDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const courseMatch = useAppSelector((state) =>
    courseMatchSelectors.selectById(state, id)
  );
  const { status: courseMatchStatus } = useAppSelector((state) => state.courseMatch);

  useEffect(() => {
    if (!courseMatch) dispatch(fetchCourseMatchAsync(parseInt(id)));
  }, [id, dispatch, courseMatch]);

  if (courseMatchStatus.includes("pending"))
    return <LoadingComponent message="Loading courseMatch..." />;

  if (!courseMatch) return <NotFound />;

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={6}>
                <img src={courseMatch.pictureUrl} alt={courseMatch.name} style={{width: '100%'}} />
            </Grid> */}
      <Grid item xs={6}>
        <Typography variant="h3">{courseMatch.studentNumber}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${courseMatch.studentFirstName + " " + courseMatch.studentLastName}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{courseMatch.studentNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{courseMatch.studentFirstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{courseMatch.studentLastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{courseMatch.studentNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{courseMatch.courseId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{courseMatch.courseName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
