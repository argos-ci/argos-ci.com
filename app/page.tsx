import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Clients } from "./home/Clients";
import { DeveloperExperience } from "./home/developer-experience/DeveloperExperience";
import { Features } from "./home/features/Features";
import { Hero } from "./home/hero/Hero";
import { Integrations } from "./home/integrations/Integrations";
import { TestDebugging } from "./home/test-debugging/TestDebugging";
import { VisualTesting } from "./home/visual-testing/VisualTesting";

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
      <VisualTesting />
      <DeveloperExperience />
      <TestDebugging />
      <Features />
      <Integrations />
    </div>
  );
}
