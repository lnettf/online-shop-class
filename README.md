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

| Servidor | URL | Descripción |
|----------|-----|-------------|
| React (Vite) | http://localhost:5173 | Aplicación frontend |
| Fake API (json-server) | http://localhost:3001 | API REST con productos |

> Si solo quieres levantar la API sin el frontend, puedes usar `npm run api`.

---

## Enrutado con React Router

La aplicación tiene dos rutas:

| Ruta | Descripción |
|------|-------------|
| `/` | Listado de todos los productos |
| `/products/:id` | Detalle de un producto concreto |

**Configuración básica en `App.jsx`:**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
```

Para navegar al detalle desde una tarjeta se usa `useNavigate` o el componente `<Link>`:

```jsx
import { Link } from 'react-router-dom'

<Link to={`/products/${product.id}`}>Ver detalle</Link>
```

Para leer el `:id` de la URL en la página de detalle se usa `useParams`:

```jsx
import { useParams } from 'react-router-dom'

const { id } = useParams()
```

---

## Peticiones HTTP con Axios

Instalar: `npm install axios`

**Listado de productos:**

```jsx
import axios from 'axios'
import { useEffect, useState } from 'react'

function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
  }, [])
}
```

**Detalle de producto:**

```jsx
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(res => setProduct(res.data))
  }, [id])
}
```

---

## Endpoints de la API

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `http://localhost:3001/products` | Lista todos los productos |
| GET | `http://localhost:3001/products/:id` | Obtiene un producto por ID |

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

## Extra: Contexto de pedidos (carrito)

Una vez que el listado y el detalle funcionan, puedes añadir un **contexto global** para gestionar los pedidos del usuario. La idea es tener un estado compartido accesible desde cualquier componente sin pasar props manualmente.

**Crear el contexto:**

```jsx
// src/context/CartContext.jsx
import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart(prev => [...prev, product])
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(p => p.id !== productId))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
```

**Envolver la app con el provider:**

```jsx
// main.jsx
import { CartProvider } from './context/CartContext'

<CartProvider>
  <App />
</CartProvider>
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
localStorage  →  persiste aunque se cierre el navegador
sessionStorage →  persiste solo mientras dure la pestaña
```

> Investiga cómo combinar `localStorage` con `useState` o `useEffect` dentro del `CartProvider` para que el carrito se guarde y se recupere automáticamente. Es un reto que os proponemos resolver por vuestra cuenta.

---

## Páginas a implementar

### 1. Listado de productos `/`

- Consumir `GET /products` con Axios y mostrar todos los productos en tarjetas
- Cada tarjeta debe mostrar: imagen, nombre, categoría y precio
- Al hacer clic navegar al detalle con React Router

### 2. Detalle de producto `/products/:id`

- Leer el `id` de la URL con `useParams`
- Consumir `GET /products/:id` con Axios
- Mostrar: imagen, nombre, descripción, categoría, precio y stock
- Botón para volver al listado

---

## Estructura del proyecto

```
online-shop/
├── db.json                    # Datos de la fake API (10 productos)
├── src/
│   ├── main.jsx
│   ├── App.jsx                # Rutas con React Router
│   ├── context/
│   │   └── CartContext.jsx    # (extra) Contexto del carrito
│   └── pages/
│       ├── ProductList.jsx    # Listado de productos
│       └── ProductDetail.jsx  # Detalle de producto
├── package.json
└── vite.config.js
```
