import { useEffect, useState } from "react";
import styles from "../styles/CookieBanner.module.css";

// ————————————————————————————————————————————————
// Banner cookies — pokazuje się raz, przy pierwszej wizycie,
// dopóki użytkownik nie wybierze jednej z opcji. Wybór zapisujemy
// w localStorage, więc banner nie wraca przy kolejnych wizytach
// (chyba że użytkownik wyczyści dane przeglądarki).
//
// To NIE jest to samo co zgoda na utratę prawa odstąpienia przy
// zakupie (ten checkbox jest osobno, przy przycisku "Kup teraz")
// — to ogólna zgoda RODO na pliki cookies/analitykę na stronie.
//
// Jeśli dodasz GA4/Plausible, sprawdź w kodzie trackera wartość
// localStorage.getItem("cookie_consent") === "all" przed
// załadowaniem skryptu analitycznego — przy "necessary" nie
// powinien się on uruchamiać.
// ————————————————————————————————————————————————

const STORAGE_KEY = "cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      setVisible(true);
    }
  }, []);

  function choose(value: "all" | "necessary") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Zgoda na cookies">
      <p className={styles.text}>
        Używamy plików cookies do działania strony i analizy ruchu.
        Szczegóły w{" "}
        <a href="/polityka-prywatnosci">polityce prywatności</a>.
      </p>
      <div className={styles.actions}>
        <button
          className={styles.secondaryButton}
          onClick={() => choose("necessary")}
        >
          Tylko niezbędne
        </button>
        <button
          className={styles.primaryButton}
          onClick={() => choose("all")}
        >
          Akceptuję wszystkie
        </button>
      </div>
    </div>
  );
}
