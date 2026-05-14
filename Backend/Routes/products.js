import express from "express";
import uploads from "../Multer/productsImages.js";
import { Signin, Signup } from "../Controllers/signup.js";
import { getUsers } from "../Controllers/getProducts.js";
import { createProducts, deleteProduct, getProducts } from "../Controllers/products.js";
import { AuthToken, isAdmin } from "../Services/authToken.js";

const router = express.Router();

router.post('/products', AuthToken, isAdmin, uploads.single("image"), createProducts);
router.get('/products', getProducts);
router.get('/getUsers', getUsers);
router.delete('/products/:id', AuthToken, isAdmin, deleteProduct);
// ✅ AUTH ROUTES
router.post('/signup', Signup);
router.post('/signin', Signin);

export default router;