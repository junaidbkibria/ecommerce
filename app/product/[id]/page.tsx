"use client";
import AppBarComp from "@/app/components/AppBar";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
  // Add more properties as needed
}

const ProductDeatils = ({ params }: { params: { id: number } }) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    image: "",
    rating: { rate: 0, count: 0 },
    // Add more properties as needed
  });
  const [value, setValue] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const addToCart = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
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
                onClick={addToCart}
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
