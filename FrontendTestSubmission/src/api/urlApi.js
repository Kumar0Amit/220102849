import axios from "axios";

const BASE_URL = "http://localhost:3000";

/**
 * Shorten multiple URLs
 * @param {Array} urls - Array of objects: { originalUrl, shortCode?, validity? }
 */
export const shortenUrls = async (urls) => {
  const responses = await Promise.all(
    urls.map((url) => axios.post(`${BASE_URL}/shorturls`, url))
  );

  return responses.map((res) => {
    const shortlink = res.data.shortlink; 
    const shortcode = shortlink.split("/").pop(); 
    return { ...res.data, shortcode };
  });
};

/**
 * Get stats for a shortcode
 * @param {string} shortcodeOrUrl 
 */
export const getUrlStats = async (shortcodeOrUrl) => {
  const shortcode = shortcodeOrUrl.includes("/")
    ? shortcodeOrUrl.split("/").pop()
    : shortcodeOrUrl;

  try {
    const res = await axios.get(`${BASE_URL}/shorturls/${shortcode}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Get all shortened URLs
 */
export const getAllUrls = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/shorturls`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
