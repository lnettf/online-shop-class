import { useCart } from "../../../context/CartContext";

export const useCheckout = () => {
  const { cart, add, subtract, subtractAllById, clear } = useCart();

  const productsGroup = cart.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].count = acc[item.id].count + 1;
    } else {
      acc[item.id] = item;
      acc[item.id].count = 1;
    }

    return acc;
  }, {});

  const subtractItem = (productId) => {
    subtract(productId);
  };

  const addItem = (product) => {
    add(product);
  };

  const subtractAllItemsById = (productId) => {
    subtractAllById(productId);
  };

  const removeAllItems = () => {
    clear();
  };

  return {
    productsGroup,
    subtractItem,
    addItem,
    subtractAllItemsById,
    removeAllItems,
  };
};
