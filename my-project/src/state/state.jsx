import { atom } from "jotai";

// Atom to store the cart items
export const cartAtom = atom({});

// Atom to store the total quantity of items in the cart
export const totalQuantityAtom = atom((get) => {
  const cart = get(cartAtom);
  return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
});

// Atom to add an item to the cart
export const addItemToCartAtom = atom(null, (get, set, item) => {
  const cart = get(cartAtom);
  const currentQuantity = cart[item.id]?.quantity || 0;
  const updatedCart = {
    ...cart,
    [item.id]: {
      ...item,
      quantity: currentQuantity + 1,
    },
  };
  set(cartAtom, updatedCart);
});

// Atom to remove an item from the cart
export const removeItemFromCartAtom = atom(null, (get, set, itemId) => {
  const cart = get(cartAtom);
  const { [itemId]: removedItem, ...restCart } = cart;
  set(cartAtom, restCart);
});

// Atom to clear the cart
export const clearCartAtom = atom(null, (get, set) => {
  set(cartAtom, {});
});
