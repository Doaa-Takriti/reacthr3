import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
   oldpassword: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
    newpassword: yup
        .string()
        .min(5)
        .matches(passwordRules, { message: "Please create a stronger password" })
        .required("Required"),
        confirmnewpassword: yup
        .string()
        .oneOf([yup.ref("newpassword"), null], "Passwords must match")
        .required("Required"),
  
});

export const basicSchema4 = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),

 });