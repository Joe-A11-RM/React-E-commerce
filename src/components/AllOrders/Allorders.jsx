import axios from "axios";
import React, { useEffect } from "react";

export default function Allorders() {
  const getOrders = async () => {
    await axios
      .get(
        "https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17"
      )
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getOrders();
  }, []);
  return <div>Allorders</div>;
}
