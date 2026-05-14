import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Slices/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ GET FROM REDUX
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          MyStore
        </h1>

        <ul className="hidden md:flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/Products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {user?.role === "admin" && (
            <Link to="/addProducts" className="text-yellow-300">
              Add Product
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/signin"
                className="bg-white text-black px-3 py-1 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-black text-white px-3 py-1 rounded"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="relative">
              <div
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={
                    user?.image
                      ? `http://localhost:2000/uploads/${user.image}`
                      : "https://i.pravatar.cc/40"
                  }
                  className="w-8 h-8 rounded-full"
                />
                <span>{user?.fullName}</span>
              </div>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-gradient-to-b from-indigo-600 to-pink-500">
          <Link to="/">Home</Link>
          <Link to="/Products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {user?.role === "admin" && <Link to="/addProducts">Add Product</Link>}

          {!user ? (
            <>
              <Link to="/signin">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img
                  src={
                    user?.image
                      ? `http://localhost:2000/uploads/${user.image}`
                      : "https://i.pravatar.cc/40"
                  }
                  className="w-8 h-8 rounded-full"
                />
                <span>{user?.fullName}</span>
              </div>

              <button onClick={handleLogout} className="text-red-300">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
