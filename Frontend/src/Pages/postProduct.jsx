import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ Added for navigation
import { postProducts } from "../Thunks/productsThunks";

export default function ProductFormUI() {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [discount, setDiscount] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Added navigation hook

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      !file ||
      price === "" ||
      discount === "" ||
      stock === "" ||
      manufacturer === "" ||
      category === "" ||
      description === ""
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    formData.append("discount", discount);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("manufacturer", manufacturer);
    formData.append("category", category);
    formData.append("description", description);

    dispatch(postProducts(formData));

    setName("");
    setFile(null);
    setDiscount("");
    setPrice("");
    setStock("");
    setManufacturer("");
    setCategory("");
    setDescription("");

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  // ✅ Back to Home function
  const handleBackToHome = () => {
    navigate("/"); // Change "/" to your home route
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Product 🛒</h2>
          {/* ✅ Back to Home Button */}
          <button
            onClick={handleBackToHome}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 transition-all duration-200 hover:scale-105"
          >
            ← Back to Home
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-2 rounded-lg bg-gray-50 cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
            />
          </div>

          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product Description"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Discount */}
          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Stock */}
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Manufacturer */}
          <input
            type="text"
            placeholder="Manufacturer"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Category */}
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          {/* Buttons Container */}
          <div className="flex gap-3 pt-2">
            <button
              type="button" // ✅ Changed to button (not submit)
              onClick={handleBackToHome}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
