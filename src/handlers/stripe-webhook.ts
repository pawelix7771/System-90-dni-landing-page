import Stripe from "stripe";

export interface Env {
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
  RESEND_API_KEY: string;
  RESEND_FROM: string;
  GOOGLE_SHEET_URL: string;
}

async function saveEvent(
  env: Env,
  row: {
    event_type: string;
    video_id: string;
    utm_source: string;
    amount: number | null;
    stripe_session_id: string;
  }
) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/checkout_events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: env.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${text}`);
  }
}

async function sendConfirmationEmail(
  env: Env,
  to: string,
  orderId: string
) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to,
      subject: "Twój arkusz System 90 dni jest gotowy",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1c2b3a;">
          <p style="font-size: 24px; font-weight: 600; margin-bottom: 4px;">90 dni</p>
          <h1 style="font-size: 20px; margin: 0 0 16px;">Dziękujemy za zakup</h1>
          <p>Kliknij poniższy przycisk, żeby zrobić własną kopię arkusza na swoim koncie Google — od tej pory jest tylko Twój.</p>
          <p style="margin: 24px 0;">
            <a href="${env.GOOGLE_SHEET_URL}" style="background:#c89b3c; color:#1c2b3a; text-decoration:none; padding:14px 24px; border-radius:3px; font-weight:600; display:inline-block;">
              Otwórz mój arkusz
            </a>
          </p>
          <p style="font-size: 13px; color: #4a5a6a;">Numer zamówienia: ${orderId}</p>
          <p style="font-size: 13px; color: #4a5a6a;">Coś nie działa? Odpisz na tego maila — pomożemy ręcznie.</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend send failed: ${res.status} ${text}`);
  }
}

export async function handleStripeWebhook(request: Request, env: Env) {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-08-26.dahlia" as any,
    httpClient: Stripe.createFetchHttpClient(),
  });

  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  if (!signature) {
    return new Response("Brak podpisu Stripe.", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Nieprawidłowy podpis webhooka:", err);
    return new Response("Nieprawidłowy podpis.", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.expired"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      await saveEvent(env, {
        event_type: event.type,
        video_id: session.metadata?.video_id ?? "brak",
        utm_source: session.metadata?.utm_source ?? "brak",
        amount: session.amount_total,
        stripe_session_id: session.id,
      });
    } catch (err) {
      console.error("Błąd zapisu do Supabase:", err);
    }

    if (event.type === "checkout.session.completed") {
      const email = session.customer_details?.email;
      if (email) {
        try {
          await sendConfirmationEmail(env, email, session.id);
        } catch (err) {
          console.error("Błąd wysyłki maila przez Resend:", err);
        }
      } else {
        console.error(
          `Brak adresu e-mail w sesji ${session.id} — nie wysłano maila.`
        );
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
