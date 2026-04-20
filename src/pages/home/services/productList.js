import axios from "axios";

export const productList = async () => {
  const response = await axios.get(`http://localhost:3001/products/`);

  return response.data;
};
