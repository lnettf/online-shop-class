import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

export const ProductCard = ({ product }) => {
  return (
    <Link to={"product/" + product.id} className={styles.card}>
      <div>
        <h2>{product.name}</h2>
        <img src={product.imageUrl} />
        <p>{product.description}</p>
        <h4>{product.price}€</h4>
      </div>
    </Link>
  );
};
