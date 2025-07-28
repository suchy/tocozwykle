import { useRequestContext } from '@hono/hono/jsx-renderer';
import { PropsWithChildren } from '@hono/hono/jsx';
import { Page } from './Page.tsx';

export type LayoutProps<P extends object = {}> = PropsWithChildren<
  {
    head?: {
      title?: string;
      description?: string;
      head?: () => unknown;
    };
  } & P
>;

export function Layout<P extends object>(
  { children, head }: LayoutProps<P>,
) {
  const c = useRequestContext();

  const { isHxRequest } = c.var;

  if (isHxRequest) {
    return <>{children}</>;
  }

  return <Page {...head}>{children}</Page>;
}
