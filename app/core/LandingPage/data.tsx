import {
  Baby,
  Brain,
  CalendarSync,
  Cleaning,
  Handshake,
  History,
  Mail,
  PackageCheck,
  PawPrint,
  ShoppingCart,
  SoapDispenserDroplet,
  Truck,
  Wallet,
  Waves,
} from '../components/icons.tsx';

export const nav = [
  { text: 'Jak to działa', id: 'jak-to-dziala' },
  { text: 'Dlaczego warto', id: 'dlaczego-warto' },
  { text: 'Produkty', id: 'produkty' },
  { text: 'Najczęściej zadawane pytania', id: 'najczesciej-zadawane-pytania' },
];

export const benefits = [
  {
    title: 'Męczy Cię podejmowanie drobnych decyzji każdego dnia?',
    description:
      'Papier, płyn, pasta, karma, ręczniki... Drobiazgi, które potrafią zjeść pół dnia (i głowę). Z nami wybierasz raz - i zrzucasz z siebie ciężar codziennego decydowania.',
    icon: Brain,
  },
  {
    title: 'Masz dzieci w domu?',
    description:
      'Codzienność z dziećmi to logistyka na pełen etat. Dzięki cyklicznym dostawom środków higienicznych, proszku do prania czy papieru toaletowego, masz jedną rzecz mniej na głowie - i więcej czasu dla rodziny.',
    icon: Baby,
  },
  {
    title: 'Mieszkasz ze zwierzakiem?',
    description:
      'Karma, żwirek, podkłady, czy smaczki - kończą się zawsze w najmniej odpowiednim momencie. Z nami dostajesz wszystko regularnie, zanim zdążysz się zorientować, że czegoś brakuje.',
    icon: PawPrint,
  },
  {
    title: 'Lubisz spokój i rutynę?',
    description:
      'Nie każdy lubi niespodzianki - zwłaszcza w zakupach. U nas ustawiasz harmonogram raz, a potrzebne rzeczy pojawiają się pod drzwiami bez hałasu, bez przypomnień, bez zakłóceń.',
    icon: Waves,
  },
  {
    title: 'Nie chcesz tracić czasu na powtarzalne zakupy?',
    description:
      'Znasz to: co tydzień te same produkty, te same kliknięcia. My robimy to za Ciebie. Ty zyskujesz czas i energię na to, co naprawdę się liczy.',
    icon: History,
  },
];

export const howItWorks = [
  {
    title: 'Wybierz produkty, których potrzebujesz',
    description:
      'Dodaj je do zamówienia a my będziemy Ci je dostarczać cyklicznie.',
    icon: ShoppingCart,
  },
  {
    title: 'Ustaw harmonogram cyklicznych dostaw',
    description:
      'W każdą środę? Co dwa tygodnie? Raz na miesiąc? Nie ma sprawy, możesz ustawić harmonogram dokładnie tak jak Ci pasuje.',
    icon: CalendarSync,
  },
  {
    title: 'Wybierz sposób dostawy',
    description: 'Masz do wyboru paczkomaty InPost lub kuriera DPD.',
    icon: PackageCheck,
  },
  {
    title: 'Wybierz metodę płatności',
    description:
      'Płatność jest pobierana automatycznie tuż przed każdą wysyłką.',
    icon: Wallet,
  },
  {
    title: 'Dwa dni przed planowaną dostawą wyślemy Ci przypomnienie',
    description: 'Możesz zmienić, zawiesić lub anulowć swoje zamówienie.',
    icon: Mail,
  },
  {
    title: 'Wysyłamy Twoje zamówienie',
    description:
      'Zgodnie z wybranym przez Ciebie harmonogramem i sposobem dostawy. Nie musisz podejmować już żadnych decyzji.',
    icon: Truck,
  },
];

export const questions = [
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
      'W tym momencie planujemy dostawy za pomocą paczkomatów InPost i dostawy "do drzwi" z kurierem DPD. Daj znam znać, jeśli w Twoim regionie inna forma dostawy sprawdzi się lepiej.',
  },
  {
    question:
      'Co się stanie, jeśli nie będę mógł odebrać przesyłki w wyznaczonym terminie?',
    answer:
      'To zależy od wybranej formy dostawy. W przypadku paczkomatu InPost, paczka będzie na Ciebie czekać 2 dni (InPost pozwala na przedłużenie czasu odbioru). Paczka DPD będzie na Ciebie czekać w punkcie odbioru również przez 2 dni. Później zostanie do nas zwrócona. ',
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

export const products = [
  {
    title: 'Pielęgnacja i higiena',
    description:
      'Żele do twarzy, peelingi do twarzy, kremy do twarzy, żele pod prysznic, peelingi do ciała, płyny do kąpieli, mydła w płynie i w kostce, szampony do włosów, odżywki i maski do włosów, suche szampony, lakiery i spraye do włosów, dezodoranty i antyperspiranty, balsamy do ciała, kremy przeciwsłoneczne, pianki do golenia, maszynki do golenia, kremy do depilacji, balsamy i olejki do brody, kremy do rąk, kremy do stóp, żele do rąk antybakteryjne, pasty do zębów, płyny do płukania ust, szczoteczki do zębów, nici dentystyczne i flossery, kleje i kremy mocujące do protez, płyny do higieny intymnej...',
    icon: SoapDispenserDroplet,
  },
  {
    title: 'Produkty do domu',
    description:
      'Płyny do podłóg, środki do mycia szyb i luster, środki do mycia kuchni, środki do mycia łazienki, środki do mebli, udraźniaczne do rur, akcesoria do sprzątania, proszki i płyny do prania, płyny do płukania, odplamiacze i wybielacze, płyny i kapsułki do zmywarki, płyny do mycia maczyń, worki na śmieci, ręczniki papierowe, odświeżacze powietrza, folia spożywcza, woreczki śniadaniowe...',
    icon: Cleaning,
  },
  {
    title: 'Artykuły higieniczne',
    description:
      'Podpaski, tampony, wkładki higieniczne, chusteczki do higieny intymnej, płatki kosmetyczne, patyczki higieniczne, chusteczki nawilżane, papier toaletowy, podkłady higieniczne, pieluchomajtki, chusteczki higieniczne...',
    icon: Handshake,
  },
  {
    title: 'Artykuły dla dzieci',
    description:
      'Kremy, balsamy i oliwki, kremy przeciwłoneczne, pudry i kremy ochronne podpieluszkowe, żele i plyny do mycia, szampony i odżywki, pasty do zębów, szczoteczki do zębów, płyny do płukania ust, pieluchy dla dzieci, pieluchomajtki dla dzieci, chusteczki i papiery nawilżane dla dzieci, podkłady do przewijania, płatki higieniczne, patyczki higieniczne...',
    icon: Baby,
  },
  {
    title: 'Zwierzęta',
    description:
      'Karma sucha, karma mokra, żwirek, przysmaki, worki na odchody, gryzaki i zabawki...`',
    icon: PawPrint,
  },
];
