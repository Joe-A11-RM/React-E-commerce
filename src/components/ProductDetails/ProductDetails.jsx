import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { storeContext } from "../../context/storeContext";

export default function ProductDetails() {
  let productid = useParams();
  let [product, setProduct] = useState({});
  const getproduct = async () => {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productid.id}`
    );
    setProduct(data.data);
  };
  useEffect(() => {
    getproduct();
  }, []);
  let { counter, setCounter } = useContext(storeContext);

  return (
    <>
      <div className="container my-5 ">
        <div className="row mt-5">
          <div className="col-md-3">
            <img src={product.imageCover} className="w-100" alt="" />
          </div>
          <div className="col-md-9 mt-5">
            <h4>{product.title}</h4>
            <p className="my-3">{product.description}</p>
            <span>{product.category?.name}</span>
            <div className="d-flex justify-content-between  my-4">
              <p>{product.price} EGP</p>
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                {product.ratingsAverage}
              </div>
            </div>
            <button
              onClick={() => setCounter(counter + 1)}
              className="btn bg-main text-white w-100"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
