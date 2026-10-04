import Container from '@/components/ui/Container';
import StatItem from '@/components/cards/StatItem';
import { siteConfig } from '@/lib/config';

/** The five-figure band under the hero. Scrolls horizontally on small screens. */
export default function StatsBar() {
  return (
    <section aria-label="Explore Roots in numbers" className="pt-10 sm:pt-14">
      <Container>
        <dl className="grid grid-cols-3 gap-y-6 rounded-card bg-[#EDE9E2]/70 px-5 py-6 sm:grid-cols-5 sm:gap-0 sm:divide-x sm:divide-gold/25 sm:px-8">
          {siteConfig.stats.map((stat) => (
            <div key={stat.id} className="sm:px-3">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <StatItem value={stat.value} label={stat.label} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
