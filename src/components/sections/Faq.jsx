import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import FaqItem from '@/components/cards/FaqItem';

/**
 * Two-column FAQ. Items are split so the reading order down each column
 * still matches the visual order in the design.
 */
export default function Faq({ faqs = [], title = 'Frequently Ask Questions' }) {
  const left = faqs.filter((_, i) => i % 2 === 0);
  const right = faqs.filter((_, i) => i % 2 === 1);

  return (
    <Section id="faq" ariaLabel="Frequently asked questions">
      <SectionHeading as="h2" title={title} />
      <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-4 md:gap-6">
          {left.map((faq, index) => (
            <FaqItem key={faq.id} faq={faq} defaultOpen={index === 0} />
          ))}
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          {right.map((faq) => (
            <FaqItem key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </Section>
  );
}
