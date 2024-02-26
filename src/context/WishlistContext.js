import axios from "axios";
import { createContext, useState } from "react";

export const wishlistcontext = createContext();
export default function WishListContext({ children }) {
  let [wishlistcounter, setwishlistCounter] = useState(0);
  let [style, setStyle] = useState();
  async function addToWishlist(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => data)
      .catch((err) => err);
  }

  async function getWishlist() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => data)
      .catch((err) => err);
  }

  return (
    <wishlistcontext.Provider
      value={{
        wishlistcounter,
        setwishlistCounter,
        addToWishlist,
        getWishlist,
        style,
        setStyle,
      }}
    >
      {children}
    </wishlistcontext.Provider>
  );
}
