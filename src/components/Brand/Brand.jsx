import React from "react";
import { Link } from "react-router-dom";

export default function Brand({ brand }) {
  return (
    <>
      <div className="col-md-3">
        <Link to={`/branddetails/${brand._id}`}>
          <div className="product cursor-pointer rounded-3 p-3">
            <img src={brand.image} className="w-100" alt="" />
            <h5 className="text-main">{brand.name}</h5>
          </div>
        </Link>
      </div>
    </>
  );
}
