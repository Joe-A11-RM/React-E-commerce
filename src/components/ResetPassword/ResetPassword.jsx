import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ResetPassword() {
  let navigate = useNavigate();
  const sendData = async (values) => {
    let response = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .then((data) => data)
      .catch((err) => err);
    console.log(response);
    if (response.data.statusMsg == "success") {
      navigate("/verifycode");
    } else {
      navigate("/resetpassword");
    }
  };
  let validSchema = Yup.object({
    email: Yup.string().required("Email is required").email("invalid email"),
  });
  let reset = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
      console.log(values);
      localStorage.setItem("email", values.email);
      sendData(values);
    },
  });
  return (
    <>
      <div className="container">
        <div className="m-auto w-50 mt-5">
          <form onSubmit={reset.handleSubmit}>
            <label htmlFor="email" className="form-label">
              Please Enter Your Email :
            </label>
            <input
              onChange={reset.handleChange}
              onBlur={reset.handleBlur}
              type="email"
              className="form-control"
              id="email"
              name="email"
            />
            {reset.errors.email && reset.touched.email ? (
              <div className="alert alert-danger mt-2">
                {reset.errors.email}
              </div>
            ) : (
              ""
            )}
            <button
              disabled={!(reset.dirty && reset.isValid)}
              type="submit"
              className="btn bg-main text-white mt-3"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
