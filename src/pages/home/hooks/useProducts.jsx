import { useEffect, useState } from "react";
import { productList } from "../services/productList";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const get = async () => {
            try {
                setIsLoading(true);
                const products = await productList();

                if (products) {
                    setProducts(products);
                }
            } catch (error) {
                setError(true);
                console.log({ error });
            } finally {
                setIsLoading(false);
            }
        };
        get();
    }, []);

    return { products, isLoading, error };

}