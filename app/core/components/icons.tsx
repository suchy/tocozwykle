import { JSX, PropsWithChildren } from '@hono/hono/jsx';

const Svg = ({
  width = 24,
  height = 24,
  children,
  ...props
}: PropsWithChildren<JSX.HTMLAttributes>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    stroke-width='2'
    stroke-linecap='round'
    stroke-linejoin='round'
    {...props}
  >
    {children}
  </svg>
);

export const ShoppingCart = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <circle cx='8' cy='21' r='1' />
    <circle cx='19' cy='21' r='1' />
    <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
  </Svg>
);

export const ChevronDown = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='m6 9 6 6 6-6' />
  </Svg>
);

export const Brain = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M12 18V5' />
    <path d='M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4' />
    <path d='M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5' />
    <path d='M17.997 5.125a4 4 0 0 1 2.526 5.77' />
    <path d='M18 18a4 4 0 0 0 2-7.464' />
    <path d='M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517' />
    <path d='M6 18a4 4 0 0 1-2-7.464' />
    <path d='M6.003 5.125a4 4 0 0 0-2.526 5.77' />
  </Svg>
);

export const Baby = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5' />
    <path d='M15 12h.01' />
    <path d='M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1' />
    <path d='M9 12h.01' />
  </Svg>
);

export const PawPrint = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <circle cx='11' cy='4' r='2' />
    <circle cx='18' cy='8' r='2' />
    <circle cx='20' cy='16' r='2' />
    <path d='M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z' />
  </Svg>
);

export const Waves = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' />
    <path d='M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' />
    <path d='M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1' />
  </Svg>
);

export const History = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
    <path d='M3 3v5h5' />
    <path d='M12 7v5l4 2' />
  </Svg>
);

export const CalendarSync = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M11 10v4h4' />
    <path d='m11 14 1.535-1.605a5 5 0 0 1 8 1.5' />
    <path d='M16 2v4' />
    <path d='m21 18-1.535 1.605a5 5 0 0 1-8-1.5' />
    <path d='M21 22v-4h-4' />
    <path d='M21 8.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4.3' />
    <path d='M3 10h4' />
    <path d='M8 2v4' />
  </Svg>
);

export const PackageCheck = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='m16 16 2 2 4-4' />
    <path d='M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14' />
    <path d='m7.5 4.27 9 5.15' />
    <polyline points='3.29 7 12 12 20.71 7' />
    <line x1='12' x2='12' y1='22' y2='12' />
  </Svg>
);

export const Wallet = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1' />
    <path d='M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4' />
  </Svg>
);

export const Mail = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' />
    <rect x='2' y='4' width='20' height='16' rx='2' />
  </Svg>
);

export const Truck = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2' />
    <path d='M15 18H9' />
    <path d='M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14' />
    <circle cx='17' cy='18' r='2' />
    <circle cx='7' cy='18' r='2' />
  </Svg>
);

export const SoapDispenserDroplet = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M10.5 2v4' />
    <path d='M14 2H7a2 2 0 0 0-2 2' />
    <path d='M19.29 14.76A6.67 6.67 0 0 1 17 11a6.6 6.6 0 0 1-2.29 3.76c-1.15.92-1.71 2.04-1.71 3.19 0 2.22 1.8 4.05 4 4.05s4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19' />
    <path d='M9.607 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h7V7a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3' />
  </Svg>
);

export const Cleaning = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='m16 22-1-4' />
    <path d='M19 13.99a1 1 0 0 0 1-1V12a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v.99a1 1 0 0 0 1 1' />
    <path d='M5 14h14l1.973 6.767A1 1 0 0 1 20 22H4a1 1 0 0 1-.973-1.233z' />
    <path d='m8 22 1-4' />
  </Svg>
);

export const Handshake = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
    <path d='M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66' />
    <path d='m18 15-2-2' />
    <path d='m15 18-2-2' />
  </Svg>
);

export const Facebook = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
  </Svg>
);

export const Instagram = (props: JSX.HTMLAttributes) => (
  <Svg {...props}>
    <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
    <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
  </Svg>
);
