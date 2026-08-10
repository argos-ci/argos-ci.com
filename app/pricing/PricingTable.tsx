import {
  ARGOS_HOBBY_SCREENSHOT_COUNT,
  ARGOS_PRO_FLAT_PRICE,
  ARGOS_PRO_FLAT_SCREENSHOT_COUNT,
  ARGOS_SCREENSHOT_PRICE,
  ARGOS_STORYBOOK_SCREENSHOT_PRICE,
  GITHUB_SSO_PRICE,
  SAML_SSO_PRICE,
} from "@/lib/constants";

const numberFormatter = new Intl.NumberFormat("en-US");
const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 10,
});

function num(value: number) {
  return numberFormatter.format(value);
}

function usd(value: number) {
  return dollarFormatter.format(value);
}

type Row = {
  plan: string;
  price: string;
  included: string;
  extraScreenshot: string;
  extraStorybook: string;
};

const ROWS: Row[] = [
  {
    plan: "Hobby",
    price: `${usd(0)} / mo`,
    included: `${num(ARGOS_HOBBY_SCREENSHOT_COUNT)} screenshots`,
    extraScreenshot: "Not available",
    extraStorybook: "Not available",
  },
  {
    plan: "Pro",
    price: `${usd(ARGOS_PRO_FLAT_PRICE)} / mo`,
    included: `${num(ARGOS_PRO_FLAT_SCREENSHOT_COUNT)} screenshots`,
    extraScreenshot: `${usd(ARGOS_SCREENSHOT_PRICE)} / screenshot`,
    extraStorybook: `${usd(ARGOS_STORYBOOK_SCREENSHOT_PRICE)} / screenshot`,
  },
  {
    plan: "Enterprise",
    price: "Custom",
    included: "Custom volume",
    extraScreenshot: "Custom rate",
    extraStorybook: "Custom rate",
  },
];

/**
 * Machine-legible pricing reference.
 *
 * Rendered as a semantic HTML <table> (server component, plain text) so both
 * humans and AI agents can read Argos pricing without running the calculator.
 */
export function PricingTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">
          Argos pricing per plan and per screenshot
        </caption>
        <thead>
          <tr className="border-b">
            <th scope="col" className="px-4 py-3 font-semibold text-default">
              Plan
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-default">
              Base price
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-default">
              Included screenshots
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-default">
              Extra screenshot
            </th>
            <th scope="col" className="px-4 py-3 font-semibold text-default">
              Extra Storybook screenshot
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.plan} className="border-b last:border-b-0">
              <th
                scope="row"
                className="px-4 py-3 font-medium whitespace-nowrap text-default"
              >
                {row.plan}
              </th>
              <td className="px-4 py-3 whitespace-nowrap text-low tabular-nums">
                {row.price}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-low tabular-nums">
                {row.included}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-low tabular-nums">
                {row.extraScreenshot}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-low tabular-nums">
                {row.extraStorybook}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t px-4 py-5 text-sm text-low">
        A screenshot is any snapshot Argos stores for a build: an image, or a
        non-image file such as Markdown, JSON, or HTML. Usage is billed only on
        successful builds. Standalone media uploads draw on the same allowance:
        an uploaded image counts as 1 screenshot, an uploaded video as 25.
        GitHub SSO is an optional add-on at {usd(GITHUB_SSO_PRICE)} / mo, and
        SAML SSO at {usd(SAML_SSO_PRICE)} / mo.
      </p>
    </div>
  );
}
