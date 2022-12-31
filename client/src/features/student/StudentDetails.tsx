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
import { fetchStudentAsync, studentSelectors } from "./studentSlice";

export default function StudentDetails() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const student = useAppSelector((state) =>
    studentSelectors.selectById(state, id)
  );
  const { status: studentStatus } = useAppSelector((state) => state.student);

  useEffect(() => {
    if (!student) dispatch(fetchStudentAsync(parseInt(id)));
  }, [id, dispatch, student]);

  if (studentStatus.includes("pending"))
    return <LoadingComponent message="Loading student..." />;

  if (!student) return <NotFound />;

  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={6}>
                <img src={student.pictureUrl} alt={student.name} style={{width: '100%'}} />
            </Grid> */}
      <Grid item xs={6}>
        <Typography variant="h3">{student.studentNumber}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${student.firstName + " " + student.lastName}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{student.studentNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{student.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{student.lastName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
