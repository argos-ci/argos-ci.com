import { Check, XIcon } from "lucide-react";
import { twc } from "react-twc";

const Tr = twc.tr`border-b align-baseline md:[&>th]:whitespace-nowrap`;
const Td = twc.td`px-3 py-2 text-low`;
const Th = twc.th`px-3 py-2 text-left`;

const TwoColumns = ({ list }: { list: string[] }) => {
  return (
    <>
      <div className="sm:hidden">{list.join(", ")}</div>
      <div className="hidden sm:grid sm:grid-cols-2">
        {list.map((item) => (
          <div key={item} className="text-low">
            - {item}
          </div>
        ))}
      </div>
    </>
  );
};

const OneColumn = ({ list }: { list: string[] }) => (
  <>
    <div className="sm:hidden">{list.join(", ")}</div>
    <div className="hidden sm:grid sm:grid-cols-1">
      {list.map((item) => (
        <div key={item} className="text-low">
          - {item}
        </div>
      ))}
    </div>
  </>
);

const Features = ({
  list = [],
  icon,
}: {
  list: string[];
  icon: React.ReactNode;
}) => (
  <div>
    {list.map((item) => (
      <div key={item} className="flex items-center gap-1 text-low">
        {icon}
        {item}
      </div>
    ))}
  </div>
);

export const ProductComparisonTable = () => (
  <table className="w-full min-w-[50em] table-fixed">
    <thead>
      <Tr className="bg-primary-subtle [&>th]:pb-6 [&>th]:pt-6">
        <Th className="w-[20%]" />
        <Th className="w-[40%]">
          <div className="text-2xl leading-relaxed">Applitools Eyes</div>
          <div className="whitespace-normal text-sm font-medium text-low">
            The All-In-One Next Generation AI-Powered Testing Platform
          </div>
        </Th>
        <Th className="w-[40%]">
          <div className="text-2xl leading-relaxed">Argos</div>
          <div className="whitespace-normal text-sm font-medium text-low">
            Visual Testing for developers
          </div>
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
          <span className="font-semibold">Not public.</span> Contact for pricing
        </Td>
        <Td>Starting at $30/month</Td>
      </Tr>

      <Tr>
        <Th>Pro</Th>
        <Td>
          <div className="flex flex-col gap-3 md:flex-row">
            <Features
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
          <Features
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
          <Features
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
          <Features
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
        <Th>Language compatibility</Th>
        <Td>Java, JavaScript, C#, Ruby & Python</Td>
        <Td>Language agnostic</Td>
      </Tr>

      <Tr>
        <Th>Framework integrations</Th>
        <Td>
          <TwoColumns
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
          />
        </Td>
        <Td>
          <OneColumn
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
  </table>
);
