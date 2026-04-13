import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/* ===============================
   ADD TO CART
================================= */
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    res.json({ message: "Item added to cart" });

  } catch (error) {
    console.log("Add to cart error:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ===============================
   UPDATE QUANTITY (+ / -)
================================= */
export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, type } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (type === "increase") {
      cart.items[itemIndex].quantity += 1;
    }

    if (type === "decrease") {
      cart.items[itemIndex].quantity -= 1;

      // 🔥 REMOVE IF ZERO
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    }

    await cart.save();

    res.json({ message: "Cart updated" });

  } catch (error) {
    console.log("Update quantity error:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ===============================
   GET CART
================================= */
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);

  } catch (error) {
    console.log("Get cart error:", error);
    res.status(500).json({ message: error.message });
  }
};
