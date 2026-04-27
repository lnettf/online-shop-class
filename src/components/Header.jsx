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
                    Header
                </Link>
            </h1>
            <div>
                <Link to={ROUTES.CHECKOUT}>
                    <CartIcon width={50} />
                </Link>
                <span>{cart.length}</span>
            </div>
        </div>
    )
}