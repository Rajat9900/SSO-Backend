const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
// const authRoutes = require('./routes/auth');
const PORT = 5000;
const connectDb = require("./Database/db");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = "Ov23liSKW2HBbzKe5BQ1";
const CLIENT_SECRET = "255b4d74126e78c74b7b97a41b593d363a023fbb";

app.post("/exchange-code", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const start = async () => {
    try {
      await connectDb(process.env.MONGODB_URL); 
      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  };
start()