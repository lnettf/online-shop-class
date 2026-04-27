# Online Shop — React Project

Practice project for the React course. Online store with a simulated REST API (json-server) serving tech products, featuring a shopping cart system and complete checkout flow.

## Features

- ✅ Responsive product listing with grid layout
- ✅ Individual product detail pages
- ✅ Shopping cart system with Context API
- ✅ Checkout page with quantity management
- ✅ Order completion form
- ✅ Routing with React Router v6
- ✅ Design system with CSS Modules and CSS variables
- ✅ Loading and error state handling

## Prerequisites

- Node.js 18 or higher
- npm

## Installation

```bash
npm install
```

## Running the application

```bash
npm run dev
```

This command starts **two servers simultaneously**:

| Server                 | URL                   | Description            |
| ---------------------- | --------------------- | ---------------------- |
| React (Vite)           | http://localhost:5173 | Frontend application   |
| Fake API (json-server) | http://localhost:3001 | REST API with products |

> If you only want to run the API without the frontend, use `npm run api`.

---

## Project Structure

The project follows a modular architecture where each page has its own components, hooks, and services.

```
online-shop/
├── db.json                                # Simulated database (json-server)
├── src/
│   ├── main.jsx                           # Entry point, mounts RouterProvider and CartProvider
│   ├── index.css                          # Global CSS variables and reset
│   │
│   ├── components/                        # Shared components
│   │   ├── Layout.jsx                     # Main layout with header and footer
│   │   ├── Layout.module.css
│   │   ├── Header.jsx                     # Navigation bar with logo and cart
│   │   ├── Header.module.css
│   │   └── ds/                            # Design System
│   │       ├── Button.jsx                 # Reusable button
│   │       ├── Button.module.css
│   │       ├── Tag.jsx                    # Category tag
│   │       └── Tag.module.css
│   │
│   ├── icons/                             # SVG icons as components
│   │   └── Cart.jsx                       # Cart icon
│   │
│   ├── context/                           # Context API for global state
│   │   └── CartContext.jsx                # Shopping cart context
│   │
│   ├── router/
│   │   └── router.jsx                     # Route definitions with createBrowserRouter
│   │
│   └── pages/                             # Application pages
│       │
│       ├── home/                          # Home page
│       │   ├── Home.jsx
│       │   ├── Home.module.css
│       │   ├── components/
│       │   │   ├── ProductList.jsx        # Product grid with loading/error
│       │   │   ├── ProductList.module.css
│       │   │   ├── ProductCard.jsx        # Product card
│       │   │   └── ProductCard.module.css
│       │   ├── hooks/
│       │   │   └── useProducts.jsx        # Hook to fetch products
│       │   └── services/
│       │       └── productList.js         # Axios service for listing
│       │
│       ├── productDetail/                 # Product detail
│       │   ├── ProductDetail.jsx
│       │   ├── ProductDetail.module.css
│       │   ├── components/
│       │   │   ├── ProductImage.jsx       # Product image
│       │   │   ├── ProductImage.module.css
│       │   │   ├── ProductInfo.jsx        # Info and buy button
│       │   │   ├── ProductInfo.module.css
│       │   │   ├── ProductDescription.jsx # Product description
│       │   │   └── ProductDescription.module.css
│       │   ├── hooks/
│       │   │   └── useProduct.js          # Hook with typed error handling
│       │   └── services/
│       │       └── productDetail.js       # Axios service for detail
│       │
│       ├── checkout/                      # Shopping cart
│       │   ├── Checkout.jsx
│       │   ├── Checkout.module.css
│       │   └── hooks/
│       │       └── useCheckout.js         # Hook for cart management
│       │
│       ├── checkoutDetail/                # Order completion
│       │   ├── CheckoutDetail.jsx
│       │   └── CheckoutDetail.module.css
│       │
│       └── error/                         # 404 page
│           └── Error.jsx
│
├── package.json
└── vite.config.js
```

---

## Routing with React Router

The application uses `createBrowserRouter` from React Router v6 with nested routes. The router is defined in `src/router/router.jsx`.

### Available Routes

| Route                   | Component         | Description                        |
| ----------------------- | ----------------- | ---------------------------------- |
| `/`                     | `Home`            | List of all products               |
| `/product/:productId`   | `ProductDetail`   | Detail of a specific product       |
| `/checkout`             | `Checkout`        | Shopping cart                      |
| `/checkout-details`     | `CheckoutDetail`  | Order completion form              |
| `*`                     | `Error`           | 404 page for routes not found      |

### Router Configuration

```jsx
// src/router/router.jsx
export const ROUTES = {
  HOME: "/",
  CHECKOUT: "/checkout",
  PRODUCT_DETAIL: "/product/:productId",
  CHECKOUT_DETAILS: "/checkout-details"
}

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetail /> },
      { path: ROUTES.CHECKOUT, element: <Checkout /> },
      { path: ROUTES.CHECKOUT_DETAILS, element: <CheckoutDetail /> },
      { path: "*", element: <Error /> }
    ]
  }
]);
```

### Navigation

To navigate between pages:

```jsx
import { Link } from "react-router-dom";

<Link to={`/product/${product.id}`}>View detail</Link>
<Link to="/checkout">Go to cart</Link>
```

To read URL parameters:

```jsx
import { useParams } from "react-router-dom";

const { productId } = useParams();
```

---

## Context API - Shopping Cart

The shopping cart is managed through Context API, allowing cart state access from any component.

### CartContext

```jsx
// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function add(product) {
    setCart((prev) => [...prev, product]);
  }

  function remove(productId) {
    const index = cart.findIndex((p) => p.id === productId);
    if (index !== -1) {
      setCart((prev) => prev.filter((_, i) => i !== index));
    }
  }

  function removeAll(productId) {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  }

  function clear() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, add, remove, removeAll, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

### Using the Context

```jsx
import { useCart } from "../context/CartContext";

const { cart, add, remove } = useCart();

// Add product to cart
<button onClick={() => add(product)}>Buy Product</button>

// View product count
<span>{cart.length}</span>
```

---

## HTTP Requests with Axios

Requests are encapsulated in service files within each page.

### Listing Service

```js
// src/pages/home/services/productList.js
import axios from "axios";

export const productList = async () => {
  const response = await axios.get("http://localhost:3001/products/");
  return response.data;
};
```

### Detail Service

```js
// src/pages/productDetail/services/productDetail.js
import axios from "axios";

export const productDetailService = async (productId) => {
  const response = await axios.get(`http://localhost:3001/products/${productId}`);
  return response.data;
};
```

---

## Custom Hooks

### `useProducts` — Product Listing

```js
// src/pages/home/hooks/useProducts.jsx
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const get = async () => {
      try {
        setIsLoading(true);
        const products = await productList();
        if (products) setProducts(products);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    get();
  }, []);

  return { products, isLoading, error };
};
```

### `useProduct` — Detail with Typed Errors

```js
// src/pages/productDetail/hooks/useProduct.js
export const ERROR_TYPES = {
  NOT_FOUND: "NOT_FOUND",
  UNKNOWN: "UNKNOWN",
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const get = async () => {
      try {
        setIsLoading(true);
        const product = await productDetailService(productId);
        setProduct(product);
      } catch (error) {
        if (error.status === 404) {
          setError(ERROR_TYPES.NOT_FOUND);
        } else {
          setError(ERROR_TYPES.UNKNOWN);
        }
      } finally {
        setIsLoading(false);
      }
    };
    get();
  }, [productId]);

  return { product, isLoading, error };
};
```

### `useCheckout` — Cart Management

```js
// src/pages/checkout/hooks/useCheckout.js
export const useCheckout = () => {
  const { cart, add, remove, removeAll, clear } = useCart();

  // Groups products by id and counts quantities
  const productsGroup = cart.reduce((acc, product) => {
    if (acc[product.id]) {
      acc[product.id].count++;
    } else {
      acc[product.id] = { ...product, count: 1 };
    }
    return acc;
  }, {});

  const addItem = (product) => add(product);
  const subtractItem = (productId) => remove(productId);
  const subtractAllItemsById = (productId) => removeAll(productId);
  const removeAllItems = () => clear();

  return {
    productsGroup,
    addItem,
    subtractItem,
    subtractAllItemsById,
    removeAllItems,
  };
};
```

---

## API Endpoints

### Products

| Method | URL                                  | Description                |
| ------ | ------------------------------------ | -------------------------- |
| GET    | `http://localhost:3001/products`     | List all products          |
| GET    | `http://localhost:3001/products/:id` | Get a product by ID        |

**Examples:**

```
GET http://localhost:3001/products                        → list of 10 products
GET http://localhost:3001/products/1                      → product with id 1
GET http://localhost:3001/products?categoryName=Audio     → filter by category
```

### Orders

| Method | URL                                         | Description                              |
| ------ | ------------------------------------------- | ---------------------------------------- |
| POST   | `http://localhost:3001/orders`              | Create a new order                       |
| GET    | `http://localhost:3001/orders`              | List all orders                          |
| GET    | `http://localhost:3001/orders/:id`          | Get an order by ID                       |

**Order structure:**

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "city": "New York",
  "items": [
    {
      "productId": 1,
      "name": "Apple MacBook Pro Laptop",
      "price": 1299.99,
      "quantity": 2
    }
  ],
  "total": 2599.98,
  "createdAt": "2026-04-27T10:30:00.000Z"
}
```

**Example POST request:**

```js
import axios from "axios";

const createOrder = async (orderData) => {
  const response = await axios.post("http://localhost:3001/orders", {
    ...orderData,
    createdAt: new Date().toISOString()
  });
  return response.data;
};
```

---

## Design System

The project uses a consistent design system with CSS variables and reusable components.

### CSS Variables

Defined in `src/index.css`:

```css
:root {
  /* Colors */
  --color-primary: #000000;
  --color-bg: #ffffff;
  --color-text: #000000;
  --color-text-secondary: #666666;
  
  /* Spacing (8px scale) */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  
  /* Typography */
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-2xl: 24px;
  
  /* Layout */
  --max-width-content: 1200px;
  
  /* Transitions */
  --transition-speed: 200ms;
  --transition-ease: ease-in-out;
}
```

### DS Components

- **Button**: Reusable button with consistent styles
- **Tag**: Tag for product categories

---

## Images with Picsum

Images use [picsum.photos](https://picsum.photos). The format is:

```
https://picsum.photos/seed/{seed}/{width}/{height}
```

**Examples:**

```
https://picsum.photos/seed/macbook/400/400   → square image 400x400
https://picsum.photos/seed/macbook/600/200   → landscape image
https://picsum.photos/seed/macbook/300/500   → portrait image
```

> The `seed` ensures the same image is always served for that product.

---

## Future Improvements

- [ ] Persist cart in localStorage
- [ ] Implement product filters by category
- [ ] Add product search
- [ ] Implement sorting (price, name, etc.)
- [ ] Add order history page
- [ ] Implement user authentication
- [ ] Add more product details (stock, ratings)
- [ ] Implement pagination in listing
- [ ] Add transition animations
- [ ] Unit and integration tests

---

## Technologies Used

- **React 18** - UI Framework
- **Vite** - Build tool and dev server
- **React Router v6** - Routing
- **Axios** - HTTP client
- **json-server** - Simulated REST API
- **CSS Modules** - Locally scoped styles
- **Context API** - Global state management

---

## Author

Project created as part of the React course - 2026
