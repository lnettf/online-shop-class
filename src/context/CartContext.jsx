import { createContext, useContext, useState } from "react";

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const subtract = (id) => {
        const position = cart.findIndex((product => product.id === id))

        const newCart = cart.filter((product, index) => {
            return index !== position
        })
        setCart(newCart)
    }

    const subtractAllById = (id) => {
        const newCart = cart.filter(product => product.id !== id)
        setCart(newCart)
    }

    const clear = () => {
        setCart([])
    }

    const add = (product) => {
        setCart((cart) => [...cart, product])
    }


    const value = {
        clear,
        add,
        cart,
        subtract,
        subtractAllById
    }

    return (

        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => {
    return useContext(CartContext)
}