import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function NewPassword() {
  let navigate = useNavigate();
  const sendData = async (values) => {
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((data) => {
        console.log(data);
        if (data.status == 200) {
          localStorage.setItem("token", data.data.token);
          navigate("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const validSchema = Yup.object({
    newPassword: Yup.string()
      .required("New Password is required")
      .min(6)
      .max(12),
  });
  let NewPassForm = useFormik({
    initialValues: {
      email: localStorage.getItem("email"),
      newPassword: "",
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
      sendData(values);
    },
  });
  return (
    <>
      <div className="container">
        <div className="m-auto w-50 mt-5">
          <form onSubmit={NewPassForm.handleSubmit}>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input
                onChange={NewPassForm.handleChange}
                onBlur={NewPassForm.handleBlur}
                className="form-control"
                id="newPassword"
                name="newPassword"
              />
              {NewPassForm.errors.newPassword &&
              NewPassForm.touched.newPassword ? (
                <div div className="alert alert-danger mt-2">
                  {NewPassForm.errors.newPassword}
                </div>
              ) : (
                ""
              )}
            </div>
            <button type="submit" className="btn bg-main text-white mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
