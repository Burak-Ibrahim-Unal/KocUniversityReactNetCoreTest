import * as yup from "yup";

export const validationSchema = yup.object({
    courseId: yup.string().required(),
    courseName: yup.string().required(),
})