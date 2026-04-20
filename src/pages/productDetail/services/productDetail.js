import axios from "axios";

export const productDetailService = async (productId) => {
    const response = await axios.get(
        `http://localhost:3001/products/${productId}`,
    );

    return response.data
}