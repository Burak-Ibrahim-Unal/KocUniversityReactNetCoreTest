import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchCourseAsync, courseSelectors } from "./courseSlice";

export default function CourseDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const course = useAppSelector((state) =>
    courseSelectors.selectById(state, id)
  );
  const { status: courseStatus } = useAppSelector((state) => state.course);

  useEffect(() => {
    if (!course) dispatch(fetchCourseAsync(parseInt(id)));
  }, [id, dispatch, course]);

  if (courseStatus.includes("pending"))
    return <LoadingComponent message="Loading course..." />;

  if (!course) return <NotFound />;

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={6}>
                <img src={course.pictureUrl} alt={course.name} style={{width: '100%'}} />
            </Grid> */}
      <Grid item xs={6}>
        <Typography variant="h3">{course.courseName}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${course.courseId + " " + course.courseName}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{course.courseId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{course.courseName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
