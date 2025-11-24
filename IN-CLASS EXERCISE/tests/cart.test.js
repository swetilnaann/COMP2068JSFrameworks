// tests/cart.test.js

const {
  addItem,
  removeItem,
  findItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  clearCart,
} = require("../src/cart");

describe("addItem()", () => {
  test("adds first item to an empty cart", () => {
    const cart = [];

    const result = addItem(cart, {
      id: 1,
      name: "T-Shirt",
      price: 20,
      quantity: 1,
    });

    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject({
      id: 1,
      name: "T-Shirt",
      price: 20,
      quantity: 1,
    });
  });

  test("increases quantity when item already exists", () => {
    const cart = [
      { id: 1, name: "T-Shirt", price: 20, quantity: 1 },
    ];

    const result = addItem(cart, {
      id: 1,
      name: "T-Shirt",
      price: 20,
      quantity: 2,
    });

    expect(result.length).toBe(1);
    expect(result[0].quantity).toBe(3);
  });

  test("adding a different item keeps the first one", () => {
    const cart = [
      { id: 1, name: "T-Shirt", price: 20, quantity: 1 },
    ];

    const result = addItem(cart, {
      id: 2,
      name: "Hat",
      price: 15,
      quantity: 1,
    });

    expect(result.length).toBe(2);
    expect(findItem(result, 1)).toBeDefined();
    expect(findItem(result, 2)).toBeDefined();
  });
});

describe("removeItem()", () => {
  test("decreases quantity by 1 when quantity > 1", () => {
    const cart = [
      { id: 1, name: "T-Shirt", price: 20, quantity: 3 },
    ];

    const result = removeItem(cart, 1);

    expect(result.length).toBe(1);
    expect(result[0].quantity).toBe(2);
  });

  test("removes item completely when quantity is 1", () => {
    const cart = [
      { id: 1, name: "T-Shirt", price: 20, quantity: 1 },
    ];

    const result = removeItem(cart, 1);

    expect(result.length).toBe(0);
  });

  test("does nothing when id does not exist", () => {
    const cart = [
      { id: 1, name: "T-Shirt", price: 20, quantity: 1 },
    ];

    const result = removeItem(cart, 999);

    expect(result).toEqual(cart);
  });

  test("only decreases quantity for the matching item and keeps others", () => {
    const cart = [
      { id: 1, name: "T-Shirt", price: 20, quantity: 1 },
      { id: 2, name: "Hat", price: 15, quantity: 2 },
    ];

    const result = removeItem(cart, 2);

    // item 1 unchanged
    const item1 = findItem(result, 1);
    expect(item1).toBeDefined();
    expect(item1.quantity).toBe(1);

    // item 2 still there but quantity reduced from 2 → 1
    const item2 = findItem(result, 2);
    expect(item2).toBeDefined();
    expect(item2.quantity).toBe(1);
  });
});

describe("findItem()", () => {
  test("returns the matching item", () => {
    const cart = [
      { id: 1, name: "T-Shirt", price: 20, quantity: 1 },
      { id: 2, name: "Hat", price: 15, quantity: 1 },
    ];

    const item = findItem(cart, 2);
    expect(item).toMatchObject({ id: 2, name: "Hat" });
  });

  test("returns undefined if item not found", () => {
    const cart = [
      { id: 1, name: "T-Shirt", price: 20, quantity: 1 },
    ];

    const item = findItem(cart, 999);
    expect(item).toBeUndefined();
  });
});

describe("calculateSubtotal()", () => {
  test("calculates subtotal for multiple items", () => {
    const cart = [
      { price: 20, quantity: 2 }, // 40
      { price: 15, quantity: 1 }, // 15
    ];

    const subtotal = calculateSubtotal(cart);
    expect(subtotal).toBe(55);
  });

  test("returns 0 for empty cart", () => {
    const subtotal = calculateSubtotal([]);
    expect(subtotal).toBe(0);
  });

  test("handles floating point prices", () => {
    const cart = [
      { price: 0.1, quantity: 1 },
      { price: 0.2, quantity: 1 },
    ];

    const subtotal = calculateSubtotal(cart);
    expect(subtotal).toBeCloseTo(0.3);
  });
});

describe("calculateTax() and calculateTotal()", () => {
  test("calculateTax uses 13% by default", () => {
    const tax = calculateTax(100); // 13%
    expect(tax).toBeCloseTo(13);
  });

  test("calculateTax allows a custom rate", () => {
    const tax = calculateTax(200, 0.05); // 5%
    expect(tax).toBeCloseTo(10);
  });

  test("calculateTotal adds subtotal and tax", () => {
    const total = calculateTotal(100, 13);
    expect(total).toBe(113);
  });
});

describe("clearCart()", () => {
  test("returns an empty array", () => {
    const cart = [
      { id: 1, name: "T-Shirt", price: 20, quantity: 1 },
      { id: 2, name: "Hat", price: 15, quantity: 1 },
    ];

    const cleared = clearCart(cart);
    expect(cleared).toEqual([]);
  });
});
