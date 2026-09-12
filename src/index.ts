import { handleCreateCheckout, type Env as CheckoutEnv } from "./handlers/create-checkout";
import { handleStripeWebhook, type Env as WebhookEnv } from "./handlers/stripe-webhook";

// ————————————————————————————————————————————————
// Pojedynczy punkt wejścia Workera (nowy, ujednolicony model
// Cloudflare — folder `functions/` z klasycznych Pages tu NIE
// działa). Ten plik:
//   1. obsługuje trasy API (/api/create-checkout, /api/stripe-webhook)
//   2. dla wszystkiego innego oddaje ruch do statycznych plików
//      strony (wygenerowanych przez `next build` do folderu `out/`)
//      przez binding `env.ASSETS`, skonfigurowany w wrangler.jsonc.
// ————————————————————————————————————————————————

export interface Env extends CheckoutEnv, WebhookEnv {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/create-checkout") {
      return handleCreateCheckout(request, env);
    }

    if (request.method === "POST" && url.pathname === "/api/stripe-webhook") {
      return handleStripeWebhook(request, env);
    }

    // Wszystko inne (strona produktu, regulamin, polityka, dziekujemy,
    // screenshoty, CSS) — serwowane bezpośrednio ze statycznych plików.
    return env.ASSETS.fetch(request);
  },
};
