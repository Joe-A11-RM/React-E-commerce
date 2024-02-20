import React, { useContext, useEffect, useState } from "react";
import { cartcontext } from "../../context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  const { getCart, deleteItem, setCounter, updateQTY } =
    useContext(cartcontext);
  const [loading, setLoading] = useState(true);
  const [cartitems, setCartitems] = useState();
  useEffect(() => {
    (async () => {
      let data = await getCart();
      if (data?.response?.data.statusMsg == "fail") {
        setCartitems(null);
      } else {
        setCartitems(data?.data);
      }
      setLoading(false);
    })();
  }, []);

  async function deleteProduct(id) {
    console.log(id);
    let data = await deleteItem(id);
    console.log(data);
    if ((data.status = "success")) {
      toast.error("Product deleted successfully");
      setCounter(data.numOfCartItems);
      setCartitems(data?.data);
    }
  }
  async function updateProductQTY(id, count) {
    let data = await updateQTY(id, count);
    console.log(data);
    if ((data.status = "success")) {
      toast.success("Product updated successfully");
      setCounter(data.numOfCartItems);
      setCartitems(data?.data);
    }
  }
  console.log(cartitems?._id);
  //console.log(cartitems?.products);
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className="container bg-main-light my-2 p-3 rounded-1">
        <h2>Shop Cart:</h2>
        <p className="text-main">
          Total Cart Price: {cartitems?.totalCartPrice}
        </p>
        {cartitems?.products.map((item) => {
          return (
            <div key={item._id} className="row py-2 border-bottom">
              <div className="col-md-1">
                <img src={item.product.imageCover} className="w-100" alt="" />
              </div>
              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <p className="m-1">{item.product.title}</p>
                  <p className="m-1 text-main p-0">Price: {item.price}</p>
                  <button
                    onClick={() => deleteProduct(item.product._id)}
                    className="btn m-0 p-0"
                  >
                    <i className="fa-solid text-main fa-trash-can mx-1"></i>
                    Remove
                  </button>
                </div>
                <div className="mt-3">
                  <button
                    onClick={() => {
                      updateProductQTY(item.product._id, item.count + 1);
                    }}
                    className="btn brdr"
                  >
                    +
                  </button>
                  <span className="px-1">{item.count}</span>
                  <button
                    disabled={item.count <= 1}
                    onClick={() => {
                      updateProductQTY(item.product._id, item.count - 1);
                    }}
                    className="btn brdr"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <Link
          to={`/address/${cartitems?._id}`}
          className="btn bg-main text-white"
        >
          Place Order
        </Link>
      </div>
    </>
  );
}
