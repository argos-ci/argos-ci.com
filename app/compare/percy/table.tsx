import { Check, XIcon } from "lucide-react";

import { List, THead, Table, Td, Th, Tr } from "@/components/ComparisonTable";

export function ComparisonTable() {
  return (
    <Table>
      <THead title="Percy by Browserstack" />
      <tbody>
        <Tr>
          <Th>Description</Th>
          <Td>
            Percy is a widely-used testing platform that integrates with CI/CD
            pipelines. It offers visual diffs and regression detection with a
            straightforward interface. However, Percy’s pricing can be a barrier
            for small teams and scaling projects.
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
          <Td>Dollar shave club, Shopify, Canva, Google, Fastly</Td>
          <Td>Meta, MUI, GitBook, Yotpo, Le Monde, Business Insider</Td>
        </Tr>

        <Tr>
          <Th>
            Pricing{" "}
            <div className="text-xs font-medium">(desktop & mobile)</div>
          </Th>
          <Td>Starting at $599/month</Td>
          <Td>Starting at $30/month</Td>
        </Tr>

        <Tr>
          <Th>Pro</Th>
          <Td>
            <div className="flex flex-col gap-3 md:flex-row">
              <List
                list={[
                  "Integrated with Browserstack",
                  "Layout testing",
                  "Baseline management",
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
              list={["Expensive", "Bad developer experience"]}
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
