import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { ProductDetail } from "../pages/productDetail/ProductDetail";
import { Error } from "../pages/error/Error";
import { Layout } from "../components/Layout";
import { Checkout } from "../pages/checkout/Checkout";

export const ROUTES = {
  HOME: "/",
  CHECKOUT: "/checkout",
  PRODUCT_DETAIL: "/product/:productId"
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.PRODUCT_DETAIL,
        element: <ProductDetail />,
      }, {
        path: ROUTES.CHECKOUT,
        element: <Checkout />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ]
  }
]);
