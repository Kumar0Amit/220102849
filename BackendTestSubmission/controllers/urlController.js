import Url from "../models/url.js";
import { nanoid } from "nanoid";
import Log from "../../LoggingMiddleware/backendLogger.js"; // Import your log function

export const createShortUrl = async (req, res) => {
  try {
    const { originalUrl, shortCode, validity } = req.body;

    const code = shortCode || nanoid(6);
    const expiry = new Date(Date.now() + ((validity || 30) * 60 * 1000)); // default 30 mins

    const exists = await Url.findOne({ shortCode: code });
    if (exists) {
      return res.status(400).json({ error: "Shortcode already exists" });
    }

    const newUrl = new Url({ originalUrl, shortCode: code, expiryDate: expiry });
    await newUrl.save();

    Log("backend", "info", "handler", `Created short URL: ${code}`);

    res.status(201).json({
      shortlink: `${req.protocol}://${req.get("host")}/${code}`,
      expiry: expiry
    });
  } catch (err) {
    Log("backend", "error", "handler", `Error creating short URL: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redirectShortUrl = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlDoc = await Url.findOne({ shortCode: shortcode });

    if (!urlDoc) {
      Log("backend", "warn", "handler", `Shortcode not found: ${shortcode}`);
      return res.status(404).json({ error: "Not Found" });
    }

    if (urlDoc.expiryDate < new Date()) {
      Log("backend", "warn", "handler", `Shortcode expired: ${shortcode}`);
      return res.status(410).json({ error: "Expired" });
    }


    urlDoc.clicks.push({
      timestamp: new Date(),
      source: req.headers.referer || "direct",
      location: req.ip
    });
    await urlDoc.save();

    Log("backend", "info", "handler", `Redirecting shortcode: ${shortcode}`);

    res.redirect(urlDoc.originalUrl);
  } catch (err) {
    Log("backend", "error", "handler", `Error redirecting: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUrlStats = async (req, res) => {
  try {
    const { shortcode } = req.params;
    const urlDoc = await Url.findOne({ shortCode: shortcode });

    if (!urlDoc) return res.status(404).json({ error: "Not Found" });

    Log("backend", "info", "handler", `Fetching stats for shortcode: ${shortcode}`);

    res.json({
      originalUrl: urlDoc.originalUrl,
      creationDate: urlDoc.creationDate,
      expiryDate: urlDoc.expiryDate,
      totalClicks: urlDoc.clicks.length,
      clicks: urlDoc.clicks
    });
  } catch (err) {
    Log("backend", "error", "handler", `Error fetching stats: ${err.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
