import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Brand from "../Brand/Brand";

export default function Brands() {
  const getbrands = () => {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  };
  let { data, isLoading } = useQuery("getbrands", getbrands);
  console.log(data?.data.data);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <div className="container">
        <div className="row">
          {data?.data.data.map((brand) => {
            return <Brand brand={brand} key={brand._id} />;
          })}
        </div>
      </div>
    </>
  );
}
