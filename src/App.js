import React from "react";
import Categories from "./components/Categories/Categories";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "./Layouts/Mainlayout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Authlayout from "./Layouts/Authlayout";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import NotFound from "./components/NotFound/NotFound";
import ProtectedRoutes from "./protectedroutes/ProtectedRoutes";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import StoreContextProvider from "./context/storeContext";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import Address from "./components/Address/Address";
import Allorders from "./components/AllOrders/Allorders";
import BrandDetails from "./components/BrandDetails/BrandDetails";
import ProductContext from "./context/ProductContext";
import Categorydetails from "./components/Category/Categorydetails";
export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productdetails/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categorydetails/:id",
          element: (
            <ProtectedRoutes>
              <Categorydetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "branddetails/:id",
          element: (
            <ProtectedRoutes>
              <BrandDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "address/:id",
          element: (
            <ProtectedRoutes>
              <Address />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders/:id",
          element: (
            <ProtectedRoutes>
              <Allorders />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: <Authlayout />,
      children: [
        { path: "signup", element: <Signup /> },
        { path: "signin", element: <Signin /> },
      ],
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <ProductContext>
          <CartContextProvider>
            <StoreContextProvider>
              <RouterProvider router={routes} />
            </StoreContextProvider>
          </CartContextProvider>
        </ProductContext>
      </AuthContextProvider>
      <ToastContainer theme="colored" autoClose={700} />
    </>
  );
}
