import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartcontext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { wishlistcontext } from "../../context/WishlistContext";

export default function Product({ item }) {
  const [loading, setLoading] = useState(true);
  const [wishloading, setwishLoading] = useState(true);
  let { setCounter, addToCart } = useContext(cartcontext);
  let { setwishlistCounter, addToWishlist, style, setStyle } =
    useContext(wishlistcontext);
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

  async function AddtoWishlist(productId) {
    setwishLoading(false);
    setStyle({ color: "red" });
    let data = await addToWishlist(productId);
    console.log(data);
    if (data.status == "success") {
      toast.success("Product added to wishlust successfully");
      setwishlistCounter(data.data.length);
      setwishLoading(true);
      setStyle({ color: "black", transition: "all ease 2s" });
    }
  }
  return (
    <>
      <div className="col-md-2">
        <div className="product cursor-pointer rounded-3 p-3">
          <Link to={`/productdetails/${item._id}`}>
            <img src={item.imageCover} className="w-100" alt="" />
            <span className="text-main">{item.category.name}</span>
            <h5 className="my-2 fw-bold">
              {item.title.split(" ").slice(0, 2).join(" ")}
            </h5>
            <div className="d-flex justify-content-between my-3">
              <div>{item.price}EGP</div>
              <div>
                <i className="fa-solid fa-star rating-color"></i>

                {item.ratingsAverage}
              </div>
            </div>
          </Link>
          <button
            disabled={!loading}
            onClick={() => AddtoCart(item._id)}
            className="btn bg-main w-100 text-white"
          >
            {loading ? "Add To Cart" : "Loading..."}
          </button>
          <button
            disabled={!loading}
            onClick={() => AddtoWishlist(item._id)}
            className="btn bg-info mt-2 w-100 text-white"
          >
            {wishloading ? "Add To Wishlist" : "Loading..."}
          </button>
        </div>
      </div>
    </>
  );
}
