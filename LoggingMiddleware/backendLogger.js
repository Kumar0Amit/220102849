import axios from "axios";

const Log = async (stack, level, packageName, message) => {
  try {
    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      { stack, level, package: packageName, message },
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
  } catch (err) {
  }
};

export default Log;
