import styles from "../styles/LegalPage.module.css";

// ————————————————————————————————————————————————
// UWAGA: szablon oparty na wymogach RODO (art. 13) — pola w
// nawiasach [ ] uzupełnij własnymi danymi. Lista odbiorców danych
// (Stripe, Supabase, Resend, Cloudflare) odpowiada narzędziom
// faktycznie użytym w kodzie tego projektu — jeśli dodasz/usuniesz
// jakieś narzędzie (np. Google Analytics), zaktualizuj tę listę,
// żeby dokument odzwierciedlał rzeczywistość.
// ————————————————————————————————————————————————

export default function PolitykaPrywatnosci() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <a className={styles.backLink} href="/">
          ← Wróć do strony produktu
        </a>
        <h1 className={styles.title}>Polityka prywatności</h1>
        <p className={styles.updated}>
          Ostatnia aktualizacja: <span className={styles.placeholder}>11.09.2026</span>
        </p>

        <h2>1. Administrator danych</h2>
        <p>
          Administratorem danych osobowych zbieranych za
          pośrednictwem Sklepu jest:
        </p>
        <ul>
          <li>
            <span className={styles.placeholder}>
              Paweł Wolak
            </span>
          </li>
          <li>
            e-mail kontaktowy w sprawach danych osobowych:{" "}
            <span className={styles.placeholder}>ogarnijpieniadze@wp.pl</span>
          </li>
        </ul>

        <h2>2. Jakie dane zbieramy i po co</h2>
        <ul>
          <li>
            <strong>Adres e-mail</strong> — podawany podczas płatności,
            wykorzystywany do dostarczenia zakupionej treści cyfrowej
            i kontaktu w sprawach reklamacji. Podstawa prawna: art. 6
            ust. 1 lit. b RODO (wykonanie umowy).
          </li>
          <li>
            <strong>Dane transakcji</strong> (kwota, data, status
            płatności) — przetwarzane w celu realizacji i
            rozliczenia Zamówienia oraz spełnienia obowiązków
            podatkowo-księgowych. Podstawa prawna: art. 6 ust. 1 lit.
            b i lit. c RODO (wykonanie umowy, obowiązek prawny).
          </li>
          <li>
            <strong>Dane techniczne i identyfikator źródła ruchu</strong>{" "}
            (np. parametr wskazujący, z którego materiału promocyjnego
            pochodzi wejście na stronę) — wykorzystywane wyłącznie do
            analizy skuteczności działań promocyjnych, nie są łączone
            z danymi umożliwiającymi bezpośrednią identyfikację osoby
            poza kontekstem konkretnej transakcji. Podstawa prawna:
            art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes
            administratora w postaci analizy skuteczności promocji).
          </li>
          <li>
            <strong>Pliki cookies</strong> — w zakresie, w jakim
            Klient wyrazi na to zgodę poprzez baner cookies. Podstawa
            prawna: art. 6 ust. 1 lit. a RODO (zgoda).
          </li>
        </ul>

        <h2>3. Odbiorcy danych</h2>
        <p>
          W związku z prowadzeniem Sklepu dane mogą być przekazywane
          następującym podmiotom przetwarzającym dane w imieniu
          administratora:
        </p>
        <ul>
          <li>
            <strong>Stripe</strong> (Stripe Payments Europe, Ltd.) —
            obsługa płatności online.
          </li>
          <li>
            <strong>Supabase</strong> — przechowywanie danych o
            zdarzeniach związanych z płatnościami na potrzeby
            analizy skuteczności promocji.
          </li>
          <li>
            <strong>Resend</strong> — wysyłka wiadomości e-mail z
            potwierdzeniem zakupu i linkiem do Treści cyfrowej.
          </li>
          <li>
            <strong>Cloudflare</strong> — hosting Sklepu i
            infrastruktura techniczna.
          </li>
        </ul>
        <p>
          Część z powyższych podmiotów może przetwarzać dane poza
          Europejskim Obszarem Gospodarczym; w takim przypadku
          przekazanie odbywa się w oparciu o odpowiednie mechanizmy
          zgodności przewidziane w RODO (np. standardowe klauzule
          umowne), stosowane przez te podmioty jako dostawców usług.
        </p>

        <h2>4. Okres przechowywania danych</h2>
        <p>
          Dane związane z Zamówieniem przechowywane są przez okres
          wymagany przepisami prawa podatkowego i rachunkowego (co do
          zasady 5 lat od końca roku, w którym dokonano transakcji).
          Dane wykorzystywane wyłącznie do analizy skuteczności
          promocji przechowywane są nie dłużej niż{" "}
          <span className={styles.placeholder}>12 miesięcy</span>{" "}
          od ich zebrania.
        </p>

        <h2>5. Prawa osoby, której dane dotyczą</h2>
        <p>Każdej osobie, której dane przetwarzamy, przysługuje prawo do:</p>
        <ul>
          <li>dostępu do swoich danych oraz otrzymania ich kopii,</li>
          <li>sprostowania (poprawienia) danych,</li>
          <li>usunięcia danych, w zakresie w jakim nie stoi to w sprzeczności z obowiązkami prawnymi administratora,</li>
          <li>ograniczenia przetwarzania,</li>
          <li>przenoszenia danych,</li>
          <li>
            wniesienia sprzeciwu wobec przetwarzania opartego na
            prawnie uzasadnionym interesie administratora,
          </li>
          <li>
            wniesienia skargi do Prezesa Urzędu Ochrony Danych
            Osobowych (PUODO), jeśli osoba uzna, że przetwarzanie
            narusza przepisy RODO.
          </li>
        </ul>
        <p>
          W celu realizacji powyższych praw prosimy o kontakt na
          adres e-mail wskazany w punkcie 1.
        </p>

        <h2>6. Pliki cookies</h2>
        <p>
          Sklep korzysta z plików cookies w celu zapewnienia
          prawidłowego działania strony oraz — wyłącznie po
          wyrażeniu zgody w bannerze cookies — do analizy ruchu na
          stronie. Zgodę można w każdej chwili wycofać, usuwając
          pliki cookies w ustawieniach przeglądarki.
        </p>
        <ul>
          <li>
            <strong>Cookies niezbędne</strong> — wymagane do
            podstawowego działania strony (np. zapamiętanie wyboru
            dokonanego w bannerze cookies); nie wymagają zgody.
          </li>
          
        </ul>

        <h2>7. Dobrowolność podania danych</h2>
        <p>
          Podanie danych osobowych jest dobrowolne, ale niezbędne do
          zawarcia i realizacji umowy sprzedaży Treści cyfrowej —
          bez adresu e-mail nie jest możliwe dostarczenie
          zakupionego produktu.
        </p>

        <h2>8. Zmiany polityki prywatności</h2>
        <p>
          Niniejsza polityka może być aktualizowana w związku ze
          zmianami w sposobie działania Sklepu lub zmianami przepisów
          prawa. Aktualna wersja zawsze dostępna jest pod niniejszym
          adresem.
        </p>
      </div>
    </main>
  );
}
