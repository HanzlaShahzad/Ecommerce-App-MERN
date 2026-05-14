import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import ProductFormUI from "./Pages/postProduct";
import SignupPage from "./Pages/signup";
import SigninPage from "./Pages/signin";
import CheckoutPage from "./Pages/checkout";
import ProtectedRoutes from "./ProtectedRoutes/protectedCheckout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/addProducts",
      element: (
        <ProtectedRoutes>
          <ProductFormUI />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/signin",
      element: <SigninPage />,
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoutes>
          <CheckoutPage />
        </ProtectedRoutes>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
