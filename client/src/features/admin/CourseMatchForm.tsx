import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { AppSelectList } from "../../app/components/AppSelectList";
import AppTextInput from "../../app/components/AppTextInput";
import { CourseMatch } from "../../app/models/courseMatch";
import { yupResolver } from "@hookform/resolvers/yup";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { validationSchema } from "./courseMatchValidation";
import { toast } from "react-toastify";
import { setCourseMatch } from "../courseMatch/courseMatchSlice";
import useStudents from "../../app/hooks/useStudents";

interface Props {
  courseMatch?: CourseMatch;
  cancelEdit: () => void;
}

export default function CourseMatchForm({ courseMatch, cancelEdit }: Props) {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const watchFile = watch("file", null);
  const dispatch = useAppDispatch();

  const { students } = useStudents();


  useEffect(() => {
    if (courseMatch && !watchFile && !isDirty) reset(courseMatch);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [courseMatch, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    // console.log(data);
    // console.log(data.studentTableId + " " + data.courseTableId);
    // var updatedCourseMatch = {
    //   id: data.id,
    //   studentId: data.studentTableId,
    //   courseId: data.courseTableId,
    // };
    let updatedCourseMatch = {
      id: data.id,
      studentId: data.studentTableId,
      courseId: data.courseTableId,
    };
    try {
      let response: CourseMatch;
      if (courseMatch) {
        response = await agent.Admin.updateCourseMatch(updatedCourseMatch);
        console.log(response);
        toast.success("CourseMatch updated successfully");
      } else {
        response = await agent.Admin.createCourseMatch(data);
        toast.success("CourseMatch added successfully");
      }
      dispatch(setCourseMatch(response));
      cancelEdit();
    } catch (error: any) {
      toast.error(error.response.data.Detail);
    }
  }

  console.log(courseMatch?.studentTableId + " " + courseMatch?.courseTableId);
  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Course Match Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            {
              <AppTextInput
                key={courseMatch?.studentTableId}
                control={control}
                name="studentNumber"
                label="Student Number"
              />
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              key={courseMatch?.courseTableId}
              control={control}
              name="courseId"
              label="Course Id"
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={cancelEdit} variant="contained" color="inherit">
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="success"
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}

