import type { AppProps } from "next/app";
import Head from "next/head";
import CookieBanner from "../components/CookieBanner";

// ————————————————————————————————————————————————
// _app.tsx — jedyne miejsce, gdzie trzeba wpiąć rzeczy wspólne dla
// wszystkich stron: fonty (Fraunces + IBM Plex Sans) i banner
// cookies, żeby nie kopiować tego do każdej strony osobno.
// ————————————————————————————————————————————————

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=IBM+Plex+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      <CookieBanner />
    </>
  );
}
