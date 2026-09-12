import type { NextApiRequest, NextApiResponse } from "next";
import { handleStripeWebhook, Env } from "../../src/handlers/stripe-webhook";

export const config = {
  api: {
    bodyParser: false, // Wymagane dla surowego body Stripe
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const buf = await buffer(req);
    const rawBody = buf.toString("utf8");

    // Budujemy wirtualny obiekt Request natywny dla Web API
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || "localhost";
    const url = `${protocol}://${host}${req.url}`;

    const webRequest = new Request(url, {
      method: "POST",
      headers: req.headers as Record<string, string>,
      body: rawBody,
    });

    const env: Env = {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
      SUPABASE_URL: process.env.SUPABASE_URL || "",
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY || "",
      RESEND_API_KEY: process.env.RESEND_API_KEY || "",
      RESEND_FROM: process.env.RESEND_FROM || "",
      GOOGLE_SHEET_URL: process.env.GOOGLE_SHEET_URL || "",
    };

    const response = await handleStripeWebhook(webRequest, env);
    const responseText = await response.text();

    return res.status(response.status).send(responseText);
  } catch (error: any) {
    console.error("Webhook route error:", error);
    return res.status(500).json({ error: error.message });
  }
}
