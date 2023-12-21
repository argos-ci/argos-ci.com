import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Home } from "./home/page";

export default function Page() {
  const cookieStore = cookies();
  const jwtCookie = cookieStore.get("argos_jwt");
  if (jwtCookie) {
    return redirect("https://app.argos-ci.com");
  }
  return <Home />;
}
