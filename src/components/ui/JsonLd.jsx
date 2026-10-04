/**
 * Renders one or more JSON-LD blocks. Server component, so the structured
 * data is in the initial HTML where crawlers can see it.
 */
export default function JsonLd({ schemas = [] }) {
  const list = Array.isArray(schemas) ? schemas : [schemas];
  return (
    <>
      {list.filter(Boolean).map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
