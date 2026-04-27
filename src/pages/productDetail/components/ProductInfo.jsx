import { Button } from "../../../components/ds/Button"
import { Tag } from "../../../components/ds/Tag"
import { useCart } from "../../../context/CartContext"
import { CartIcon } from "../../../icons/Cart"
import style from "./ProductInfo.module.css"

export const ProductInfo = ({ product }) => {
    const { add } = useCart()

    const handleClick = () => {
        add(product)
    }
    return (
        <div >
            <h2>{product.name}</h2>
            <p>{product.price}€</p>
            <Tag text={`#${product.categoryName}`} />
            <Button onClick={handleClick}>
                <CartIcon />
                Comprar Producto
            </Button>
        </div>
    )
}