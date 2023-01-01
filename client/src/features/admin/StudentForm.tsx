import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { AppSelectList } from "../../app/components/AppSelectList";
import AppTextInput from "../../app/components/AppTextInput";
import useStudents from "../../app/hooks/useStudents";
import { Student } from "../../app/models/student";
import { yupResolver } from "@hookform/resolvers/yup";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { setStudent } from "../student/studentSlice";
import { validationSchema } from "./studentValidation";
import { toast } from "react-toastify";

interface Props {
  student?: Student;
  cancelEdit: () => void;
}

export default function StudentForm({ student, cancelEdit }: Props) {
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
    if (student && !watchFile && !isDirty) reset(student);
    return () => {
      if (watchFile) URL.revokeObjectURL(watchFile.preview);
    };
  }, [student, reset, watchFile, isDirty]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Student;
      if (student) {
        response = await agent.Admin.updateStudent(data);
        toast.success("Student updated successfully");
      } else {
        response = await agent.Admin.createStudent(data);
        toast.success("Student added successfully");
      }
      dispatch(setStudent(response));
      cancelEdit();
    } catch (error: any) {
      toast.error(error.response.data.Detail);
      console.log(error);
    }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Student Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              control={control}
              name="studentNumber"
              label="Student Number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="firstName"
              label="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="lastName" label="Last Name" />
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
