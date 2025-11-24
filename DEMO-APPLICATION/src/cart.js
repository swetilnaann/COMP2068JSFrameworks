// cart.js – Shopping Cart Logic

function addItem(cart, item) {
  const existing = cart.find((i) => i.id === item.id);

  if (existing) {
    existing.quantity += item.quantity; // increase quantity
  } else {
    cart.push({ ...item });
  }

  return cart;
}

function removeItem(cart, itemId) {
  return cart.reduce((newCart, item) => {
    if (item.id !== itemId) {
      newCart.push(item);
    } else {
      if (item.quantity > 1) {
        newCart.push({
          ...item,
          quantity: item.quantity - 1,
        });
      }
    }
    return newCart;
  }, []);
}

function findItem(cart, itemId) {
  return cart.find((i) => i.id === itemId);
}

function calculateSubtotal(cart) {
  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

function calculateTax(subtotal, taxRate = 0.13) {
  return subtotal * taxRate;
}

function calculateTotal(subtotal, tax) {
  return subtotal + tax;
}

function clearCart() {
  return [];
}

module.exports = {
  addItem,
  removeItem,
  findItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  clearCart,
};
