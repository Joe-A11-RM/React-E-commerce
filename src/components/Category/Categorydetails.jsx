import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productcontext } from "../../context/ProductContext";
import Product from "../Product/Product";

export default function Categorydetails() {
  const { id } = useParams();
  const [category, setCategory] = useState();
  const { data, isLoading } = useContext(productcontext);
  const getCategoryDetails = async () => {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then(({ data }) => setCategory(data))
      .catch((err) => err);
  };
  useEffect(() => {
    getCategoryDetails();
  }, []);
  const products = [];
  data?.data.data.map((item) => {
    if (item.category.name === category?.data.name) {
      products.push(item);
    }
  });
  console.log(products);
  return (
    <>
      <div className="container text-center">
        <h1 className="text-main mt-5">{category?.data.name}</h1>
      </div>
      <div className="container">
        <div className="row">
          {products.map((i) => {
            return <Product item={i} key={i._id} />;
          })}
        </div>
      </div>
    </>
  );
}
