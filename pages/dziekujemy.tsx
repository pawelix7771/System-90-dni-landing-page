import { useEffect, useState } from "react";
import styles from "../styles/ThankYou.module.css";

// ————————————————————————————————————————————————
// pages/dziekujemy.tsx
// success_url w create-checkout.ts kieruje tu z parametrem
// ?session_id={CHECKOUT_SESSION_ID} — używamy go tylko do
// pokazania numeru zamówienia, nie do weryfikacji płatności
// (weryfikacja i wysyłka linku do arkusza dzieje się po stronie
// webhooka, niezależnie od tego, czy klient w ogóle trafi na tę
// stronę — np. zamknięcie karty tuż po płatności).
// ————————————————————————————————————————————————

export default function ThankYou() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    setSessionId(url.searchParams.get("session_id"));
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrowNumber}>90 dni</p>
        <h1 className={styles.heading}>Zaczyna się teraz</h1>
        <p className={styles.body}>
          Dziękujemy za zakup. Link do arkusza i instrukcja
          skopiowania go na Twoje konto Google trafiły właśnie
          na adres e-mail podany przy płatności.
        </p>
        <p className={styles.body}>
          Nie widzisz wiadomości w ciągu kilku minut? Sprawdź
          folder spam albo napisz do nas — pomożemy ręcznie.
          <br /><br />
          <b>W razie problemów prosimy o kontakt na adres  e-mail: ogarnijpieniadze@wp.pl</b>
        </p>


        {sessionId && (
          <p className={styles.orderId}>Numer zamówienia: {sessionId}</p>
        )}
      </div>
    </main>
  );
}
