import { Layout, LayoutProps } from '../components/Layout.tsx';

export function LandingPage(props?: LayoutProps) {
  const { head } = props ?? {};

  const h = {
    ...head,
    title: 'To co zwykle - cykliczne dostawy produktów domowych bez wysiłku',
    description:
      'To co zwykle - zamów cykliczne dostawy środków czystości, karmy dla zwierząt, papieru toaletowego i innych produktów domowych. Wygodnie, bez stresu, z dostawą pod drzwi.',
  };

  return (
    <Layout {...props} head={h}>
      <main class='bg-white'>
        <div class='bg-[#24B67B] px-6 py-3'>
          <div class='max-w-7xl mx-auto flex items-center justify-between'>
            <a
              href='/'
              title='To co zwykle - cykliczne dostawy produktów domowych bez wysiłku'
              class='text-white font-medium bg-emerald-800 hover:bg-emerald-600 rounded-sm px-4 py-2 flex items-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='lucide lucide-shopping-cart-icon lucide-shopping-cart'
              >
                <circle cx='8' cy='21' r='1' />
                <circle cx='19' cy='21' r='1' />
                <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
              </svg>
              To co zwykle
            </a>

            <ul class='items-center gap-4 hidden md:flex'>
              {nav.map((n) => (
                <li>
                  <a
                    href={`#${n.id}`}
                    title={n.text}
                    class='text-white hover:text-emerald-800'
                  >
                    {n.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div class='bg-[#2B2B2B] px-6 py-12'>
          <div class='max-w-7xl mx-auto'>
            <h1 class='text-white font-semibold text-3xl mb-8 md:max-w-1/2 uppercase leading-relaxed'>
              Twoje domowe zakupy<br />dostarczane cyklicznie<br />zgodnie z
              twoim rytmem
            </h1>

            <div class='md:max-w-1/2'>
              <p class='mb-8 text-[#ccc] leading-relaxed text-sm'>
                Wybierz domowe produkty, których potrzebuejsz, ustaw harmonogram
                dostaw i zapomnij o ciągłym podejmowaniu decyzji. Dostarczymy
                Twoje zakupy cyklicznie, dokładnie kiedy potrzebujesz.
              </p>

              <button
                type='button'
                class='hover:bg-emerald-800 text-white px-8 py-4 rounded-sm uppercase bg-[#24B67B] cursor-pointer tracking-wider text-lg'
              >
                Jestem zainteresowany
              </button>
            </div>
          </div>
        </div>

        <section class='max-w-7xl mx-auto px-6 py-12' id='dlaczego-warto'>
          <h2 class='text-center mb-8 text-2xl font-semibold uppercase'>
            Dlaczego warto?
          </h2>

          <p class='mb-12 text-center text-base leading-relaxed text-gray-500'>
            Dostarczymy Twoje zakupy cyklicznie, dokładnie kiedy potrzebujesz -
            bez stresu, bez wysiłku, bez niespodzianek.
          </p>

          <div class='grid md:grid-cols-2 gap-6 mb-12'>
            {benefits.map((b) => (
              <div>
                <h3 class='mb-4 font-medium'>{b.title}</h3>
                <p class='text-sm leading-relaxed text-gray-500'>
                  {b.description}
                </p>
              </div>
            ))}
          </div>

          <div class='text-center'>
            <button
              type='button'
              class='hover:bg-emerald-800 text-white px-8 py-4 rounded-sm uppercase bg-[#24B67B] cursor-pointer tracking-wider text-lg'
            >
              Jestem zainteresowany
            </button>
          </div>
        </section>

        <section class='px-6 py-12 bg-gray-50' id='jak-to-dziala'>
          <div class='max-w-7xl mx-auto'>
            <h2 class='text-center mb-8 text-2xl font-semibold uppercase'>
              Jak to działa
            </h2>

            <ol class='mx-auto max-w-4xl'>
              {howItWorks.map((h) => (
                <li class='flex items-center gap-6 mb-6 last:mb-0 border-b border-b-gray-200 last:border-b-0 pb-6 last:pb-0'>
                  <span class='rounded-sm bg-[#24B67B] p-2 text-white'>
                    {h.icon}
                  </span>
                  <span class='text-sm'>{h.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section class='px-6 py-12' id='produkty'>
          <div class='max-w-7xl mx-auto'>
            <h2 class='text-center mb-8 text-2xl font-semibold uppercase'>
              Produkty
            </h2>
          </div>
        </section>

        <section
          class='px-6 py-12 bg-gray-50'
          id='najczesciej-zadawane-pytania'
        >
          <div class='max-w-4xl mx-auto'>
            <h2 class='text-center mb-8 text-2xl font-semibold uppercase'>
              Najczęściej zadawane pytania
            </h2>

            {questions.map((q) => (
              <details class='group mb-6 last:mb-0 border-b border-b-gray-200 pb-6'>
                <summary class='flex items-center justify-between gap-4 cursor-pointer hover:text-[#24B67B]'>
                  <h3>{q.question}</h3>

                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    class='group-open:rotate-180 shrink-0'
                  >
                    <path d='m6 9 6 6 6-6' />
                  </svg>
                </summary>

                <p class='text-sm leading-relaxed text-gray-500 mt-4'>
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <footer class='bg-[#2B2B2B] px-6 py-4'>
          <div class='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0'>
            <a
              href='/'
              title='To co zwykle - cykliczne dostawy produktów domowych bez wysiłku'
              class='text-white font-medium bg-emerald-800 hover:bg-emerald-600 rounded-sm px-4 py-2 flex items-center gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='lucide lucide-shopping-cart-icon lucide-shopping-cart'
              >
                <circle cx='8' cy='21' r='1' />
                <circle cx='19' cy='21' r='1' />
                <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
              </svg>
              To co zwykle
            </a>

            <ul class='flex items-center gap-4'>
              <li>
                <a
                  href='mailto:kontakt@tocozwykle.pl'
                  title='Wyślij wiadomość na kontakt@tocozwykle.pl'
                  class='text-white hover:text-gray-400'
                >
                  kontakt@tocozwykle.pl
                </a>
              </li>

              {
                /* <li>
              <a
                href='/'
                title='To co zwykle na Facebook'
                class='text-white hover:text-gray-400'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='lucide lucide-facebook-icon lucide-facebook'
                >
                  <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                </svg>
              </a>
            </li>

            <li>
              <a
                href='/'
                title='To co zwykle na Instagram'
                class='text-white hover:text-gray-400'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='lucide lucide-instagram-icon lucide-instagram'
                >
                  <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
                  <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                  <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
                </svg>
              </a>
            </li>*/
              }
            </ul>
          </div>
        </footer>
      </main>
    </Layout>
  );
}

const nav = [
  { text: 'Dlaczego warto', id: 'dlaczego-warto' },
  { text: 'Jak to działa', id: 'jak-to-dziala' },
  { text: 'Produkty', id: 'produkty' },
  { text: 'Najczęściej zadawane pytania', id: 'najczesciej-zadawane-pytania' },
];
const benefits = [
  {
    title: 'Męczy Cię podejmowanie drobnych decyzji każdego dnia?',
    description:
      'Papier, płyn, pasta, karma, ręczniki… Drobiazgi, które potrafią zjeść pół dnia (i głowę). Z To co zwykle wybierasz raz - i zrzucasz z siebie ciężar codziennego decydowania.',
  },
  {
    title: 'Masz dzieci w domu?',
    description:
      'Codzienność z dziećmi to logistyka na pełen etat. Dzięki cyklicznym dostawom środków higienicznych, proszku do prania czy papieru toaletowego, masz jedną rzecz mniej na głowie - i więcej czasu dla rodziny.',
  },
  {
    title: 'Mieszkasz ze zwierzakiem?',
    description:
      'Karma, żwirek, podkłady, czy smaczki - kończą się zawsze w najmniej odpowiednim momencie. Z To co zwykle dostajesz wszystko regularnie, zanim zdążysz się zorientować, że czegoś brakuje.',
  },
  {
    title: 'Lubisz spokój i rutynę?',
    description:
      'Nie każdy lubi niespodzianki - zwłaszcza w zakupach. U nas ustawiasz harmonogram raz, a potrzebne rzeczy pojawiają się pod drzwiami bez hałasu, bez przypomnień, bez zakłóceń.',
  },
  {
    title: 'Nie chcesz tracić czasu na powtarzalne zakupy?',
    description:
      'Znasz to: co tydzień te same produkty, te same kliknięcia. My robimy to za Ciebie. Ty zyskujesz czas i energię na to, co naprawdę się liczy.',
  },
];

const howItWorks = [
  {
    text: 'Wybierz domowe produkty, których potrzebujesz.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        class='lucide lucide-shopping-cart-icon lucide-shopping-cart'
      >
        <circle cx='8' cy='21' r='1' />
        <circle cx='19' cy='21' r='1' />
        <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
      </svg>
    ),
  },
  {
    text: 'Ustaw harmonogram cyklicznych dostaw.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        class='lucide lucide-calendar-sync-icon lucide-calendar-sync'
      >
        <path d='M11 10v4h4' />
        <path d='m11 14 1.535-1.605a5 5 0 0 1 8 1.5' />
        <path d='M16 2v4' />
        <path d='m21 18-1.535 1.605a5 5 0 0 1-8-1.5' />
        <path d='M21 22v-4h-4' />
        <path d='M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3' />
        <path d='M3 10h4' />
        <path d='M8 2v4' />
      </svg>
    ),
  },
  {
    text: 'Wybierz sposób dostawy (kurier lub paczkomat).',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        class='lucide lucide-package-check-icon lucide-package-check'
      >
        <path d='m16 16 2 2 4-4' />
        <path d='M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14' />
        <path d='m7.5 4.27 9 5.15' />
        <polyline points='3.29 7 12 12 20.71 7' />
        <line x1='12' x2='12' y1='22' y2='12' />
      </svg>
    ),
  },
  {
    text:
      'Wybierz metodę płatności. Płatność jest pobierana automatycznie, za jednorazową dostawę, tuż przed każdą wysyłką.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        class='lucide lucide-wallet-icon lucide-wallet'
      >
        <path d='M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1' />
        <path d='M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4' />
      </svg>
    ),
  },
  {
    text:
      'Dwa dni przed planowaną dostawą wyślemy Ci przypomnienie - możesz zmienić lub anulowć swoje zamówienie.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        class='lucide lucide-mail-icon lucide-mail'
      >
        <path d='m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' />
        <rect x='2' y='4' width='20' height='16' rx='2' />
      </svg>
    ),
  },
  {
    text:
      'Wysyłamy Twoje zamówienie. Zgodnie z wybranym przez Ciebie harmonogramem.',
    icon: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='36'
        height='36'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        class='lucide lucide-truck-icon lucide-truck'
      >
        <path d='M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2' />
        <path d='M15 18H9' />
        <path d='M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14' />
        <circle cx='17' cy='18' r='2' />
        <circle cx='7' cy='18' r='2' />
      </svg>
    ),
  },
];

const questions = [
  {
    question: 'Czym jest usługa "To co zwykle"?',
    answer:
      '"To co zwykle" to usługa cyklicznego dostarczania wybranych przez Ciebie produktów, zgodnie z ustalonym przez Ciebie harmonogramem.',
  },
  {
    question:
      'Czy mogę zmienić lub anulować zamówienie po ustawieniu harmonogramu?',
    answer:
      'Tak, zamówienie możesz zmianić lub anulować do dwóch dni przed wysyłką. Możesz to zrobić po zalogowaniu się na swoje konto. Dodatkowo, na dwa dni przed planowaną wysyłką wyślemy Ci maila z przypomnieniem o nadechodzącej dostawie. To jest ostatni moment na zmianę lub anulowanie zamówienia.',
  },
  {
    question: 'Czy muszę podpisywać umowę na dłuższy czas?',
    answer:
      'Nie, sam deklarujesz jak często i do kiedy chcesz otrzymywać dostawy. Możesz zrezygnować w dowolnym momencie ale na maksymalnie dwa dni przed planowaną wysyłką.',
  },
  {
    question: 'Jak szybko realizowana jest pierwsza dostawa?',
    answer:
      'Pierwsza wysyłka może się odbyć minimalnie po dwóch dniach roboczych od złożenia zamówienia.',
  },
  {
    question: 'W jaki sposób odbywa się płatność za zamówienia?',
    answer:
      'Płatność jest pobierana automatycznie przed każdą wysyłką Twojego zamówienia.',
  },
  {
    question: 'Jakie opcje dostawy są dostępne?',
    answer:
      'W tym momencie planujemy dostawy za pomocą paczkomatów InPost i dostawy "do drzwi" z kurierem DHL. Daj znam znać, jeśli w Twoim regionie inna forma dostawy sprawdzi się lepiej.',
  },
  {
    question:
      'Co się stanie, jeśli nie będę mógł odebrać przesyłki w wyznaczonym terminie?',
    answer:
      'To zależy od wybranej formy dostawy. W przypadku paczkomatu InPost, paczka będzie na Ciebie czekać 2 dni (InPost pozwala na przedłużenie czasu odbioru). Później zostanie do nas zwrócona.', // TODO dodać opcję kurriera,
  },
  {
    question: 'Jak często mogę otrzymywać dostawy?',
    answer:
      'Dostawy możesz otrzymywać codziennie (tylko w dni robocze), z zastrzeżeniem, że pierwsza wysyłka może odbyć się minimalnie w dwa dni po złożeniu zamówienia.',
  },
  {
    question: 'Czy mogę zamówić różnorodne produkty w jednej dostawie?',
    answer:
      'Oczywiście, każde zamówienie może składać się z dowolnych produktów.',
  },
  {
    question: 'Jak otrzymam przypomnienie o nadchodzącej dostawie?',
    answer:
      'Na dwa dni przed każdorazową planowaną wysyłką Twojego zamówienia wyślemy Ci maila z przypomnieniem o nadchodzącej dostawie.',
  },
  {
    question:
      'Co się stanie, jeśli nie zareaguję na przypomnienie o zamówieniu?',
    answer:
      'Przypomnienie to informacja dla Ciebie, na wypadek gdybyś chciał coś zmienić. Nie musisz reagować na powiadomienie. Jeśli nie zareagujesz na powiadomienie to zamówienie zostanie wysłane zgodnie z ustalonym przez Ciebie harmonogramem.',
  },
  {
    question:
      'Czy mogę korzystać z usługi, jeśli mieszkam poza granicami Polski?',
    answer: 'Na ten moment usługa będzie dostępna tylko na terenie Polski.',
  },
  {
    question: 'Czy mogę zawiesić usługę na jakiś czas?',
    answer:
      'Tak, możesz o zrobić po zalogowaniu się na swoje konto. Zmiana, anulowanie lub zawieszenie zamówienia musi się odbyć maksymalnie na dwa dni przed planowaną wysyłką.',
  },
  {
    question:
      'Co zrobić, jeśli produkt w przesyłce jest uszkodzony lub niezgodny z zamówieniem?',
    answer:
      'Skontaktuj się z nami. Zależy nam na Twoim zadowoleniu, więc napewno rozwiążemy ten problem.',
  },
  {
    question: 'Czy mogę mieć różne harmonogramy dla różnych produktów?',
    answer:
      'Tak, harmonogram ustalasz dla całego zamówienia. Jeśli potrzebujesz różnych produktów w różnym czasie, stwórz dwa zamówienia.',
  },
];
