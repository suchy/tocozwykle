import { ChevronDown, ShoppingCart } from '../components/icons.tsx';
import { Layout, LayoutProps } from '../components/Layout.tsx';
import { benefits, howItWorks, nav, products, questions } from './data.tsx';
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
    title: 'To co zwykle - cykliczne i wygodne dostawy Twoich zakupów',
    description:
      'Zamawiaj to, co zwykle – wygodnie, cyklicznie i bez stresu. Produkty dla Ciebie, dzeci, zwierząt i Twojego domu. Zgodnie z Twoim harmonogramem.',
  };

  return (
    <Layout {...props} head={h}>
      <main class='bg-white'>
        <div class='bg-[#24B67B] px-6 py-3'>
          <div class='max-w-7xl mx-auto flex items-center justify-between'>
            <a
              href='/'
              title='To co zwykle - cykliczne i wygodne dostawy Twoich zakupów'
              class='text-white font-medium bg-emerald-800 hover:bg-emerald-600 rounded-sm px-4 py-2 flex items-center gap-2'
            >
              <ShoppingCart />
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
            <h1 class='text-white font-semibold mb-8 md:max-w-2/3 uppercase leading-relaxed text-2xl sm:text-3xl'>
              Twoje zakupy<br />dostarczane cyklicznie<br />zgodnie z Twoim
              harmonogramem
            </h1>

            <div class='md:max-w-1/2'>
              <p class='mb-8 text-[#ccc] leading-relaxed text-sm'>
                Wybierz produkty, których potrzebuejsz, ustaw harmonogram dostaw
                i zapomnij o ciągłym podejmowaniu decyzji. Dostarczymy Twoje
                zakupy cyklicznie, dokładnie kiedy potrzebujesz. Ruszamy już
                wkrótce!
              </p>

              <JoinButton />
            </div>
          </div>
        </div>

        <section class='px-6 py-12' id='jak-to-dziala'>
          <div class='max-w-7xl mx-auto'>
            <h2 class='text-center mb-8 text-2xl font-semibold uppercase'>
              Jak to działa
            </h2>

            <ol class='mx-auto max-w-4xl'>
              {howItWorks.map((h) => (
                <li class='flex items-center gap-6 mb-6 last:mb-0 border-b border-b-gray-200 last:border-b-0 pb-6 last:pb-0'>
                  <span class='rounded-sm bg-[#24B67B] p-2 text-white shrink-0'>
                    <h.icon width={36} height={36} />
                  </span>

                  <div>
                    <p class='text-lg font-medium'>{h.title}</p>
                    <p class='text-sm text-gray-500'>{h.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div class='text-center mt-12'>
              <JoinButton />
            </div>
          </div>
        </section>

        <Section
          title='Dlaczego warto?'
          description='Dostarczymy Twoje zakupy cyklicznie, dokładnie kiedy potrzebujesz - bez stresu, bez wysiłku, bez niespodzianek.'
          id='dlaczego-warto'
          class='bg-gray-50'
        >
          <GridSection items={benefits} />

          <div class='text-center mt-12'>
            <JoinButton />
          </div>
        </Section>

        <Section
          title='Produkty'
          description='Poznaj kategorie produktów, które już wkrótce będą dostępne - dla Ciebie, Twojego domu, dzieci i pupila.'
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
                <p>{q.question}</p>

                <ChevronDown class='group-open:rotate-180 shrink-0' />
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
              <div class='flex items-center flex-col sm:flex-row gap-2'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  class='bg-white rounded-sm border border-emerald-800 text-base text-slate-700 px-4 py-2 sm:grow focus:outline-0 focus:ring-2 focus:ring-emerald-600 w-full sm:w-auto'
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
              <ShoppingCart />
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
