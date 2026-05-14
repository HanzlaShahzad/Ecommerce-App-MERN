import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../Thunks/productsThunks";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  const { data = [], deletingId } = useSelector((state) => state.items);
  const { user, token } = useSelector((state) => state.auth);

  const [isOpen, setIsopen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Fetch products
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ✅ Delete product
  const handleDelete = (id) => {
    dispatch(deleteProducts({ id }));
  };

  // ✅ Add to cart
  const handleAddToCart = (productID) => {
    const product = data.find((val) => val._id === productID);
    if (!product) return;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item._id === productID,
      );

      if (existingIndex >= 0) {
        return prevItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });

    setIsopen(true);
  };

  // ✅ Update quantity
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item,
      ),
    );
  };

  // ✅ Remove item
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  // ✅ Total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <Navbar />

      {/* 🔥 OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsopen(false)}
        ></div>
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-semibold text-lg">Checkout</h2>
          <button onClick={() => setIsopen(false)}>✖</button>
        </div>

        {/* CART ITEMS */}
        <div className="p-4 space-y-4 overflow-y-auto h-[60%]">
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              🛒 Your cart is empty
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 items-center bg-white p-3 rounded-xl shadow-sm border hover:shadow-md transition"
              >
                {/* IMAGE */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={`http://localhost:2000/uploads/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">
                  <p className="text-sm font-semibold line-clamp-1">
                    {item.name}
                  </p>

                  <p className="text-xs text-gray-500 line-clamp-1">
                    {item.description}
                  </p>

                  <p className="text-sm font-bold text-green-600 mt-1">
                    ${item.price * item.quantity}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item._id, 1)}
                      className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeItem(item._id)}
                  className="text-red-400 hover:text-red-600"
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>

        {/* TOTAL */}
        <div className="p-4 border-t">
          <p className="font-semibold mb-2">Total: ${total}</p>

          <Link
            to={token ? "/checkout" : "/signin"}
            state={{ cartItems }}
            className="w-full block bg-black text-white py-2 rounded text-center hover:bg-gray-800 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>

      {/* PRODUCTS */}
      <ul className="flex flex-wrap justify-center items-start gap-10 p-4">
        {data.map((product) => {
          const discountPercent = product.discount
            ? (product.discount / product.price) * 100
            : 0;

          return (
            <li
              key={product._id}
              className="group w-60 bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* IMAGE */}
              <div className="h-48 bg-gray-100 relative flex items-center justify-center">
                <img
                  className="h-full w-full object-contain p-2"
                  src={`http://localhost:2000/uploads/${product.image}`}
                  alt={product.name}
                />

                {discountPercent > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {discountPercent.toFixed(1)}% OFF
                  </span>
                )}

                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:bottom-2 group-hover:opacity-100 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-3 text-sm flex flex-col gap-1 border-t">
                <p className="font-semibold line-clamp-2">{product.name}</p>

                {/* ✅ NEW DESCRIPTION */}
                <p className="text-xs text-gray-500 line-clamp-2">
                  {product.description || "No description available"}
                </p>

                <p className="font-medium">${product.price}</p>

                <p className="text-xs text-gray-600">
                  {product.manufacturer || "N/A"}
                </p>

                {/* ADMIN BUTTONS */}
                {user?.role === "admin" && (
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 bg-blue-500 text-white text-xs py-1 rounded">
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 bg-red-500 text-white text-xs py-1 rounded"
                    >
                      {deletingId === product._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
