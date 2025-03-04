// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { db } from "../../components/googleSignin/config"; // Firestore setup
import { doc, setDoc, Timestamp } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Handling req:", req, "Handling res:", res);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let event;

  try {
    event = req.body;
  } catch (error) {
    return res.status(400).json({ error: "Webhook error: " + error });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { beatUrl, beatName, userEmail } = session.metadata;

    try {
      const purchaseRef = doc(db, "purchases", session.id);
      await setDoc(purchaseRef, {
        email: userEmail,
        beatUrl,
        beatName,
        purchasedAt: Timestamp.now(),
      });

      console.log("Purchase recorded in Firestore.");
    } catch (error) {
      console.error("Firestore Error:", error);
      return res.status(500).json({ error: "Error saving to Firestore" });
    }
  }

  res.status(200).json({ received: true });
}
