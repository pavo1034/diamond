import * as yup from "yup";

export const diamondSchema = yup.object().shape({
  stockNo: yup
    .string()
    .matches(/^\d{7}[A-Z]{3}$/, "Must be 7 digits followed by 3 uppercase letters")
    .required("Stock No is required"),
  carat: yup
    .number()
    .typeError("Carat must be a number")
    .positive("Carat must be greater than 0")
    .required("Carat is required"),
  shape: yup.string().required("Shape is required"),
  color: yup.string().required("Color is required"),
  clarity: yup.string().required("Clarity is required"),
  RAPprice: yup
    .number()
    .typeError("RAP price must be a number")
    .positive("RAP price must be positive")
    .required("RAP price is required"),
  disc: yup
    .number()
    .typeError("Discount must be a number")
    .negative("Discount must be negative")
    .required("Discount is required"),
});
