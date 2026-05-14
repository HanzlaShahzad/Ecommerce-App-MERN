import { useLocation } from "react-router-dom";
// import { stripePromise } from "../../Stripe/stripe";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  // 🧮 CALCULATIONS
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = 5;
  const tax = 3;
  const total = subtotal + shipping + tax;

  // 💳 STRIPE PAYMENT
  const handlePayNow = async () => {
    try {
      if (!cartItems || cartItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      const { data } = await axios.post(
        "http://localhost:2000/create-checkout-session",
        { cartItems },
      );

      window.location.href = data.url;
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">
          {/* SHIPPING */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                className="border p-2 rounded-xl"
                placeholder="First Name"
              />
              <input
                className="border p-2 rounded-xl"
                placeholder="Last Name"
              />
              <input
                className="border p-2 rounded-xl col-span-2"
                placeholder="Address"
              />
              <input className="border p-2 rounded-xl" placeholder="City" />
              <input
                className="border p-2 rounded-xl"
                placeholder="Postal Code"
              />
            </div>
          </div>

          {/* PAYMENT UI (Stripe will handle real payment) */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" defaultChecked />
                <span>Credit / Debit Card (Stripe)</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" />
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-6 rounded-2xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* 🛒 PRODUCTS */}
          <div className="space-y-3">
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-center">Cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`http://localhost:2000/uploads/${item.image}`}
                      className="w-10 h-10 object-contain"
                      alt={item.name}
                    />
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                  </div>

                  <span>${item.price * item.quantity}</span>
                </div>
              ))
            )}
          </div>

          {/* 💰 PRICING */}
          <div className="border-t mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax}</span>
            </div>
          </div>

          {/* 🔥 TOTAL */}
          <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>

          {/* 💳 PAY BUTTON */}
          <button
            onClick={handlePayNow}
            className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
