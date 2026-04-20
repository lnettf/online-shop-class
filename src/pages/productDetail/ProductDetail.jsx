import { Link, useParams } from "react-router-dom";
import { ERROR_TYPES, useProduct } from "./hooks/useProduct";

export const ProductDetail = () => {
    const { productId } = useParams();
    const { product, isLoading, error } = useProduct(productId);

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
        <div className="miClase">
            <h2>hola clase!</h2>
            <h2>hola clase!</h2>
            <h2>hola clase!</h2>
            <h2>hola clase!</h2>
            {isLoading && <div></div>}
            <Link to={`/product-category/${product.categoryName}`}>
                Ir a {product.categoryName}
            </Link>
            <h1>{product.name}</h1>
        </div>
    );
};
