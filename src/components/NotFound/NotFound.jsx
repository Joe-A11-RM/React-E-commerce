import React from "react";
import errorlogo from "../../assests/images/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <img src={errorlogo} alt="" />
      </div>
    </>
  );
}
