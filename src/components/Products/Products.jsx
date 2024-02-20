import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Product from "../Product/Product";

export default function Products() {
  const getproducts = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  };
  let { data, isLoading } = useQuery("getproducts", getproducts);
  console.log(data?.data.data);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <div className="container">
        <div className="row">
          {data?.data.data.map((item) => {
            return <Product item={item} key={item._id} />;
          })}
        </div>
      </div>
    </>
  );
}
