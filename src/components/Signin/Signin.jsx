import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authcontext } from "../../context/AuthContext";
export default function Signin() {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const { token, setToken } = useContext(authcontext);
  const sendData = async (values) => {
    setLoading(false);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then(({ data }) => {
        console.log(data);
        if (data.message == "success") {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/home");
        }
      })
      .catch((error) => {
        setLoading(true);
        setErrorMsg(error.response.data.message);
      });
  };
  let validSchema = Yup.object({
    email: Yup.string().required("Email is required").email("invalid email"),
    password: Yup.string().required("Password is required"),
  });
  let register = useFormik({
    initialValues: {
      email: "",
      password: "",
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
        <h2>Login</h2>
        <form onSubmit={register.handleSubmit}>
          <div className="mb-3">
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
          </div>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <button
            disabled={!(register.dirty && register.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loading ? "Login" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
          <Link to="/resetpassword">
            <p className="mt-4 text-primary">Forget Your Password</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
