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
        <div className={style.container}>
            <h1 className={style.title}>Checkout</h1>

            {Object.values(productsGroup).length === 0 ? (
                <p className={style.empty}>Your cart is empty</p>
            ) : (
                <>
                    <button className={style.clearButton} onClick={removeAllItems}>
                        Clear cart
                    </button>

                    <div className={style.itemsList}>
                        {Object.values(productsGroup).map((product) => {
                            return (
                                <div className={style.item} key={product.id}>
                                    <p>{product.name}</p>
                                    <div className={style.itemActions}>
                                        <button className={style.actionButton} onClick={() => subtractItem(product.id)}>
                                            -
                                        </button>
                                        <span className={style.counter}>{product.count}</span>
                                        <button className={style.actionButton} onClick={() => addItem(product)}>
                                            +
                                        </button>
                                        <button className={`${style.actionButton} ${style.removeButton}`} onClick={() => subtractAllItemsById(product.id)}>
                                            ×
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <Link className={style.checkoutLink} to={ROUTES.CHECKOUT_DETAILS}>
                        Continue to checkout
                    </Link>
                </>
            )}
        </div>
    );
};
