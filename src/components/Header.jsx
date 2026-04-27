import { Link } from "react-router-dom"
import { CartIcon } from "../icons/Cart"
import style from "./Header.module.css"
import { ROUTES } from "../router/router"
import { useCart } from "../context/CartContext"

export const Header = () => {
    const { cart } = useCart()
    return (
        <div className={style.header}>
            <h1>
                <Link to={ROUTES.HOME}>
                    Shop
                </Link>
            </h1>
            <Link to={ROUTES.CHECKOUT} className={style.cartContainer}>
                <CartIcon className={style.cartIcon} width={32} />
                {cart.length > 0 && (
                    <span className={style.cartBadge}>{cart.length}</span>
                )}
            </Link>
        </div>
    )
}