type Props = {
  items: { title: string; description: string; icon: any }[];
};

export function GridSection({ items }: Props) {
  return (
    <div class='grid md:grid-cols-2 gap-6'>
      {items.map((i) => (
        <div>
          <header class='flex items-center gap-4 mb-2'>
            <i.icon class='shrink-0' />
            <h3 class='font-semibold'>{i.title}</h3>
          </header>

          <p
            class='text-sm leading-loose text-gray-500 pl-10'
            dangerouslySetInnerHTML={{ __html: i.description }}
          />
        </div>
      ))}
    </div>
  );
}
