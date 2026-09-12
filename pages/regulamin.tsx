import styles from "../styles/LegalPage.module.css";

// ————————————————————————————————————————————————
// UWAGA: to jest szablon oparty na standardowych wymogach ustawy
// o prawach konsumenta, ustawy o świadczeniu usług drogą
// elektroniczną i Kodeksu cywilnego — NIE jest to porada prawna
// przygotowana dla Twojej konkretnej sytuacji. Pola w nawiasach
// kwadratowych [ ] musisz uzupełnić własnymi danymi. Przed
// realnym uruchomieniem sprzedaży zalecana jest jednorazowa
// konsultacja z prawnikiem/radcą specjalizującym się w e-commerce.
// ————————————————————————————————————————————————

export default function Regulamin() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <a className={styles.backLink} href="/">
          ← Wróć do strony produktu
        </a>
        <h1 className={styles.title}>Regulamin sklepu internetowego</h1>
        <p className={styles.updated}>
          Ostatnia aktualizacja: <span className={styles.placeholder}>[DATA]</span>
        </p>

        <h2>§1. Postanowienia ogólne</h2>
        <p>
          Niniejszy regulamin (dalej: „Regulamin”) określa zasady
          korzystania ze sklepu internetowego dostępnego pod adresem{" "}
          <span className={styles.placeholder}>[ADRES STRONY]</span>{" "}
          (dalej: „Sklep”), w tym zasady zawierania i wykonywania umów
          sprzedaży treści cyfrowych na odległość.
        </p>
        <p>Sprzedawcą i administratorem Sklepu jest:</p>
        <ul>
          <li>
            <span className={styles.placeholder}>
              [Imię i nazwisko / pełna nazwa firmy]
            </span>
          </li>
          <li>
            adres:{" "}
            <span className={styles.placeholder}>
              [adres siedziby / prowadzenia działalności]
            </span>
          </li>
          <li>
            NIP:{" "}
            <span className={styles.placeholder}>
              [NIP — jeśli zarejestrowana działalność; w przypadku
              działalności nierejestrowanej pominąć]
            </span>
          </li>
          <li>
            e-mail kontaktowy:{" "}
            <span className={styles.placeholder}>[adres e-mail]</span>
          </li>
        </ul>
        <p>
          (dalej łącznie: „Sprzedawca”). Kontakt ze Sprzedawcą we
          wszystkich sprawach związanych z zamówieniem odbywa się
          poprzez powyższy adres e-mail.
        </p>

        <h2>§2. Definicje</h2>
        <ul>
          <li>
            <strong>Klient</strong> — osoba fizyczna, osoba prawna lub
            jednostka organizacyjna składająca Zamówienie w Sklepie.
          </li>
          <li>
            <strong>Konsument</strong> — Klient będący osobą fizyczną
            dokonującą czynności prawnej niezwiązanej bezpośrednio z
            jej działalnością gospodarczą lub zawodową (art. 22¹
            Kodeksu cywilnego).
          </li>
          <li>
            <strong>Treść cyfrowa</strong> — produkt cyfrowy oferowany
            w Sklepie: arkusz kalkulacyjny Google Sheets „System 90
            dni”, dostarczany w formie linku do skopiowania na konto
            Google Klienta.
          </li>
          <li>
            <strong>Zamówienie</strong> — oświadczenie woli Klienta
            zmierzające do zawarcia umowy sprzedaży Treści cyfrowej.
          </li>
          <li>
            <strong>Umowa</strong> — umowa o dostarczenie treści
            cyfrowej zawierana na odległość między Klientem a
            Sprzedawcą za pośrednictwem Sklepu.
          </li>
        </ul>

        <h2>§3. Przedmiot sprzedaży</h2>
        <p>
          Przedmiotem sprzedaży w Sklepie jest wyłącznie Treść
          cyfrowa niezapisana na nośniku materialnym — arkusz Google
          Sheets „System 90 dni”, umożliwiający planowanie budżetu
          domowego, spłaty zadłużenia oraz oszczędności.
        </p>
        <p>
          Korzystanie z Treści cyfrowej wymaga posiadania przez
          Klienta aktywnego, darmowego konta Google oraz dostępu do
          internetu. Sprzedawca informuje o tym wymogu przed
          złożeniem Zamówienia.
        </p>

        <h2>§4. Zawarcie umowy i płatność</h2>
        <ol>
          <li>
            Zamówienia można składać 24 godziny na dobę za
            pośrednictwem Sklepu.
          </li>
          <li>
            Cena Treści cyfrowej podana jest w złotych polskich i
            zawiera wszystkie należne podatki. Cena widoczna przy
            produkcie jest wiążąca w chwili złożenia Zamówienia.
          </li>
          <li>
            Płatności obsługiwane są przez zewnętrznego operatora
            płatności Stripe. Dostępne metody płatności: karta
            płatnicza, BLIK, Przelewy24 — zgodnie z opcjami
            wyświetlonymi w procesie płatności.
          </li>
          <li>
            Kliknięcie przycisku „Kup teraz — 39,99 zł” oznacza
            złożenie Zamówienia z obowiązkiem zapłaty.
          </li>
          <li>
            Umowę uznaje się za zawartą z chwilą zaksięgowania
            płatności przez operatora płatności.
          </li>
        </ol>

        <h2>§5. Dostarczenie treści cyfrowej</h2>
        <ol>
          <li>
            Treść cyfrowa dostarczana jest niezwłocznie po
            zaksięgowaniu płatności, nie później niż w ciągu 24
            godzin, na adres e-mail podany przez Klienta w procesie
            płatności.
          </li>
          <li>
            Dostarczenie następuje w formie wiadomości e-mail
            zawierającej link umożliwiający wykonanie własnej kopii
            arkusza na koncie Google Klienta.
          </li>
          <li>
            W przypadku nieotrzymania wiadomości w powyższym terminie
            Klient proszony jest o kontakt na adres e-mail wskazany
            w §1.
          </li>
        </ol>

        <h2>§6. Prawo odstąpienia od umowy</h2>
        <p>
          Zgodnie z art. 27 ustawy z dnia 30 maja 2014 r. o prawach
          konsumenta, Konsument ma prawo odstąpić od umowy zawartej
          na odległość w terminie 14 dni bez podania przyczyny.
        </p>
        <p>
          <strong>Wyjątek dotyczący treści cyfrowych:</strong> zgodnie
          z art. 38 pkt 13 ustawy o prawach konsumenta, prawo
          odstąpienia nie przysługuje w odniesieniu do umów o
          dostarczanie treści cyfrowych niedostarczanych na nośniku
          materialnym, jeżeli spełnianie świadczenia rozpoczęło się
          za wyraźną zgodą Konsumenta przed upływem terminu do
          odstąpienia od umowy i po poinformowaniu go przez
          Sprzedawcę o utracie prawa odstąpienia od umowy.
        </p>
        <p>
          Sklep pobiera taką zgodę od Klienta w formie checkboxa
          widocznego bezpośrednio przy przycisku zakupu, przed
          złożeniem Zamówienia. Zaznaczenie zgody i przystąpienie do
          płatności oznacza utratę prawa odstąpienia od umowy z
          chwilą dostarczenia Treści cyfrowej.
        </p>
        <p>
          Klientom niebędącym Konsumentami (w tym osobom fizycznym
          prowadzącym działalność gospodarczą, dla których
          Zamówienie ma charakter zawodowy) prawo odstąpienia opisane
          w niniejszym paragrafie nie przysługuje.
        </p>

        <h2>§7. Reklamacje</h2>
        <ol>
          <li>
            Sprzedawca odpowiada wobec Konsumenta za zgodność Treści
            cyfrowej z umową na zasadach określonych w rozdziale 5b
            ustawy o prawach konsumenta.
          </li>
          <li>
            Reklamację można zgłosić na adres e-mail wskazany w §1,
            opisując na czym polega niezgodność oraz podając dane
            Zamówienia (np. numer sesji płatności).
          </li>
          <li>
            Sprzedawca ustosunkuje się do reklamacji w terminie 14
            dni od jej otrzymania.
          </li>
          <li>
            W przypadku uznania reklamacji Konsumentowi przysługuje
            prawo do doprowadzenia Treści cyfrowej do zgodności z
            umową, obniżenia ceny albo odstąpienia od umowy — zgodnie
            z przepisami ustawy o prawach konsumenta.
          </li>
        </ol>

        <h2>§8. Pozasądowe sposoby rozpatrywania sporów</h2>
        <p>
          Konsument ma możliwość skorzystania z pozasądowych sposobów
          rozpatrywania reklamacji, w tym zwrócenia się o pomoc do
          właściwego wojewódzkiego inspektora Inspekcji Handlowej lub
          powiatowego/miejskiego rzecznika konsumentów. Konsument
          może również skorzystać z unijnej platformy internetowego
          rozstrzygania sporów (platforma ODR) dostępnej pod adresem:{" "}
          ec.europa.eu/consumers/odr.
        </p>

        <h2>§9. Dane osobowe</h2>
        <p>
          Zasady przetwarzania danych osobowych Klientów opisane są w{" "}
          <a href="/polityka-prywatnosci">Polityce prywatności</a>,
          stanowiącej odrębny dokument dostępny na stronie Sklepu.
        </p>

        <h2>§10. Postanowienia końcowe</h2>
        <ol>
          <li>
            W sprawach nieuregulowanych niniejszym Regulaminem
            zastosowanie mają przepisy prawa polskiego, w
            szczególności Kodeksu cywilnego oraz ustawy o prawach
            konsumenta.
          </li>
          <li>
            Sprzedawca zastrzega sobie prawo do zmiany Regulaminu z
            ważnych przyczyn (np. zmiana przepisów prawa, zmiana
            sposobu dostarczania Treści cyfrowej). Zamówienia złożone
            przed wejściem w życie zmian realizowane są na zasadach
            dotychczasowych.
          </li>
          <li>
            Regulamin obowiązuje od dnia{" "}
            <span className={styles.placeholder}>[DATA]</span>.
          </li>
        </ol>
      </div>
    </main>
  );
}
