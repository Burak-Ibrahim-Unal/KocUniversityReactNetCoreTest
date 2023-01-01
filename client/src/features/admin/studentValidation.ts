import * as yup from "yup";

export const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    studentNumber: yup.string().required(),
})