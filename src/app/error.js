'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Error({ error, reset }) {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <h1 className="font-display text-[28px] tracking-tight text-ink sm:text-[34px]">
        Something broke while loading this page
      </h1>
      <p className="max-w-prose text-[15px] text-ink-soft">
        Try loading it again. If it keeps happening, message us on WhatsApp and we will take the
        booking directly.
      </p>
      <Button onClick={reset} variant="primary">
        Try again
      </Button>
    </Container>
  );
}
