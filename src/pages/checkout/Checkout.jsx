import { useCart } from "../../context/CartContext";

export const Checkout = () => {
    const { cart } = useCart();

    const productsGroup = cart.reduce((acc, item) => {
        if (acc[item.id]) {
            acc[item.id].count = acc[item.id].count + 1;
        } else {
            acc[item.id] = item;
            acc[item.id].count = 1;
        }

        return acc
    }, {});

    console.log({ productsGroup })

    return (
        <div>
            <h1>Checkout!</h1>

            {Object.values(productsGroup).map((product) => {
                return (
                    <div key={product.id}>
                        <p>{product.name}</p>
                        <span>{product.count}</span>
                    </div>
                );
            })}
        </div>
    );
};
