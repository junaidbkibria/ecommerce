'use client';
import React, { ReactNode } from "react";
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

type DataType = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: {rate: number};
    count: number
    // Add more properties as needed
  }

interface ContextProps {
    total: number,
    setTotal: Dispatch<SetStateAction<number>>,
    cartCount: number,
    setCartCount: Dispatch<SetStateAction<number>>,
    cartData: DataType[],
    setCartData: Dispatch<SetStateAction<DataType[]>>
}

const GlobalContext = createContext<ContextProps>({
    total: 0,
    setTotal: (): string => '',
    cartCount: 0,
    setCartCount: (): string => '',
    cartData: [],
    setCartData: (): DataType[] => [] 
})

export const GlobalContextProvider = ({ children }: {children: ReactNode}) => {
    const [cartCount, setCartCount] = useState(0);
    const [ total, setTotal] = useState(0);
    const [cartData, setCartData] = useState<[] | DataType[]>([]);
    
    return (
        <GlobalContext.Provider value={{ total, setTotal, cartCount, setCartCount, cartData, setCartData }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);