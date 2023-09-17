"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { useGlobalContext } from "./Context/store";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: {rate: number};
  count: number;
  // Add more properties as needed
}

const Home: React.FC = () => {
  const { total, setTotal, cartCount, setCartCount, cartData, setCartData } =
    useGlobalContext();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const productPage = (id: number) => {
    router.replace(`/product/${id}`);
  };

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
        let sum = cartArray.reduce((t, c) => t + c.count * c.price, 0);
        setTotal(sum);
        console.log(cartArray);
      } else {
        addNewProduct(product);
      }
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex">
        <Sidebar data={products} filterFunction={setFiltered} />
        {loading ? (
          <div className="flex justify-center">...loading</div>
        ) : (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 mt-20">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="max-w-sm rounded overflow-hidden shadow-lg py-4 transition ease-in-out delay-150 hover:scale-105"
                onClick={() => productPage(product.id)}
              >
                <div className="w-full px-12 h-64 flex items-center justify-center">
                  <img
                    className="w-24"
                    src={product.image}
                    alt="Sunset in the mountains"
                  />
                </div>
                <div className="px-6">
                  <p className="text-sm mb-2">{product.title}</p>
                  <p className="text-gray-700 text-base mb-4">
                    {product.price} BDT
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={(e) => addToCart(e, product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
