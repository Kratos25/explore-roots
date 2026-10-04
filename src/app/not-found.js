import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
      <h1 className="font-display text-[32px] tracking-tight text-ink sm:text-[40px]">
        That page has moved on
      </h1>
      <p className="max-w-prose text-[15px] text-ink-soft">
        The link you followed does not exist. Head back to the fleet or the packages and pick up
        from there.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/" variant="primary">
          Go to home
        </Button>
        <Button href="/vehicles" variant="outline">
          Browse vehicles
        </Button>
      </div>
    </Container>
  );
}
