import mongoose from "mongoose";
import express from "express";
const app = express();
import cors from "cors";
import router from "./Routes/products.js";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

//Middlewares
app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use('/', router);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,

        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/ecommerce-app")
  .then(() => { console.log("Mongoose connected successfully") })
  .catch((error) => { console.log("Mongoose error===>: ", error) });

//PORT
const PORT = 2000;
app.listen(PORT);