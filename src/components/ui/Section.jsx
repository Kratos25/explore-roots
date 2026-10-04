import clsx from '@/lib/clsx';
import Container from './Container';

/**
 * Standard vertical rhythm for every band on the page.
 * `tight` is used where two sections belong together visually.
 */
export default function Section({
  id,
  as: Tag = 'section',
  className,
  containerClassName,
  spacing = 'default',
  ariaLabel,
  children,
}) {
  const spacings = {
    default: 'py-14 sm:py-16 lg:py-20',
    tight: 'py-10 sm:py-12',
    loose: 'py-16 sm:py-20 lg:py-28',
    none: '',
  };

  return (
    <Tag id={id} aria-label={ariaLabel} className={clsx(spacings[spacing], className)}>
      <Container className={containerClassName}>{children}</Container>
    </Tag>
  );
}
