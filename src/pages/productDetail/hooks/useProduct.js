import { useEffect, useState } from "react";
import { productDetailService } from "../services/productDetail";

export const ERROR_TYPES = {
  NOT_FOUND: "NOT_FOUND",
  UNKNOWN: "UNKNOWN",
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const get = async () => {
      try {
        setIsLoading(true);
        const product = await productDetailService(productId);
        setProduct(product);
      } catch (error) {
        setError(true);
        if (error.status === 404) {
          setError(ERROR_TYPES.NOT_FOUND);
        }
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    };

    get();
  }, []);

  return { product, isLoading, error };
};
