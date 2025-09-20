import axios from "axios";

const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;

    const logData = {
      stack: "backend",
      level: "info",
      package: "handler",
      message: `${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    };

    try {
      await axios.post(
        "http://20.244.56.144/evaluation-service/logs",
        logData,
        {
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          },
        }
      );
    } catch (err) {
    }
  });

  next(); 
};

export default requestLogger;
