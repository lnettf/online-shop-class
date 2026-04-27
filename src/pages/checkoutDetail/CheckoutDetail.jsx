import { useState } from "react"
import { useCart } from "../../context/CartContext"

/**
 *
 * {
      "productId": 3,
      "name": "Sony PlayStation 5",
      "price": 499.99,
      "quantity": 1
    }
 */
export const CheckoutDetail = () => {
    const { cart } = useCart()
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        city: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget);

        // http

        console.log({
            id: 2323,
            ...form,
            items: cart.map(product => {
                return {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity, //
                }
            })
        })

    }

    const handleChange = (e) => {
        setForm((form) => {
            return {
                ...form,
                [e.target.name]: e.target.value
            }
        })

    }


    return (
        <form onSubmit={handleSubmit}>
            <label >
                Nombre
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} />
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} />
                <input type="text" name="city" value={form.city} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />

        </form>
    )
}