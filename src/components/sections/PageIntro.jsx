import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';

/** Left-aligned page opener used by the Vehicles and Travel Packages pages. */
export default function PageIntro({ title, description }) {
  return (
    <Section spacing="tight" ariaLabel={title}>
      <SectionHeading as="h1" title={title} description={description} align="left" className="max-w-2xl" />
    </Section>
  );
}
