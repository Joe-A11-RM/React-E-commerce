import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartcontext } from "../../context/CartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  let { setCounter, addToCart } = useContext(cartcontext);
  const [loading, setLoading] = useState(true);
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
  async function AddtoCart(productId) {
    setLoading(false);
    let data = await addToCart(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product added to cart successfully");
      setCounter(data.numOfCartItems);
      setLoading(true);
    }
  }
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
              onClick={() => AddtoCart(product._id)}
              className="btn bg-main text-white w-100"
            >
              {loading ? "Add To Cart" : "Loading..."}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
