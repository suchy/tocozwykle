import { Layout, LayoutProps } from './components/Layout.tsx';
import { Section } from './LandingPage/Section.tsx';

export function Success(props?: LayoutProps) {
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
        <div class='min-h-svh'>
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
                      href={`/#${n.id}`}
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

          <Section
            title='Dziękujemy za zainteresowanie'
            description='Wyślemy ci maila, gdy wystartujemy z naszą usługą. Do zobaczenia!'
            id='dzieki'
          >
          </Section>
        </div>

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
