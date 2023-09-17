import React from "react";
import { useGlobalContext } from "../Context/store";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rate: number;
    // Add more properties as needed
}

export function CartFunction(item: Product) {
    const { setCartCount } = useGlobalContext();

    setCartCount( prev => prev + 1 )
}