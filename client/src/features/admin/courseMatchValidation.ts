import * as yup from "yup";

export const validationSchema = yup.object({
    studentNumber: yup.string().required(),
    courseName: yup.string().required(),
})