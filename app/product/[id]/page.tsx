"use client";
import AppBarComp from "@/app/components/AppBar";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useGlobalContext } from "@/app/Context/store";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {rate: number, count: number};
  count: number;
  // Add more properties as needed
}

const ProductDeatils = ({ params }: { params: { id: number } }) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    image: "",
    rating: {rate: 0, count: 0},
    count: 0
    // Add more properties as needed
  });
  const [value, setValue] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );
        const data = await response.json();
        setProduct(data);
        setValue(data.rating.rate);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);
  return (
    <div>
      <AppBarComp />
      {loading ? (
        <div className="flex justify-center">... loading</div>
      ) : (
        <div className="py-2 md:px-6 lg:px-12">
          <div className="p-3">
            <h1 className="font-bold text-xl mb-3">
              Product Detail
            </h1>
            <div className="w-full px-12 h-64 flex items-center justify-center border-solid border-2 rounded-lg mb-4">
              <img
                className="w-24"
                src={product.image}
                alt="Sunset in the mountains"
              />
            </div>
            <h1 className="font-bold text-lg flex justify-center mb-3">
              {product.price} BDT
            </h1>
            <div className="flex justify-center mb-3">
              <Rating name="read-only" value={value} readOnly />
            </div>
            <p className="flex justify-center mb-3">
              ({product.rating.count} reviews)
            </p>
            <h2 className="font-bold mb-3">{product.title}</h2>
            <p className="mb-6">{product.description}</p>
            <div className="flex justify-center mb-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={(e)=>addToCart(e,product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDeatils;
