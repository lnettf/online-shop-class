import { useState } from "react"
import { useCart } from "../../context/CartContext"
import style from "./CheckoutDetail.module.css"

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

        // futura llamada http
        console.log({
            id: 2323,
            ...form,
            items: cart.map(product => {
                return {
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity, // calcular este campo
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
        <div className={style.container}>
            <h1 className={style.title}>Checkout Details</h1>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.formGroup}>
                    <label className={style.label} htmlFor="firstName">First Name</label>
                    <input
                        className={style.input}
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.label} htmlFor="lastName">Last Name</label>
                    <input
                        className={style.input}
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                    />
                </div>

                <div className={style.formGroup}>
                    <label className={style.label} htmlFor="city">City</label>
                    <input
                        className={style.input}
                        type="text"
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                        required
                    />
                </div>

                <button className={style.submitButton} type="submit">
                    Complete Order
                </button>
            </form>
        </div>
    )
}