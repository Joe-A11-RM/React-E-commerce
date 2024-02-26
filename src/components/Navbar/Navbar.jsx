import React, { useContext, useEffect, useState } from "react";
import logo from "../../assests/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authcontext } from "../../context/AuthContext";
import { cartcontext } from "../../context/CartContext";
import { wishlistcontext } from "../../context/WishlistContext";
export default function Navbar() {
  let { counter, setCounter, getCart } = useContext(cartcontext);
  let { wishlistcounter, setwishlistCounter, getWishlist, style } =
    useContext(wishlistcontext);
  let { token, setToken } = useContext(authcontext);
  let navigate = useNavigate();
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/signin");
  };
  useEffect(() => {
    (async () => {
      let data = await getCart();
      setCounter(data.numOfCartItems);
      let wishlistdata = await getWishlist();
      console.log(wishlistdata);
      setwishlistCounter(wishlistdata.count);
    })();
  }, []);
  //console.log(token);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="home">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="products">
                      Products
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="categories">
                      Categories
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="brands">
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link position-relative" to="cart">
                      Cart
                      <i className="fa-solid fa-cart-shopping cart cartIcon mx-3"></i>
                      {counter ? (
                        <span className="cartnum position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {counter}
                        </span>
                      ) : (
                        ""
                      )}
                    </NavLink>
                  </li>

                  <li className="nav-item mx-3">
                    <NavLink
                      className="nav-link position-relative"
                      to="wishlist"
                    >
                      Wishlist
                      <i
                        style={style}
                        className="fa-solid fa-heart cart-Icon mx-2"
                      ></i>
                      <span className="position-absolute top-0 start-100 translate-middle  rounded-pill bg-danger">
                        {wishlistcounter ? (
                          <span className="cartnum position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {wishlistcounter}
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <Link onClick={logout} className="nav-link">
                      LogOut
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="signin">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="signup">
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
