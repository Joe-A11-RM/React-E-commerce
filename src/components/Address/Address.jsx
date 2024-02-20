import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { authcontext } from "../../context/AuthContext";
import { cartcontext } from "../../context/CartContext";
export default function Address() {
  let navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const { token, setToken } = useContext(authcontext);
  let { id } = useParams();
  let { pay } = useContext(cartcontext);

  const sendData = async (values) => {
    setLoading(false);
    let data = await pay(id, values);
    console.log(data);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  };
  let address = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (values) => {
      console.log(values);
      sendData(values);
    },
  });

  return (
    <div>
      <div className="w-75 m-auto my-4">
        <h2>Address</h2>
        <form onSubmit={address.handleSubmit}>
          <div className="mb-3">
            <div className="my-3">
              <label htmlFor="details" className="form-label">
                Details :
              </label>
              <input
                onBlur={address.handleBlur}
                onChange={address.handleChange}
                type="details"
                className="form-control"
                id="details"
                name="details"
              />
            </div>

            <div className="my-3">
              <label htmlFor="phone" className="form-label">
                Phone :
              </label>
              <input
                onBlur={address.handleBlur}
                onChange={address.handleChange}
                type="phone"
                className="form-control"
                id="phone"
                name="phone"
              />
            </div>
            <div className="my-3">
              <label htmlFor="city" className="form-label">
                City :
              </label>
              <input
                onBlur={address.handleBlur}
                onChange={address.handleChange}
                type="city"
                className="form-control"
                id="city"
                name="city"
              />
            </div>
          </div>
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ""}
          <button
            disabled={!(address.dirty && address.isValid)}
            type="submit"
            className="btn bg-main text-white"
          >
            {loading ? "Pay" : <i className="fa fa-spinner fa-spin"></i>}
          </button>
        </form>
      </div>
    </div>
  );
}
