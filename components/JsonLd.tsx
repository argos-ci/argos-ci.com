import { Thing, WithContext } from "schema-dts";

export function JsonLd<T extends Thing>(props: { json: T }) {
  const jsonWithContext = {
    "@context": "https://schema.org",
    ...(props.json as unknown as object),
  } as WithContext<T>;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonWithContext),
      }}
    />
  );
}
