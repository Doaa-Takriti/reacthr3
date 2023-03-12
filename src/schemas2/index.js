import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
   name: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Required"),
    age: yup.number().positive().integer().required("Required"),

    email: yup.string().email("Please enter a valid email").required("Required"),
 

    checkbox: yup
        .boolean()
        .oneOf([true], "Please accept the terms of service"),
        password: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),   
         gender: yup.string().required().oneOf(["male", "female"], 'Selecting the gender field is required'),



});