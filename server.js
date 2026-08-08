// server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Dummy in-memory data
let guides = [
  { name: "Alice Johnson", description: "Expert guide in Paris", rating: 4.9 },
  { name: "Ken Takahashi", description: "Tokyo cultural expert", rating: 4.8 },
];

// ---------- Routes ---------- //

// Health check
app.get("/", (req, res) => {
  res.send("✅ TravelTwist Backend is running...");
});

// Handle flight search
app.post("/api/flights", (req, res) => {
  const { from, to, departureDate } = req.body;
  if (!from || !to || !departureDate) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Mock results
  const flights = [
    {
      airline: "AirTwist",
      from,
      to,
      departureDate,
      price: "₹25,000",
    },
    {
      airline: "SkyJet",
      from,
      to,
      departureDate,
      price: "₹22,500",
    },
  ];

  res.json({ flights });
});

// Guides - get all
app.get("/api/guides", (req, res) => {
  res.json(guides);
});

// Guides - add new
app.post("/api/guides", (req, res) => {
  const { name, experience, languages, price } = req.body;
  if (!name || !experience || !languages || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newGuide = {
    name,
    description: `${experience}, Languages: ${languages}, Price: ₹${price}/day`,
    rating: 4.5, // default rating
  };

  guides.push(newGuide);
  res.json({ message: "Guide added successfully", guide: newGuide });
});

// Sign In (dummy auth)
app.post("/api/signin", (req, res) => {
  const { email, password } = req.body;
  if (email === "test@travel.com" && password === "12345") {
    return res.json({ success: true, message: "Sign In successful ✅" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials ❌" });
});

// SOS trigger
app.post("/api/sos", (req, res) => {
  const { location } = req.body;
  console.log("🚨 SOS Triggered from location:", location);
  res.json({ message: "SOS alert sent to authorities 🚨" });
});

// ---------- Start server ---------- //

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
