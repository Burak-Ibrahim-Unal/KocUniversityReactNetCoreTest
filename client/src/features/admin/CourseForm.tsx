import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { AppSelectList } from "../../app/components/AppSelectList";
import AppTextInput from "../../app/components/AppTextInput";
import useCourses from "../../app/hooks/useCourses";
import { Course } from "../../app/models/course";
import { yupResolver } from "@hookform/resolvers/yup";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { validationSchema } from "./courseValidation";
import { toast } from "react-toastify";
import { setCourse } from "../courses/courseSlice";

interface Props {
  course?: Course;
  cancelEdit: () => void;
}

export default function CourseForm({ course, cancelEdit }: Props) {
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

  useEffect(() => {
    if (course && !watchFile && !isDirty) reset(course);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [course, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Course;
      if (course) {
        response = await agent.Admin.updateCourse(data);
        toast.success("Course updated successfully");
      } else {
        response = await agent.Admin.createCourse(data);
        toast.success("Course added successfully");
      }
      dispatch(setCourse(response));
      cancelEdit();
    } catch (error: any) {
      toast.error(error.response.data.Detail);
    }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Course Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="courseId"
              label="Course Id"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="courseName"
              label="Course Name"
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
