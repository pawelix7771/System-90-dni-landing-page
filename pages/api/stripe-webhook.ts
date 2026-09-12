import type { NextApiRequest, NextApiResponse } from 'next';
import { onRequestPost } from '../../src/handlers/stripe-webhook';

export const config = {
  api: {
    bodyParser: false, // Wymagane przez Stripe do weryfikacji podpisu
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  return onRequestPost(req, res);
}