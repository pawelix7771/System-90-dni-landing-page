import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

// ————————————————————————————————————————————————
// Strona produktu: System 90 dni
// Zbiera parametry z URL (np. ?v=test3&utm=tiktok) i przekazuje
// je dalej do /api/create-checkout przy kliknięciu CTA, żeby
// Stripe zapisał je w metadata sesji.
//
// Struktura: każda sekcja to pełnoszerokościowy <section> z własnym
// tłem, a wewnątrz .inner ogranicza treść do czytelnej szerokości.
// To pozwala na bloki koloru pod spodem bez usuwania spójnej kolumny
// tekstu.
//
// Copy w hero/problem/finalCta dopasowana do najlepiej działającej
// reklamy ("3 dni po wypłacie znika połowa pensji... 5 minut i
// wiesz, ile możesz wydać") — message match między reklamą a stroną.
// ————————————————————————————————————————————————

const FAQ_ITEMS = [
  {
    q: "Jak i kiedy otrzymam dostęp po zakupie?",
    a: "Dostęp wysyłany jest automatycznie na podany e-mail natychmiast po udanej płatności. Otrzymasz bezpośredni link do utworzenia własnej, prywatnej kopii w Google Sheets.",
  },
  {
    q: "Czy opłata jest jednorazowa?",
    a: "Tak, płacisz tylko raz. Brak jakichkolwiek subskrypcji, abonamentów czy ukrytych opłat — dostęp do arkusza masz na zawsze.",
  },
  {
    q: "Czy muszę mieć konto Google?",
    a: "Tak. Arkusz działa w Google Sheets — potrzebujesz darmowego konta Google, żeby zrobić jego kopię na swoim dysku.",
  },
  {
    q: "Czy da się używać na telefonie?",
    a: "Tak, przez darmową aplikację Google Sheets. Wygodniej jednak wpisuje się dane na większym ekranie — na start polecamy tablet lub komputer.",
  },
  {
    q: "Co jeśli nie znam dobrze Google Sheets / Excela?",
    a: "Bez obaw. Arkusz jest w pełni zautomatyzowany, ma wbudowane instrukcje i formuły przeliczające wszystko za Ciebie — wystarczy wpisywać własne liczby.",
  },
  {
    q: "Co jeśli przypadek usunę lub zepsuję swój plik?",
    a: "Link z wiadomości e-mail działa bezterminowo. W dowolnym momencie możesz kliknąć go ponownie i utworzyć czystą, nową kopię szablonu.",
  },
  {
    q: "Jakie metody płatności są dostępne?",
    a: "Zapłacisz wygodnie przez BLIK, szybki przelew bankowy (P24) lub kartę płatniczą za pośrednictwem bezpiecznego systemu Stripe.",
  },
  {
    q: "Czy dostanę potwierdzenie zakupu?",
    a: "Tak, potwierdzenie zakupu oraz dowód wpłaty trafiają na Twój adres e-mail automatycznie po zrealizowaniu płatności.",
  },
];

const SHEET_ITEMS = [
  {
    name: "Budżet miesięczny",
    desc: "Kategorie wydatków rozpisane z góry — arkusz sam liczy, czy jesteś na plusie, czy na minusie.",
  },
  {
    name: "Plan spłaty długów",
    desc: "Metoda kuli śnieżnej i lawiny policzone równolegle — widzisz obie ścieżki i wybierasz swoją.",
  },
  {
    name: "Poduszka bezpieczeństwa",
    desc: "Tracker odkładania na fundusz awaryjny z jasnym celem w złotówkach i dacie, kiedy go osiągniesz.",
  },
  {
    name: "Dzień wypłaty — rutyna 5 minut",
    desc: "Jedna zakładka, którą otwierasz w dniu wypłaty i wypełniasz w pięć minut, zanim pieniądze się rozejdą.",
  },
  {
    name: "Symulacja \u201eco jeśli\u201d",
    desc: "Dokładasz 100 zł miesięcznie do spłaty? Arkusz od razu pokazuje nową datę końca długu.",
  },
];

function useQueryParams() {
  const [params, setParams] = useState<{ video?: string; utm?: string }>({});

  useEffect(() => {
    const url = new URL(window.location.href);
    setParams({
      video: url.searchParams.get("v") ?? undefined,
      utm: url.searchParams.get("utm") ?? undefined,
    });
  }, []);

  return params;
}

// Checkbox zgody powtórzony przy każdym z trzech przycisków zakupu —
// wszystkie odwołują się do tego samego stanu `consentGiven`, więc
// zaznaczenie w dowolnym miejscu odblokowuje pozostałe, bez
// przewijania strony w górę. Tekst skrócony do minimum wymaganego
// prawnie (zgoda na natychmiastową realizację + utrata prawa zwrotu),
// reszta jest pod linkami.
function ConsentCheckbox({
  checked,
  onChange,
  light = false,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  light?: boolean;
}) {
  return (
    <label
      className={`${styles.consentLabel} ${light ? styles.consentLabelLight : ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        Zgadzam się na natychmiastowy dostęp i tracę prawo zwrotu w
        ciągu 14 dni. Szczegóły:{" "}
        <a href="/regulamin" target="_blank" rel="noreferrer">
          regulamin
        </a>{" "}
        ·{" "}
        <a href="/polityka-prywatnosci" target="_blank" rel="noreferrer">
          polityka prywatności
        </a>
        .
      </span>
    </label>
  );
}

export default function Home() {
  const { video, utm } = useQueryParams();
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);

  async function handleCheckout() {
    if (!consentGiven) return;
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video_id: video,
          utm_source: utm,
          consent_immediate_execution: true,
          consent_timestamp: new Date().toISOString(),
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.navSection}>
        <div className={styles.inner}>
          <span className={styles.wordmark}>Ogarnij Pieniądze</span>
        </div>
      </section>

      {/* HERO — dopasowany do haka: "3 dni po wypłacie znika połowa
          pensji... 5 minut i wiesz, ile możesz wydać" */}
      <section className={styles.heroSection}>
        <div className={`${styles.inner} ${styles.hero}`}>
          <div className={styles.heroText}>
            <p className={styles.heroNumber}>5 minut</p>
            <h1 className={styles.heroHeadline}>
              w dniu wypłaty — i wiesz, ile możesz wydać
            </h1>
            <p className={styles.heroSub}>
              Rozpisujesz kwotę na wydatki, a arkusz automatycznie liczy, ile zostaje i ile odkładasz!
            </p>

            <ConsentCheckbox checked={consentGiven} onChange={setConsentGiven} />

            <button
              className={styles.ctaButton}
              onClick={handleCheckout}
              disabled={loading || !consentGiven}
            >
              {loading ? "Przenoszę do płatności…" : "Kup teraz — 39,99 zł"}
            </button>
            <p>Jednorazowa opłata • Dostęp na zawsze • Działa na telefonie</p>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.floatingSheet}>
              <img
                src="/screenshots/hero-sheet.webp"
                alt="Zrzut ekranu arkusza System 90 dni — zakładka budżetu miesięcznego"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM — ten sam ból co w reklamie: pieniądze znikają
          zanim zdążysz je rozplanować */}
      <section className={styles.problemSection}>
        <div className={styles.inner}>
          <p className={styles.problemText}>
            3 dni po wypłacie i połowa pensji już zniknęła. Nie
            wiesz dokładnie na co, a rachunki i długi i tak czekają
            w kolejce.
          </p>
        </div>
      </section>

      {/* CO DOSTAJESZ */}
      <section className={styles.ledgerSection}>
        <div className={styles.inner}>
          <h2 className={styles.sectionHeading}>Co znajdziesz w arkuszu</h2>
          <div className={styles.ledgerTable}>
            {SHEET_ITEMS.map((item, i) => (
              <div
                className={`${styles.ledgerRow} ${
                  i % 2 === 1 ? styles.ledgerRowAlt : ""
                }`}
                key={item.name}
              >
                <span className={styles.ledgerName}>{item.name}</span>
                <span className={styles.ledgerDesc}>{item.desc}</span>
              </div>
            ))}
          </div>
          <p className={styles.ledgerCtaText}>Gotowy, żeby zacząć?</p>
          <ConsentCheckbox checked={consentGiven} onChange={setConsentGiven} />
          <button
            className={styles.ctaButton}
            onClick={handleCheckout}
            disabled={loading || !consentGiven}
          >
            {loading ? "Przenoszę do płatności…" : "Kup teraz — 39,99 zł"}
          </button>
        </div>
      </section>

      {/* DOWÓD */}
      <section className={styles.proofSection}>
        <div className={styles.inner}>
          <h2 className={styles.sectionHeadingLight}>
            Zobacz arkusz w akcji
          </h2>
          <div className={styles.proofGrid}>
            <div className={styles.floatingSheet}>
              <img
                src="/screenshots/3.webp"
                alt="Zakładka z systemem 90 dni"
              />
            </div>
            <div className={styles.floatingSheet}>
              <img
                src="/screenshots/2.webp"
                alt="Zakładka Budżet miesięczny"
              />
            </div>
            <div className={styles.floatingSheet}>
              <img
                src="/screenshots/5.webp"
                alt="Zakładka Tracker oszczędności"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className={styles.quoteSection}>
        <div className={styles.inner}>
          <blockquote className={styles.quoteText}>
            „Pierwszy raz w dniu wypłaty wiedziałam dokładnie, ile
            mogę wydać. Zajęło mi to 5 minut.”
          </blockquote>
          <p className={styles.quoteSource}>— czytelniczka OgarnijPieniądze</p>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.inner}>
          <h2 className={styles.sectionHeading}>Pytania</h2>
          <div className={styles.faqList}>
            {FAQ_ITEMS.map((item, i) => (
              <div className={styles.faqItem} key={item.q}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {item.q}
                  <span aria-hidden="true">{openFaq === i ? "–" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className={styles.faqAnswer}>{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINALNE CTA */}
      <section className={styles.finalCtaSection}>
        <div className={styles.inner}>
          <p className={styles.finalCtaText}>
            Następna wypłata zacznij od 5 minut z tym arkuszem.
          </p>
          <ConsentCheckbox
            checked={consentGiven}
            onChange={setConsentGiven}
            light
          />
          <button
            className={styles.ctaButtonLight}
            onClick={handleCheckout}
            disabled={loading || !consentGiven}
          >
            {loading ? "Przenoszę do płatności…" : "Kup teraz — 39,99 zł"}
          </button>
        </div>
      </section>

      {/* STOPKA — linki do dokumentów prawnych */}
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <a href="/regulamin">Regulamin</a>
          <span aria-hidden="true"> · </span>
          <a href="/polityka-prywatnosci">Polityka prywatności</a>
        </div>
      </footer>
    </main>
  );
}
