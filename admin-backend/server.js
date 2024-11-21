const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package

const app = express();

// Enable CORS for all origins or configure it as needed
app.use(cors()); // This will allow requests from any origin

admin.initializeApp({
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
  client_x509_cert_url: process.env.CLIENT_URI,
  universe_domain: process.env.UNIVERSE_DOMAIN,
});

const db = admin.firestore();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add superadmins
app.post("/admins/superadmins", async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password) {
      return res.status(400).send("All fields are required!");
    }
    const superadmin = { name, surname, email, password };
    const id = email;
    await db.collection("generalAdmins").doc(id).set(superadmin);
    res.status(201).send("Superadmin added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add generaladmins
app.post("/admins/generalAdmins", async (req, res) => {
  try {
    const { email, password } = req.body;
    const generaladmin = await generaladmin.findOne({ email });

    if (!generaladmin) {
      res.status(404).json({ message: "General Admin not found" });
    }
    if (generaladmin.password !== password) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
    res.status(200).json({ message: "Login Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
