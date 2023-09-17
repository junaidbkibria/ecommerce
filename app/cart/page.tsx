"use client";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBarComp from "../components/AppBar";
import { useGlobalContext } from "../Context/store";

const Cart: React.FC = () => {
  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rate: number;
    count: number;
    // Add more properties as needed
  }
  const { total, setTotal, cartCount, setCartCount, cartData, setCartData } = useGlobalContext();

  const addNewProduct = (product: Product) => {
    let cartObj = product;
    cartObj.count = 1;
    let cartArray = cartData;
    cartArray.push(cartObj);
    console.log(cartArray);
    let cartItemCount = cartArray.reduce(
      (total, current) => total + current.count,
      0
    );
    setCartCount(cartItemCount);
    setCartData(cartArray);
    let sum = cartArray.reduce((t, c) => t + c.count * c.price, 0);
    setTotal(sum);
  };

  const addToCart = (e: React.MouseEvent<HTMLElement>, product: Product) => {
    e.stopPropagation();
    // setCartCount((prev) => prev + 1);
    if (cartData.length === 0) {
      addNewProduct(product);
    } else if (cartData.length > 0) {
      let itemExists = cartData.findIndex((e) => e.id === product.id);
      if (itemExists !== -1) {
        let cartArray = cartData;
        cartArray[itemExists].count = cartArray[itemExists].count + 1;
        let cartItemCount = cartArray.reduce(
          (total, current) => total + current.count,
          0
        );
        setCartCount(cartItemCount);
        setCartData(cartArray);
        console.log(cartArray);
        let sum = cartArray.reduce((t, c) => t + c.count * c.price, 0);
        setTotal(sum);
      } else {
        addNewProduct(product);
      }
    }
  };

  const removeFromCart = (
    e: React.MouseEvent<HTMLElement>,
    product: Product
  ) => {
    e.stopPropagation();
    let itemExists = cartData.findIndex((e) => e.id === product.id);
    let cartArray = cartData;
    const totalItems = cartArray.reduce(
      (total, current) => total + current.count,
      0
    );
    cartArray[itemExists].count = cartArray[itemExists].count - 1;
    console.log(totalItems, "total items");
    setCartCount(totalItems - 1);
    setCartData(cartArray);
    console.log(cartArray);
    let sum = cartArray.reduce((t, c) => t + c.count * c.price, 0);
    setTotal(sum);
  };

  const deleteFromCart = (
    e: React.MouseEvent<HTMLElement>,
    product: Product
  ) => {
    e.stopPropagation();
    let cartArray = cartData.filter((item) => item.id !== product.id);
    let itemCount = cartArray.reduce(
      (total, current) => total + current.count,
      0
    );
    setCartData(cartArray);
    setCartCount(itemCount);
    let sum = cartArray.reduce((t, c) => t + c.count * c.price, 0);
    setTotal(sum);
  };

  return (
    <div>
      <AppBarComp />
      <div className="py-2 px-1 sm:px-1 md:px-6 lg:px-12">
        <p className="font-bold text-xl my-3 mx-3">Shopping cart</p>
        {cartData.length === 0 ? (
          <div className="h-96 flex justify-center items-center">
            <ShoppingCartIcon fontSize="large" />
            <p className="font-bold text-xl ml-2">Cart is Empty</p>
          </div>
        ) : (
          <>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2">Remove</th>
                  <th className="py-2 hidden sm:block">Product</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => (
                  <tr>
                    <td
                      className="border border-gray-300 py-2 text-center cursor-pointer"
                      onClick={(e) => deleteFromCart(e, item)}
                    >
                      X
                    </td>
                    <td className="border border-gray-300 py-2 text-center hidden sm:block">
                      <div className="w-24 flex justify-center">
                        <img src={item.image} alt="product image" />
                      </div>
                    </td>
                    <td className="border border-gray-300 py-2 text-center">
                      {item.title}
                    </td>
                    <td className="border border-gray-300 py-2 text-center">
                      <p style={{ minWidth: "90px" }}>
                        <button
                          className="border-2 px-2 mr-2"
                          disabled={item.count === 1}
                          onClick={(e) => removeFromCart(e, item)}
                        >
                          -
                        </button>
                        <p className="contents">{item.count}</p>
                        <button
                          className="border-2 px-2 ml-2"
                          onClick={(e) => addToCart(e, item)}
                        >
                          +
                        </button>
                      </p>
                    </td>
                    <td className="border border-gray-300 py-2 text-center">
                      {item.price} BDT
                    </td>
                    <td className="border border-gray-300 py-2 text-center">
                      {item.price * item.count} BDT
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="my-5 font-bold text-xl ml-3">Total: {total.toFixed(2)} BDT</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
