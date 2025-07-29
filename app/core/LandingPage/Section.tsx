import { JSX, PropsWithChildren } from '@hono/hono/jsx';
import { cn } from '../../utils/cn.ts';

type Props = PropsWithChildren<
  JSX.IntrinsicElements['section'] & {
    title: string;
    description?: string;
    id: string;
  }
>;

export function Section(
  { title, description, id, children, className }: Props,
) {
  return (
    <section class={cn(['px-6 py-12', className])} id={id}>
      <div class='max-w-7xl mx-auto'>
        <h2 class='text-center mb-8 text-2xl font-semibold uppercase'>
          {title}
        </h2>

        {description && (
          <p
            class={cn([
              'mb-12 text-center text-base leading-loose text-gray-500',
              className,
            ])}
          >
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
