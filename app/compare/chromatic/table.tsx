import { Check, XIcon } from "lucide-react";

import { List, THead, Table, Td, Th, Tr } from "@/components/ComparisonTable";

export function ComparisonTable() {
  return (
    <Table>
      <THead title="Chromatic" />
      <tbody>
        <Tr>
          <Th>Description</Th>
          <Td>
            Chromatic is a comprehensive visual testing platform that integrates
            seamlessly with Storybook. It provides powerful visual diffs,
            interaction testing, and supports multiple browsers. While it offers
            robust features, its dependency on Storybook and relatively higher
            costs might not suit every team.
          </Td>

          <Td>
            Argos is an open-source visual testing tool that offers a
            plug-and-play approach to catch visual regressions. Argos' strengths
            are its well-crafted UI/UX and fast-growing product, driven by
            first-hand usage and community feedback. Its transparent pricing and
            seamless integrations make it a reliable choice for UI testing.
          </Td>
        </Tr>

        <Tr>
          <Th>Customers</Th>
          <Td>GitHub, Adobe, Toyota, The Guardian, Lego</Td>
          <Td>Meta, MUI, GitBook, Yotpo, Le Monde, Business Insider</Td>
        </Tr>

        <Tr>
          <Th>Pricing</Th>
          <Td>Starting at $149/month (Chrome only)</Td>
          <Td>Starting at $30/month (all platforms)</Td>
        </Tr>

        <Tr>
          <Th>Pro</Th>
          <Td>
            <div className="flex flex-col gap-3 md:flex-row">
              <List
                list={[
                  "Integrates with Storybook, Playwright, and Cypress",
                  "Responsive viewport testing",
                  "TurboSnap for efficient snapshotting",
                ]}
                icon={<Check className="size-4 text-green-500" />}
              />
            </div>
          </Td>
          <Td>
            <List
              list={[
                "Affordable",
                "Plug-and-play",
                "Open-source & community-driven",
                "Well-crafted UI/UX",
              ]}
              icon={<Check className="size-4 text-green-500" />}
            />
          </Td>
        </Tr>

        <Tr>
          <Th>Cons</Th>
          <Td>
            <List
              list={[
                "Higher costs",
                "Depends on Storybook for full feature set",
                "Complex setup for non-Storybook users",
              ]}
              icon={<XIcon className="size-4 text-red-500" />}
            />
          </Td>
          <Td>
            <List
              list={[
                "No AI capabilities",
                "No multi-baseline comparison",
                "Fewer integrations",
              ]}
              icon={<XIcon className="size-4 text-red-500" />}
            />
          </Td>
        </Tr>

        <Tr>
          <Th>Deployment</Th>
          <Td>Cloud & On-premise</Td>
          <Td>Cloud & On-premise</Td>
        </Tr>

        <Tr>
          <Th>Device</Th>
          <Td>Website & Mobile app</Td>
          <Td>Website & Mobile app</Td>
        </Tr>
      </tbody>
    </Table>
  );
}
