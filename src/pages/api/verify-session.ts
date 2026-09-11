import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  if (!session_id || typeof session_id !== "string") {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(402).json({ error: "Payment not completed" });
    }

    return res.status(200).json({
      beatName: session.metadata?.beatName,
      beatUrl: session.metadata?.beatUrl,
    });
  } catch (error) {
    console.error("Error verifying session:", error);
    return res.status(500).json({ error: "Could not verify session" });
  }
}