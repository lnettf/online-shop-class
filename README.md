# Online Shop — Tarea de Clase

Proyecto de práctica para el curso de React. Consiste en una tienda online con una fake API REST que sirve productos de tecnología, y dos vistas principales: listado de productos y detalle de producto.

## Requisitos previos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
npm install react-router-dom axios
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

La aplicación tiene dos rutas:

| Ruta            | Descripción                     |
| --------------- | ------------------------------- |
| `/`             | Listado de todos los productos  |
| `/products/:id` | Detalle de un producto concreto |

**Configuración básica en `App.jsx`:**

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Para navegar al detalle desde una tarjeta se usa `useNavigate` o el componente `<Link>`:

```jsx
import { Link } from "react-router-dom";

<Link to={`/products/${product.id}`}>Ver detalle</Link>;
```

Para leer el `:id` de la URL en la página de detalle se usa `useParams`:

```jsx
import { useParams } from "react-router-dom";

const { id } = useParams();
```

---

## Peticiones HTTP con Axios

Instalar: `npm install axios`

**Listado de productos:**

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setProducts(res.data));
  }, []);
}
```

**Detalle de producto:**

```jsx
import axios from "axios";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProduct(res.data));
  }, [id]);
}
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

Se propone la siguiente organización. **Es importante mantenerla limpia y bien separada** — cada archivo debe tener una responsabilidad clara.

```
online-shop/
├── db.json
├── src/
│   ├── main.jsx
│   ├── App.jsx                          # Solo rutas, nada más
│   │
│   ├── pages/                           # Una página por ruta
│   │   ├── ProductListPage.jsx
│   │   └── ProductDetailPage.jsx
│   │
│   ├── components/                      # Componentes reutilizables
│   │   ├── ProductList/
│   │   │   ├── ProductList.jsx          # Grid o lista de tarjetas
│   │   │   └── ProductCard.jsx          # Una sola tarjeta de producto
│   │   │
│   │   └── ProductDetail/
│   │       ├── ProductDetail.jsx        # Contenedor del detalle
│   │       ├── ProductImage.jsx         # Solo la imagen
│   │       └── ProductInfo.jsx          # Nombre, precio, descripción...
│   │
│   ├── hooks/                           # Custom hooks (ver sección más abajo)
│   │   ├── useProducts.js
│   │   └── useProduct.js
│   │
│   └── context/
│       └── CartContext.jsx              # (extra) Contexto del carrito
│
├── package.json
└── vite.config.js
```

> Las páginas (`pages/`) son el punto de entrada de cada ruta. No deben tener lógica visual compleja — su trabajo es orquestar los componentes y pasarles datos.

---

## Dividir bien los componentes

Una de las habilidades más importantes en React es saber **cuándo extraer un componente**. Un componente debería hacer una sola cosa bien. Si tienes que poner un comentario para separar partes del JSX, probablemente ahí hay un componente nuevo esperando.

### Preguntas para reflexionar

Antes de escribir código, piensa en estas preguntas. No hay una única respuesta correcta, pero razonarlas te ayudará a tomar mejores decisiones.

**Sobre el listado:**

- `ProductList` renderiza todas las tarjetas. ¿Tiene sentido que también defina cómo se ve cada tarjeta? ¿O eso debería ser responsabilidad de otro componente?
- ¿Qué props necesita recibir `ProductCard` para funcionar de forma independiente?
- Si mañana quisieras mostrar las tarjetas en un slider en lugar de una cuadrícula, ¿cuántos archivos tendrías que tocar?

**Sobre el detalle:**

- La página de detalle tiene imagen, título, precio, descripción y stock. ¿Todo eso en un único componente o lo separarías? ¿Por qué?
- `ProductImage` y `ProductInfo` son candidatos claros a ser componentes separados. ¿Qué props recibiría cada uno?
- Si el diseño de la imagen cambia (tamaño, forma, borde), ¿preferirías tocar un componente específico o buscar la imagen dentro de un componente grande?

**Sobre reutilización:**

- ¿Hay algún elemento (por ejemplo, el precio o la etiqueta de categoría) que aparezca tanto en la tarjeta como en el detalle? ¿Tendría sentido convertirlo en un componente propio?
- ¿Qué criterio usarías para decidir si algo va en `components/` o directamente en la página?

---

## Custom Hooks

Un **custom hook** es simplemente una función de JavaScript que empieza por `use` y puede llamar a otros hooks de React (`useState`, `useEffect`, etc.).

Sirven para **extraer lógica fuera del componente** cuando esa lógica es reutilizable o hace el componente demasiado largo. El componente se queda solo con el JSX; el hook se queda con el "cómo se obtienen los datos".

**Sin custom hook** — la lógica de fetch vive dentro del componente:

```jsx
function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Error al cargar el producto"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return <ProductDetail product={product} />;
}
```

**Con custom hook** — la lógica se mueve a `hooks/useProduct.js`:

```js
// src/hooks/useProduct.js
import { useState, useEffect } from "react";
import axios from "axios";

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError("Error al cargar el producto"))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}
```

El componente queda limpio:

```jsx
// src/pages/ProductDetailPage.jsx
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";

function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  return <ProductDetail product={product} />;
}
```

### Pregunta sobre custom hooks

- ¿Podrías crear un hook `useProducts` (sin id) para el listado de productos? ¿Qué devolvería?

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
  <App />
</CartProvider>;
```

**Usar el contexto en cualquier componente:**

```jsx
import { useCart } from '../context/CartContext'

const { cart, addToCart } = useCart()

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
   
 