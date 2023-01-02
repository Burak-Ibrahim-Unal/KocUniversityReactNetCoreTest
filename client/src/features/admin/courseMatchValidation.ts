import * as yup from "yup";

export const validationSchema = yup.object({
    studentNumber: yup.string().required(),
    courseId: yup.string().required(),
})