import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
const razorpaySecret = process.env.RAZORPAY_SECRET;

if (!razorpayKeyId || !razorpaySecret) {
  console.error("RAZORPAY_KEY_ID or RAZORPAY_SECRET is missing!");
} else {
  console.log(`Razorpay credentials loaded. Key ID: ${razorpayKeyId}, Secret length: ${razorpaySecret.length}`);
}

const razorpay = new Razorpay({
  key_id: razorpayKeyId!,
  key_secret: razorpaySecret!,
});

// In-memory usage store (in a real app, use a database)
interface UserUsage {
  creditsUsedToday: number;
  lastResetDate: string;
}
const usageStore: Record<string, UserUsage> = {};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Usage Tracking API
  app.post("/api/usage/check", (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const today = new Date().toISOString().slice(0, 10);
    let user = usageStore[userId];

    if (!user) {
      user = {
        creditsUsedToday: 0,
        lastResetDate: today
      };
      usageStore[userId] = user;
    }

    // Exact logic requested:
    if (user.lastResetDate !== today) {
      user.creditsUsedToday = 0;
      user.lastResetDate = today;
    }

    res.json({
      canUse: user.creditsUsedToday < 5,
      usageLeft: Math.max(0, 5 - user.creditsUsedToday)
    });
  });

  app.post("/api/usage/increment", (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });

    const today = new Date().toISOString().slice(0, 10);
    let user = usageStore[userId];

    if (!user) {
      user = {
        creditsUsedToday: 0,
        lastResetDate: today
      };
      usageStore[userId] = user;
    }

    // Exact logic requested:
    if (user.lastResetDate !== today) {
      user.creditsUsedToday = 0;
      user.lastResetDate = today;
    }

    if (user.creditsUsedToday >= 5) {
      return res.status(403).json({ error: "Daily limit reached" });
    }

    user.creditsUsedToday += 1;
    usageStore[userId] = user;

    res.json({
      success: true,
      usageLeft: Math.max(0, 5 - user.creditsUsedToday)
    });
  });

  // API routes
  app.post("/create-order", async (req, res) => {
    const { amount } = req.body;
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    try {
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ error: "Error creating order" });
    }
  });

  app.post("/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET!)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ status: "success" });
    } else {
      res.status(400).json({ status: "failed", message: "Invalid signature" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
