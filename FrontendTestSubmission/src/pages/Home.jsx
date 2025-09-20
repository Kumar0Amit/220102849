import { useState } from "react";
import { shortenUrls } from "../api/urlApi";
import { useLogger } from "@logger/frontendLogger";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent
} from "@mui/material";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const logger = useLogger("Home");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return alert("URL cannot be empty!");

    try {
      new URL(originalUrl); // Validate
      const res = await shortenUrls([{ originalUrl }]);
      setShortenedUrl(res[0].shortlink);
      logger("info", "api", "Successfully shortened URL.");
    } catch (err) {
      logger("error", "api", err.message);
      alert("Failed to shorten URL.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom align="center">
        URL Shortener
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Enter Original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Shorten URL
        </Button>
      </form>

      {shortenedUrl && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Shortened URL:
            </Typography>
            <Typography variant="body1" color="primary">
              {shortenedUrl}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
