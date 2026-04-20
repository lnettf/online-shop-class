# Online Shop — Tarea de Clase

Proyecto de práctica para el curso de React. Consiste en una tienda online con una fake API REST que sirve productos de tecnología, y dos vistas principales: listado de productos y detalle de producto.

## Requisitos previos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
```

## Levantar la aplicación

```bash
npm run dev
```

Este comando levanta **dos servidores al mismo tiempo**:

| Servidor               | URL                   | Descripción            |
| ---------------------- | --------------------- | ---------------------- |
| React (Vite)           | http://localhost:5173 | Aplicación frontend    |
| Fake API (json-server) | http://localhost:3001 | API REST con productos |

> Si solo quieres levantar la API sin el frontend, puedes usar `npm run api`.

---

## Enrutado con React Router

La aplicación usa `createBrowserRouter` de React Router v6. El router está definido en `src/router/router.jsx` y se monta en `main.jsx` con `RouterProvider`.

| Ruta               | Componente       | Descripción                     |
| ------------------ | ---------------- | ------------------------------- |
| `/`                | `Home`           | Listado de todos los productos  |
| `/product/:productId` | `ProductDetail` | Detalle de un producto concreto |
| `*`                | `Error`          | Página 404 para rutas no encontradas |

**Configuración del router (`src/router/router.jsx`):**

```jsx
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { ProductDetail } from "../pages/productDetail/ProductDetail";
import { Error } from "../pages/error/Error";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/product/:productId", element: <ProductDetail /> },
  { path: "*", element: <Error /> },
]);
```

**Montar el router en `main.jsx`:**

```jsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

Para navegar al detalle desde una tarjeta se usa el componente `<Link>`:

```jsx
import { Link } from "react-router-dom";

<Link to={`product/${product.id}`}>Ver detalle</Link>
```

Para leer el `:productId` de la URL en la página de detalle se usa `useParams`:

```jsx
import { useParams } from "react-router-dom";

const { productId } = useParams();
```

---

## Peticiones HTTP con Axios

Las peticiones están encapsuladas en archivos de servicio, separados de los hooks y los componentes.

**Servicio de listado (`src/pages/home/services/productList.js`):**

```js
import axios from "axios";

export const productList = async () => {
  const response = await axios.get("http://localhost:3001/products/");
  return response.data;
};
```

**Servicio de detalle (`src/pages/productDetail/services/productDetail.js`):**

```js
import axios from "axios";

export const productDetailService = async (productId) => {
  const response = await axios.get(`http://localhost:3001/products/${productId}`);
  return response.data;
};
```

---

## Endpoints de la API

| Método | URL                                  | Descripción                |
| ------ | ------------------------------------ | -------------------------- |
| GET    | `http://localhost:3001/products`     | Lista todos los productos  |
| GET    | `http://localhost:3001/products/:id` | Obtiene un producto por ID |

```
GET http://localhost:3001/products        → lista de 10 productos
GET http://localhost:3001/products/1      → detalle del producto con id 1
GET http://localhost:3001/products?categoryName=Audio  → filtrar por categoría
```

---

## Imágenes con Picsum

Las imágenes usan [picsum.photos](https://picsum.photos). Puedes cambiar las dimensiones directamente en `db.json` modificando el campo `imageUrl`:

```json
"imageUrl": "https://picsum.photos/seed/macbook/200/300"
```

El formato es: `https://picsum.photos/seed/{semilla}/{ancho}/{alto}`

Ejemplos:

```
https://picsum.photos/seed/macbook/400/400   → imagen cuadrada 400x400
https://picsum.photos/seed/macbook/600/200   → imagen apaisada
https://picsum.photos/seed/macbook/300/500   → imagen vertical
```

> La `seed` (semilla) garantiza que siempre se sirva la misma imagen para ese producto. Si la cambias, cambia la imagen.

---

## Estructura del proyecto

Cada página tiene su propio directorio con sus componentes, hooks y servicios. La lógica de obtención de datos queda completamente separada de la vista.

```
online-shop/
├── db.json
├── src/
│   ├── main.jsx                              # Punto de entrada, monta RouterProvider
│   ├── index.css
│   │
│   ├── router/
│   │   └── router.jsx                        # Definición de rutas con createBrowserRouter
│   │
│   └── pages/
│       ├── home/
│       │   ├── Home.jsx                      # Página raíz, orquesta ProductList
│       │   ├── components/
│       │   │   ├── ProductList.jsx           # Grid de tarjetas, gestiona loading/error
│       │   │   ├── ProductList.module.css
│       │   │   ├── ProductCard.jsx           # Tarjeta individual con Link al detalle
│       │   │   └── ProductCard.module.css
│       │   ├── hooks/
│       │   │   └── useProducts.jsx           # Obtiene la lista de productos
│       │   └── services/
│       │       └── productList.js            # Llamada axios a /products
│       │
│       ├── productDetail/
│       │   ├── ProductDetail.jsx             # Página de detalle, gestiona loading/error
│       │   ├── hooks/
│       │   │   └── useProduct.js             # Obtiene un producto por id, maneja ERROR_TYPES
│       │   └── services/
│       │       └── productDetail.js          # Llamada axios a /products/:id
│       │
│       └── error/
│           └── Error.jsx                     # Página 404
│
├── package.json
└── vite.config.js
```

---

## Custom Hooks

Cada página tiene su propio hook que encapsula la lógica de fetching. Los componentes solo reciben datos y renderizan.

### `useProducts` — listado

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

### `useProduct` — detalle

El hook de detalle distingue entre errores conocidos (404) y errores genéricos usando `ERROR_TYPES`:

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
  }, []);

  return { product, isLoading, error };
};
```

El componente `ProductDetail` consume el hook y renderiza según el estado:

```jsx
const { product, isLoading, error } = useProduct(productId);

if (error === ERROR_TYPES.NOT_FOUND) return <h1>no existe...</h1>;
if (error === ERROR_TYPES.UNKNOWN) return <h1>error...</h1>;
if (isLoading) return <h1>Cargando...</h1>;
return <h1>{product.name}</h1>;
```

---

## Extra: Contexto de pedidos (carrito)

Una vez que el listado y el detalle funcionan, puedes añadir un **contexto global** para gestionar los pedidos del usuario. La idea es tener un estado compartido accesible desde cualquier componente sin pasar props manualmente.

**Crear el contexto:**

```jsx
// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prev) => [...prev, product]);
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
```

**Envolver la app con el provider:**

```jsx
// main.jsx
import { CartProvider } from "./context/CartContext";

<CartProvider>
  <RouterProvider router={router} />
</CartProvider>
```

**Usar el contexto en cualquier componente:**

```jsx
import { useCart } from "../context/CartContext";

const { cart, addToCart } = useCart();

<button onClick={() => addToCart(product)}>Añadir al carrito</button>
<p>Productos en el carrito: {cart.length}</p>
```

---

## Super Extra: Persistir el carrito al recargar (F5)

Cuando el usuario recarga la página con F5, el estado de React se reinicia y el carrito se vacía. ¿Cómo se podría solucionar?

**Pista:** el navegador tiene mecanismos de almacenamiento local que no dependen de React...

```
localStorage   →  persiste aunque se cierre el navegador
sessionStorage →  persiste solo mientras dure la pestaña
```

> Investiga cómo combinar `localStorage` con `useState` o `useEffect` dentro del `CartProvider` para que el carrito se guarde y se recupere automáticamente. Es un reto que os proponemos resolver por vuestra cuenta.
>
> **Pista extra:** ¿podría ser esto un custom hook llamado `useLocalStorage`?
