import { useState } from "react";
import { getUrlStats } from "../api/urlApi";
import { useLogger } from "@logger/frontendLogger";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

export default function Stats() {
  const [shortcode, setShortcode] = useState("");
  const [urlData, setUrlData] = useState(null);
  const logger = useLogger("Stats");

  const fetchStats = async () => {
    if (!shortcode.trim()) return alert("Please enter a shortcode");

    try {
      const data = await getUrlStats(shortcode);
      setUrlData(data);
      logger("info", "api", `Fetched stats for ${shortcode}`);
    } catch (err) {
      logger("error", "api", err.message);
      alert("Shortlink not found or error fetching stats.");
      setUrlData(null);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        URL Statistics
      </Typography>

      <TextField
        fullWidth
        label="Enter Shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" fullWidth onClick={fetchStats}>
        Fetch Stats
      </Button>

      {urlData && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              Original URL:
            </Typography>
            <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
              <a href={urlData.originalUrl} target="_blank" rel="noreferrer">
                {urlData.originalUrl}
              </a>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Created: {new Date(urlData.creationDate).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Expiry: {new Date(urlData.expiryDate).toLocaleString()}
            </Typography>
            <Typography variant="body2">
              Total Clicks: {urlData.totalClicks}
            </Typography>

            <List sx={{ mt: 2 }}>
              {urlData.clicks.map((click, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={`Timestamp: ${new Date(click.timestamp).toLocaleString()}`}
                    secondary={`Source: ${click.source || "N/A"}, Location: ${click.location || "N/A"}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
