import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { ProductDetail } from "../pages/productDetail/ProductDetail";
import { Error } from "../pages/error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
