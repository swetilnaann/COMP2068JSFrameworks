const express = require("express");
const path = require("path");
const cartLogic = require("./src/cart");

const app = express();
app.use(express.json());

// This is our "database" (in memory)
let cart = [];
let activeCoupon = null;

// Simple stock per product (for demo)
const PRODUCT_STOCK = {
  1: 10, // T-Shirt
  2: 5,  // Hat
  3: 4,  // Shoes
  4: 3,  // Hoodie
  5: 20, // Socks
  6: 2,  // Sunglasses
};

app.use(express.static(path.join(__dirname, "public")));

// Helper to compute subtotal, discount, shipping, tax, total
function getCartSummary() {
  const subtotal = cartLogic.calculateSubtotal(cart);

  // Coupon: SAVE10 = 10% off subtotal
  const discount =
    activeCoupon === "SAVE10" ? subtotal * 0.1 : 0;

  const subtotalAfterDiscount = subtotal - discount;

  // Shipping: $5 if subtotalAfterDiscount < 50 and > 0, otherwise free
  const shipping =
    subtotalAfterDiscount > 0 && subtotalAfterDiscount < 50 ? 5 : 0;

  const taxableAmount = subtotalAfterDiscount + shipping;
  const tax = cartLogic.calculateTax(taxableAmount);
  const total = cartLogic.calculateTotal(taxableAmount, tax);

  return { subtotal, discount, shipping, tax, total, activeCoupon };
}

// Get full cart (used on cart page + cart count)
app.get("/api/cart", (req, res) => {
  const summary = getCartSummary();
  res.json({ cart, ...summary });
});

// Add item to cart (with quantity + stock check)
app.get("/api/add", (req, res) => {
  const { id, name, price, qty } = req.query;

  const productId = Number(id);
  const quantity = Math.max(1, Number(qty) || 1);
  const unitPrice = Number(price);

  const maxStock = PRODUCT_STOCK[productId] ?? Infinity;
  const existing = cart.find((item) => item.id === productId);
  const currentQty = existing ? existing.quantity : 0;

  if (currentQty + quantity > maxStock) {
    const summary = getCartSummary();
    return res
      .status(400)
      .json({
        cart,
        ...summary,
        error: `Not enough stock available. Max: ${maxStock} items.`,
      });
  }

  cart = cartLogic.addItem(cart, {
    id: productId,
    name,
    price: unitPrice,
    quantity,
  });

  const summary = getCartSummary();
  res.json({ cart, ...summary });
});

// Remove item from cart (one unit at a time)
app.get("/api/remove", (req, res) => {
  const { id } = req.query;

  cart = cartLogic.removeItem(cart, Number(id));

  const summary = getCartSummary();
  res.json({ cart, ...summary });
});

// Clear cart
app.get("/api/clear", (req, res) => {
  cart = cartLogic.clearCart();
  activeCoupon = null;   
  const summary = getCartSummary();
  res.json({ cart, ...summary });
});



// Apply coupon
app.get("/api/coupon", (req, res) => {
  const { code } = req.query;

  if (!code) {
    activeCoupon = null;
    const summary = getCartSummary();
    return res.json({
      cart,
      ...summary,
      error: "No coupon code provided.",
    });
  }

  const normalized = code.toUpperCase();

  if (normalized === "SAVE10") {
    activeCoupon = normalized;
    const summary = getCartSummary();
    return res.json({ cart, ...summary });
  } else {
    activeCoupon = null;
    const summary = getCartSummary();
    return res.json({
      cart,
      ...summary,
      error: "Invalid coupon code.",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Demo app running on port " + PORT));
