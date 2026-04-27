import { Link } from "react-router-dom";
import { Button } from "../../components/ds/Button";
import { useCart } from "../../context/CartContext";
import style from "./Checkout.module.css"
import { useCheckout } from "./hooks/useCheckout";
import { ROUTES } from "../../router/router";

export const Checkout = () => {
    const {
        productsGroup,
        subtractItem,
        addItem,
        subtractAllItemsById,
        removeAllItems,
    } = useCheckout()

    return (
        <div>
            <h1>Checkout!</h1>

            <button onClick={removeAllItems}>
                Borrar todo el carrito
            </button>
            {Object.values(productsGroup).map((product) => {
                return (
                    <div className={style.item} key={product.id}>
                        <p>{product.name}</p>
                        <button onClick={() => subtractItem(product.id)}>
                            -
                        </button>
                        <span className={style.counter}>{product.count}</span>
                        <button onClick={() => addItem(product)}>
                            +
                        </button>
                        <button onClick={() => subtractAllItemsById(product.id)}>
                            X
                        </button>
                    </div>
                );
            })}

            <Link to={ROUTES.CHECKOUT_DETAILS}>
                Rellenar info
            </Link>

        </div>
    );
};
