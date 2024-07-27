import { Check, XIcon } from "lucide-react";

import { List, Table, Td, Th, Tr } from "@/components/ComparisonTable";

export function ComparisonTable() {
  return (
    <Table>
      <thead>
        <Tr className="bg-primary-subtle [&>th]:pb-6 [&>th]:pt-6">
          <Th className="w-[20%]" />
          <Th className="w-[40%]">
            <div className="text-2xl font-medium text">Applitools Eyes</div>
          </Th>
          <Th className="w-[40%]">
            <div className="text-2xl font-medium text">Argos</div>
          </Th>
        </Tr>
      </thead>

      <tbody>
        <Tr>
          <Th>Description</Th>
          <Td>
            Applitools Eyes is recognized as one of the leading visual testing
            tools. It uses AI to minimize false positives. Applitools offers a
            highly configurable product tailored to meet the needs of enterprise
            market companies. However, their UX/UI is functional but not
            intuitive, and their high pricing can be prohibitive.
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
          <Td>Fortune 500, Adidas, Chanel, Allianz, Wix</Td>
          <Td>Meta, MUI, GitBook, Yotpo, Le Monde, Business Insider</Td>
        </Tr>

        <Tr>
          <Th>Pricing</Th>
          <Td>
            <span className="font-semibold">Not public.</span> Contact for
            pricing
          </Td>
          <Td>Starting at $30/month</Td>
        </Tr>

        <Tr>
          <Th>Pro</Th>
          <Td>
            <div className="flex flex-col gap-3 md:flex-row">
              <List
                list={[
                  "AI-powered",
                  "Highly configurable",
                  "Multi-baseline comparison",
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
                "High price",
                "Requires salesperson to start",
                "Lacks price transparency",
                "Unclear documentation",
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

        <Tr>
          <Th>Languages</Th>
          <Td>Java, JavaScript, C#, Ruby & Python</Td>
          <Td>Language agnostic</Td>
        </Tr>

        <Tr>
          <Th>Integrations</Th>
          <Td>
            <List
              list={[
                "Appium",
                "Cypress",
                "Espresso",
                "Playwright",
                "Protractor",
                "Storybook",
                "TestCafe",
                "Watir",
                "WebDriverIO",
              ]}
              columns={2}
            />
          </Td>
          <Td>
            <List
              list={[
                "Cypress",
                "Ember",
                "Playwright",
                "Puppeteer",
                "WebDriverIO",
              ]}
            />
          </Td>
        </Tr>
      </tbody>
    </Table>
  );
}
