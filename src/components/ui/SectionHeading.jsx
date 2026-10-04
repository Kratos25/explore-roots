import clsx from '@/lib/clsx';

export default function SectionHeading({
  title,
  description,
  align = 'center',
  as: Tag = 'h2',
  className,
  id,
}) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      <Tag
        id={id}
        className="font-display text-[26px] leading-tight tracking-tight text-ink sm:text-[32px] lg:text-[38px]"
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={clsx(
            'max-w-prose text-[15px] leading-relaxed text-ink-soft',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
