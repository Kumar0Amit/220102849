import express from "express";
import { createShortUrl, redirectShortUrl, getUrlStats } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorturls", createShortUrl);
router.get("/:shortcode", redirectShortUrl);
router.get("/shorturls/:shortcode", getUrlStats);

export default router;
