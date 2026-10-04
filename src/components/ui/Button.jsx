import Link from 'next/link';
import clsx from '@/lib/clsx';

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy ' +
  'focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-60';

const variants = {
  primary:
    'bg-gradient-to-b from-sun to-sun-deep text-ink shadow-cta hover:from-sun-deep hover:to-sun-deep',
  outline: 'border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink/5',
  dark: 'bg-charcoal text-white hover:bg-black',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-hover',
  ghost: 'text-ink-soft hover:text-ink',
};

const sizes = {
  sm: 'h-9 rounded-pill px-4 text-sm',
  md: 'h-11 rounded-pill px-6 text-[15px]',
  lg: 'h-12 rounded-pill px-7 text-base',
  block: 'h-10 w-full rounded-lg px-4 text-sm font-semibold',
};

export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  external = false,
  ...props
}) {
  const classes = clsx(base, variants[variant], sizes[size], className);

  if (href) {
    if (external || /^(https?:|tel:|mailto:)/i.test(href)) {
      return (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={classes}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Tag = as || 'button';
  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
}
