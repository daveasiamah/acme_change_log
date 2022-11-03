import { Router } from "express";
import { protect } from "./modules/auth";

const router = Router();
/**
 * Product routes
 */
router.get("/product", protect, (req, res) => {
  res.json({ message: "Here you go, a list of products? ;<" });
});
router.get("/product/:id", () => {});
router.post("/product", () => {});
router.put("/product/:id", () => {});
router.patch("/product/:id", () => {});
router.delete("/product/:id", () => {});

/**
 * Update routes
 */
router.get("/update_product", () => {});
router.get("/update_product/:id", () => {});
router.post("/update_product", () => {});
router.put("/update_product/:id", () => {});
router.patch("/update_product/:id", () => {});
router.delete("/update_product/:id", () => {});

export default router;
