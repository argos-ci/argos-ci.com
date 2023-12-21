import { Clients } from "./Clients";
import { DeveloperExperience } from "./developer-experience/DeveloperExperience";
import { Features } from "./features/Features";
import { Hero } from "./hero/Hero";
import { Integrations } from "./integrations/Integrations";
import { Playwright } from "./playwright/Playwright";
import { TestDebugging } from "./test-debugging/TestDebugging";
import { VisualTesting } from "./visual-testing/VisualTesting";
import { Why } from "./why/Why";

export const Home = () => {
  return (
    <div style={{ textWrap: "balance" } as any}>
      <Hero />
      <Clients />
      <Why />
      <VisualTesting />
      <DeveloperExperience />
      <TestDebugging />
      <Features />
      <Playwright />
      <Integrations />
    </div>
  );
};

export default function Page() {
  return <Home />;
}
