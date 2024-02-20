import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";

export const productcontext = createContext();

export default function ProductContext({ children }) {
  async function getproducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  let { data, isLoading } = useQuery("getproducts", getproducts);
  return (
    <>
      <productcontext.Provider value={{ data, isLoading }}>
        {children}
      </productcontext.Provider>
    </>
  );
}
