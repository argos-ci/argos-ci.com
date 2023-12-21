import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Clients } from "./home/Clients";
import { DemoVideo } from "./home/demo-video/demoVideo";
import { DeveloperExperience } from "./home/developer-experience/DeveloperExperience";
import { Features } from "./home/features/Features";
import { Hero } from "./home/hero/Hero";
import { Integrations } from "./home/integrations/Integrations";
import { Playwright } from "./home/playwright/Playwright";
import { TestDebugging } from "./home/test-debugging/TestDebugging";
import { VisualTesting } from "./home/visual-testing/VisualTesting";
import { Why } from "./home/why/Why";

export default function Page() {
  const cookieStore = cookies();
  const jwtCookie = cookieStore.get("argos_jwt");
  if (jwtCookie) {
    return redirect("https://app.argos-ci.com");
  }
  return (
    <div style={{ textWrap: "balance" } as any}>
      <Hero />
      <Clients />
      <DemoVideo />
      <Why />
      <VisualTesting />
      <DeveloperExperience />
      <TestDebugging />
      <Features />
      <Playwright />
      <Integrations />
    </div>
  );
}
