import { Link, useParams } from "react-router-dom";
import { ERROR_TYPES, useProduct } from "./hooks/useProduct";
import style from "./ProductDetail.module.css"
import { ProductImage } from "./components/ProductImage";
import { ProductInfo } from "./components/ProductInfo";
import { ProductDescription } from "./components/ProductDescription";


/**
 * Estructura de producto:
 * {
    "id": "1",
    "name": "Portátil Apple MacBook Pro",
    "description": "Portátil de alto rendimiento con pantalla Retina de 13 pulgadas, chip Apple M1, 8 GB de RAM y 256 GB de SSD.",
    "price": 1299.99,
    "stockQuantity": 75,
    "categoryName": "Portátiles",
    "imageUrl": "https://picsum.photos/seed/macbook/200/300",
    "createdAt": "2023-12-29",
    "updatedAt": "2023-12-29"
}
 */
export const ProductDetail = () => {
    const { productId } = useParams();
    const { product, isLoading, error } = useProduct(productId);
    console.log({ product })

    if (error === ERROR_TYPES.NOT_FOUND) {
        return <h1>no existe...</h1>;
    }

    if (error === ERROR_TYPES.UNKNOWN) {
        return <h1>error...</h1>;
    }

    if (isLoading) {
        return (
            <div>
                <h1>Cargando...</h1>;
            </div>
        );
    }

    return (
        <div className={style.container}>
            <div className={style.productDetail}>
                <ProductImage imageUrl={product.imageUrl} />
                <ProductInfo product={product} />
            </div>
            <ProductDescription description={product.description} />
        </div>
    );
};
