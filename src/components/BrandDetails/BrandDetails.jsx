import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { productcontext } from "../../context/ProductContext";
import Product from "../Product/Product";
export default function BrandDetails() {
  const { id } = useParams();
  const [brand, setBrand] = useState();
  const { data, isLoading } = useContext(productcontext);
  const getBrandDetails = async () => {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then(({ data }) => setBrand(data))
      .catch((err) => err);
  };
  useEffect(() => {
    getBrandDetails();
  }, []);
  const products = [];
  data?.data.data.map((item) => {
    //console.log(item.brand.name);
    if (item.brand.name === brand?.data.name) {
      products.push(item);
    }
  });
  //console.log(products);
  console.log(isLoading);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <div className="container text-center">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-6">
            <img src={brand?.data.image} alt="" />
          </div>
          <div className="col-md-6">
            <h1 className="text-main">{brand?.data.name}</h1>
          </div>
        </div>
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
