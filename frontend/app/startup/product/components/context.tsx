"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductContextType, Product } from "./types";
// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider component
export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  
  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const removeProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? product : p))
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, setProducts, addProduct, removeProduct, updateProduct, isAddProductDialogOpen, setIsAddProductDialogOpen } as ProductContextType}
    >
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook for consuming the context
export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}
