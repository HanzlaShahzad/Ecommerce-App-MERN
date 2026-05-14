import { useState } from "react";
import { useDispatch } from "react-redux";
import { signinUser } from "../Thunks/signupAndSigninThunk";
import { login } from "../Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Added for better UX

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ← New: Error state
  const [loading, setLoading] = useState(false); // ← New: Loading state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Clear previous error
    setLoading(true);

    try {
      const res = await dispatch(signinUser({ email, password }));

      if (res.meta.requestStatus === "fulfilled" && res.payload) {
        dispatch(login(res.payload));
        navigate("/");
      } else {
        const errorMessage =
          res.payload?.message ||
          res.error?.message ||
          "Invalid email or password. Please try again.";

        setError(errorMessage);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("Signin error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
            disabled={loading}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-500"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-xl font-medium transition-all"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
