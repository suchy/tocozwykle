import { PropsWithChildren } from '@hono/hono/jsx';
import { cn } from '../../utils/cn.ts';
import { assetPath } from '../../utils/assetPath.ts';
import { fingerprint } from '../../utils/fingerprint.ts';

type Props = PropsWithChildren<{
  title?: string;
  description?: string;
  class?: string;
  head?: () => unknown;
}>;

export function Page(
  {
    title = 'To co zwykle',
    description = '',
    children,
    head,
    class: className,
  }: Props,
) {
  return (
    <html lang='pl-PL'>
      <head>
        <meta charset='utf-8' />
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;800&amp;display=swap' />
        <link rel='stylesheet' href={assetPath('/static/styles.css')} />
        <link
          rel='icon'
          href={assetPath('/static/images/favicon.png')}
          type='image/png'
        />

        {!!head && head()}

        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-5FZNS7JQ0M'
        >
        </script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
    window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-5FZNS7JQ0M');
  `,
          }}
        />
      </head>

      <body
        hx-ext='preload'
        class={cn([
          'font-inter text-slate-700 min-h-screen scroll-smooth bg-[#2B2B2B]',
          className,
        ])}
      >
        {children}

        <script
          type='importmap'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(fingerprint.getScriptsImportMap(), null, 2),
          }}
        />

        {
          /* <script
          src={assetPath('/static/vendor/htmx.2.0.4.min.js')}
          defer
        >
        </script>
        <script
          src={assetPath('/static/vendor/htmx-ext-preload@2.1.1.min.js')}
          defer
        >
        </script>
        <script
          src={assetPath('/static/scripts/scripts.js')}
          type='module'
          defer
        >
        </script> */
        }
      </body>
    </html>
  );
}
