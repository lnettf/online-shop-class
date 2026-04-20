import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import styles from "./ProductList.module.css";
import { useProducts } from "../hooks/useProducts";

/**
 *
 *
    "id": "10",
    "name": "Teclado Mecánico Keychron K2",
    "description": "Teclado mecánico compacto 75% con switches Gateron, retroiluminación RGB y compatibilidad multidispositivo.",
    "price": 89.99,
    "stockQuantity": 150,
    "categoryName": "Periféricos",
    "imageUrl": "https://picsum.photos/seed/keyboard/200/300",
    "createdAt": "2024-03-20",
    "updatedAt": "2024-03-20"
}
 */
export const ProductList = () => {
  const { products, isLoading, error } = useProducts()

  if (error) {
    return <h1>error</h1>
  }

  if (isLoading) {
    return <h1>Cargando...</h1>
  }


  return (
    <div className={styles.list}>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />
      })}
    </div>
  );
};
