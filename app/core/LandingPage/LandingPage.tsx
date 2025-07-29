import { Layout, LayoutProps } from '../components/Layout.tsx';
import { GridSection } from './GridSection.tsx';
import { JoinButton } from './JoinButton.tsx';
import { Section } from './Section.tsx';

type Props = LayoutProps<{
  emailError?: string;
  email?: string;
}>;

export function LandingPage(props?: Props) {
  const { head, emailError, email } = props ?? {};

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
                Twoje zakupy cyklicznie, dokładnie kiedy potrzebujesz. Ruszamy
                już wkrótce!
              </p>

              <JoinButton />
            </div>
          </div>
        </div>

        <Section
          title='Dlaczego warto?'
          description='Dostarczymy Twoje zakupy cyklicznie, dokładnie kiedy potrzebujesz - bez stresu, bez wysiłku, bez niespodzianek.'
          id='dlaczego-warto'
        >
          <GridSection items={benefits} />

          <div class='text-center mt-12'>
            <JoinButton />
          </div>
        </Section>

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

            <div class='text-center mt-12'>
              <JoinButton />
            </div>
          </div>
        </section>

        <Section
          title='Produkty'
          description='Dostarczymy Twoje zakupy cyklicznie, dokładnie kiedy potrzebujesz - bez stresu, bez wysiłku, bez niespodzianek.'
          id='produkty'
        >
          <GridSection items={products} />

          <div class='text-center mt-12'>
            <JoinButton />
          </div>
        </Section>

        <Section
          title='Najczęściej zadawane pytania'
          id='najczesciej-zadawane-pytania'
          className='bg-gray-50'
        >
          {questions.map((q) => (
            <details class='group mb-6 last:mb-0 border-b border-b-gray-200 pb-6 max-w-4xl mx-auto'>
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

              <p class='text-sm leading-loose text-gray-500 mt-4'>
                {q.answer}
              </p>
            </details>
          ))}
        </Section>

        <Section
          title='Powiadom mnie o starcie'
          id='powiadom-mnie-o-starcie'
          class='bg-[#26b47c] text-white'
        >
          <form method='post' action='/'>
            <label for='email' class='block text-center mb-8'>
              Już niedługo startujemy! Podaj swój email, by otrzymać
              powiadomienie jako pierwszy.
            </label>

            <div class='mx-auto md:max-w-xl'>
              <div class='flex items-center gap-2'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  class='bg-white rounded-sm border border-emerald-800 text-base text-slate-700 px-4 py-2 grow focus:outline-0 focus:ring-2 focus:ring-emerald-600'
                  placeholder='Podaj swój adres email'
                  value={email ?? ''}
                  required
                />

                <button
                  type='submit'
                  class='bg-emerald-800 hover:bg-emerald-600 text-white rounded-sm px-4 py-2 cursor-pointer'
                >
                  Powiadom mnie o starcie
                </button>
              </div>

              {emailError && (
                <p class='text-red-600 text-sm mt-2'>{emailError}</p>
              )}
            </div>
          </form>
        </Section>

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
      'Papier, płyn, pasta, karma, ręczniki… Drobiazgi, które potrafią zjeść pół dnia (i głowę). Z nami wybierasz raz - i zrzucasz z siebie ciężar codziennego decydowania.',
    icon: (
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
        class='lucide lucide-brain-icon lucide-brain'
      >
        <path d='M12 18V5' />
        <path d='M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4' />
        <path d='M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5' />
        <path d='M17.997 5.125a4 4 0 0 1 2.526 5.77' />
        <path d='M18 18a4 4 0 0 0 2-7.464' />
        <path d='M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517' />
        <path d='M6 18a4 4 0 0 1-2-7.464' />
        <path d='M6.003 5.125a4 4 0 0 0-2.526 5.77' />
      </svg>
    ),
  },
  {
    title: 'Masz dzieci w domu?',
    description:
      'Codzienność z dziećmi to logistyka na pełen etat. Dzięki cyklicznym dostawom środków higienicznych, proszku do prania czy papieru toaletowego, masz jedną rzecz mniej na głowie - i więcej czasu dla rodziny.',
    icon: (
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
        class='lucide lucide-baby-icon lucide-baby'
      >
        <path d='M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5' />
        <path d='M15 12h.01' />
        <path d='M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1' />
        <path d='M9 12h.01' />
      </svg>
    ),
  },
  {
    title: 'Mieszkasz ze zwierzakiem?',
    description:
      'Karma, żwirek, podkłady, czy smaczki - kończą się zawsze w najmniej odpowiednim momencie. Z nami dostajesz wszystko regularnie, zanim zdążysz się zorientować, że czegoś brakuje.',
    icon: (
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
        class='lucide lucide-paw-print-icon lucide-paw-print'
      >
        <circle cx='11' cy='4' r='2' />
        <circle cx='18' cy='8' r='2' />
        <circle cx='20' cy='16' r='2' />
        <path d='M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z' />
      </svg>
    ),
  },
  {
    title: 'Lubisz spokój i rutynę?',
    description:
      'Nie każdy lubi niespodzianki - zwłaszcza w zakupach. U nas ustawiasz harmonogram raz, a potrzebne rzeczy pojawiają się pod drzwiami bez hałasu, bez przypomnień, bez zakłóceń.',
    icon: (
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
        class='lucide lucide-waves-icon lucide-waves'
      >
        <path d='M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' />
        <path d='M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' />
        <path d='M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' />
      </svg>
    ),
  },
  {
    title: 'Nie chcesz tracić czasu na powtarzalne zakupy?',
    description:
      'Znasz to: co tydzień te same produkty, te same kliknięcia. My robimy to za Ciebie. Ty zyskujesz czas i energię na to, co naprawdę się liczy.',
    icon: (
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
        class='lucide lucide-history-icon lucide-history'
      >
        <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
        <path d='M3 3v5h5' />
        <path d='M12 7v5l4 2' />
      </svg>
    ),
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
      'Tak, zamówienie możesz zmienić lub anulować do dwóch dni przed wysyłką. Możesz to zrobić po zalogowaniu się na swoje konto. Dodatkowo, na dwa dni przed planowaną wysyłką wyślemy Ci maila z przypomnieniem o nadchodzącej dostawie. To jest ostatni moment na zmianę lub anulowanie zamówienia.',
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
      'Tak, możesz to zrobić po zalogowaniu się na swoje konto. Zmiana, anulowanie lub zawieszenie zamówienia musi się odbyć maksymalnie na dwa dni przed planowaną wysyłką.',
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

const products = [
  {
    title: 'Pielęgnacja i higiena',
    description: [
      'Żele do twarzy',
      'Peelingi do twarzy',
      'Kremy do twarzy',
      'Żele pod prysznic',
      'Peelingi do ciała',
      'Płyny do kąpieli',
      'Mydła w płynie i w kostce',
      'Szampony do włosów',
      'Odżywki i maski do włosów',
      'Suche szampony',
      'Lakiery i spraye do włosów',
      'Dezodoranty i antyperspiranty',
      'Balsamy do ciała',
      'Kremy przeciwsłoneczne',
      'Pianki do golenia',
      'Maszynki do golenia',
      'Kremy do depilacji ',
      'Balsamy i olejki do brody',
      'Kremy do rąk',
      'Kremy do stóp',
      'Żele do rąk antybakteryjne',
      'Pasty do zębów',
      'Płyny do płukania ust',
      'Szczoteczki do zębów',
      'Nici dentystyczne i flossery',
      'Kleje i kremy mocujące do protez',
      'Płyny do higieny intymnej',
    ].join(', '),
    icon: (
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
        class='lucide lucide-soap-dispenser-droplet-icon lucide-soap-dispenser-droplet'
      >
        <path d='M10.5 2v4' />
        <path d='M14 2H7a2 2 0 0 0-2 2' />
        <path d='M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19' />
        <path d='M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3' />
      </svg>
    ),
  },
  {
    title: 'Produkty do domu',
    description: [
      'Płyny do podłóg',
      'Środki do mycia szyb i luster',
      'Środki do mycia kuchni',
      'Środki do mycia łazienki',
      'Środki do mebli',
      'Udraźniaczne do rur',
      'Akcesoria do sprzątania',
      'Proszki i płyny do prania',
      'Płyny do płukania',
      'Odplamiacze i wybielacze',
      'Płyny i kapsułki do zmywarki',
      'Płyny do mycia maczyń',
      'Worki na śmieci',
      'Ręczniki papierowe',
      'Odświeżacze powietrza',
      'Folia spożywcza',
      'Woreczki śniadaniowe',
    ].join(', '),
    icon: (
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
        class='lucide lucide-brush-cleaning-icon lucide-brush-cleaning'
      >
        <path d='m16 22-1-4' />
        <path d='M19 13.99a1 1 0 0 0 1-1V12a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v.99a1 1 0 0 0 1 1' />
        <path d='M5 14h14l1.973 6.767A1 1 0 0 1 20 22H4a1 1 0 0 1-.973-1.233z' />
        <path d='m8 22 1-4' />
      </svg>
    ),
  },
  {
    title: 'Artykuły higieniczne',
    description: [
      'Podpaski',
      'Tampony',
      'Wkładki higieniczne',
      'Chusteczki do higieny intymnej',
      'Płatki kosmetyczne',
      'Patyczki higieniczne',
      'Chusteczki nawilżane',
      'Papier toaletowy',
      'Podkłady higieniczne',
      'Pieluchomajtki',
      'Chusteczki higieniczne',
    ].join(', '),
    icon: (
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
        class='lucide lucide-heart-handshake-icon lucide-heart-handshake'
      >
        <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
        <path d='M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66' />
        <path d='m18 15-2-2' />
        <path d='m15 18-2-2' />
      </svg>
    ),
  },
  {
    title: 'Artykuły dla dzieci',
    description: [
      'Kremy, balsamy i oliwki',
      'Kremy przeciwłoneczne',
      'Pudry i kremy ochronne podpieluszkowe',
      'Żele i plyny do mycia',
      'Szampony i odżywki',
      'Pasty do zębów',
      'Szczoteczki do zębów',
      'Płyny do płukania ust',
      'Pieluchy dla dzieci',
      'Pieluchomajtki dla dzieci',
      'Chusteczki i papiery nawilżane dla dzieci',
      'Podkłady do przewijania',
      'Płatki higieniczne',
      'Patyczki higieniczne',
    ].join(', '),
    icon: (
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
        class='lucide lucide-baby-icon lucide-baby'
      >
        <path d='M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5' />
        <path d='M15 12h.01' />
        <path d='M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1' />
        <path d='M9 12h.01' />
      </svg>
    ),
  },
  {
    title: 'Zwierzęta',
    description: [
      'Karma sucha',
      'Karma mokra',
      'Żwirek',
      'Przysmaki',
      'Worki na odchody',
      'Gryzaki i zabawki',
    ].join(', '),
    icon: (
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
        class='lucide lucide-paw-print-icon lucide-paw-print'
      >
        <circle cx='11' cy='4' r='2' />
        <circle cx='18' cy='8' r='2' />
        <circle cx='20' cy='16' r='2' />
        <path d='M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z' />
      </svg>
    ),
  },
];
