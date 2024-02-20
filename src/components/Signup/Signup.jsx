import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function Signup() {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const sendData = async (values) => {
    setLoading(false);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then(({ data }) => {
        console.log(data);
        if (data.message == "success") {
          navigate("/signin");
        }
      })
      .catch((error) => {
        setLoading(true);
        setErrorMsg(error.response.data.message);
      });
  };
  let validSchema = Yup.object({
    name: Yup.string()
      .required("Name must be required")
      .min(3, "at least 3 letters")
      .max(12, "at max 12 letters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Phone should be egyptian phone number"),
    email: Yup.string().required("Email is required").email("invalid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password should contain at least 6 characters")
      .max(12, "Password should contain maximum 12 characters"),
    rePassword: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")], "password and repassword not same"),
  });
  let register = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validSchema,
    // validate: (values) => {
    //   const errors = {};
    //   const nameRegex = /^[A-Z][a-z]{2,7}$/;
    //   const phoneRegex = /^01[0125][0-9]{8}$/;
    //   if (nameRegex.test(values.name) == false) {
    //     errors.name =
    //       "Name must start with capital letter and contains from 3 to 8 characters";
    //   }
    //   if (
    //     values.email.includes("@") !== true ||
    //     values.email.includes(".") !== true
    //   ) {
    //     errors.email = "Email should contain '@' and '.'";
    //   }
    //   if (phoneRegex.test(values.phone) == false) {
    //     errors.phone = "Phone number must be egyptian number";
    //   }
    //   if (values.password.length < 7 || values.password.length > 12) {
    //     errors.password = "Password should be from 7 to 12 characters";
    //   }

    //   if (values.rePassword != values.password) {
    //     errors.rePassword = "Password and rePassword not match";
    //   }
    //   if (values) return errors;
    // },
    onSubmit: (values) => {
      console.log(values);
      sendData(values);
    },
  });

  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>Register Now:</h2>
        <form onSubmit={register.handleSubmit}>
          <div className="mb-3">
            <div>
              <label htmlFor="formGroupExampleInput" className="form-label">
                Name :
              </label>
              <input
                onBlur={register.handleBlur}
                onChange={register.handleChange}
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
              {register.errors.name && register.touched.name ? (
                <div className="alert alert-danger mt-2">
                  {register.errors.name}
                </div>
              ) : (
                ""
              )}
              <div className="my-3">
                <label htmlFor="email" className="form-label">
                  Email :
                </label>
                <input
                  onBlur={register.handleBlur}
                  onChange={register.handleChange}
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              {register.errors.email && register.touched.email ? (
                <div className="alert alert-danger mt-2">
                  {register.errors.email}
                </div>
              ) : (
                ""
              )}
              <div className="my-3">
                <label htmlFor="password" className="form-label">
                  Password :
                </label>
                <input
                  onBlur={register.handleBlur}
                  onChange={register.handleChange}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              {register.errors.password && register.touched.password ? (
                <div className="alert alert-danger mt-2">
                  {register.errors.password}
                </div>
              ) : (
                ""
              )}
              <div className="my-3">
                <label htmlFor="rePassword" className="form-label">
                  rePassword :
                </label>
                <input
                  onBlur={register.handleBlur}
                  onChange={register.handleChange}
                  type="password"
                  className="form-control"
                  id="rePassword"
                  name="rePassword"
                />
              </div>
              {register.errors.rePassword && register.touched.rePassword ? (
                <div className="alert alert-danger mt-2">
                  {register.errors.rePassword}
                </div>
              ) : (
                ""
              )}
              <div className="my-3">
                <label htmlFor="phone" className="form-label">
                  Phone :
                </label>
                <input
                  onBlur={register.handleBlur}
                  onChange={register.handleChange}
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                />
              </div>
              {register.errors.phone && register.touched.phone ? (
                <div className="alert alert-danger mt-2">
                  {register.errors.phone}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <button
            disabled={!(register.dirty && register.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loading ? "Signup" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </div>
  );
}
