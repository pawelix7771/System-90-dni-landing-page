import Stripe from "stripe";

// ————————————————————————————————————————————————
// Logika create-checkout — przeniesiona z functions/api/create-checkout.ts
// (konwencja klasycznych Cloudflare Pages) do zwykłej funkcji wołanej
// przez router w src/index.ts (nowy, ujednolicony model Workers).
// Sama logika Stripe jest identyczna jak wcześniej.
// ————————————————————————————————————————————————

export interface Env {
  STRIPE_SECRET_KEY: string;
  SITE_URL: string; // np. https://ogarnijpieniadze.pl
  ASSETS: Fetcher;
}

interface RequestBody {
  video_id?: string;
  utm_source?: string;
}

export async function handleCreateCheckout(
  request: Request,
  env: Env
): Promise<Response> {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-08-26.dahlia",
    httpClient: Stripe.createFetchHttpClient(),
  });

  let body: RequestBody = {};
  try {
    body = await request.json();
  } catch {
    // brak body / złe body — dalej działamy z pustymi wartościami
  }

  const { video_id, utm_source } = body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      automatic_payment_methods: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: "pln",
            unit_amount: 3999, // 39,99 zł w groszach
            product_data: {
              name: "System 90 dni — wyjdź z życia od wypłaty do wypłaty",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        video_id: video_id ?? "brak",
        utm_source: utm_source ?? "brak",
      },
      success_url: `${env.SITE_URL}/dziekujemy?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.SITE_URL}/?anulowano=1`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return new Response(
      JSON.stringify({ 
        error: err?.message || "Nie udało się utworzyć sesji płatności.",
        type: err?.type,
        code: err?.code
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  }
}
