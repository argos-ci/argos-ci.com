import Image from "next/image";

import doloreanDark from "./dolorean-dark.svg";
import doloreanLight from "./dolorean-light.svg";

export function Dolorean({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image
        src={doloreanLight.src}
        width={296}
        height={130}
        style={{
          width: "100%",
          height: "auto",
        }}
        alt="Dolorean"
        className="dark:hidden"
      />
      <Image
        src={doloreanDark.src}
        width={296}
        height={130}
        style={{
          width: "100%",
          height: "auto",
        }}
        alt="Dolorean"
        className="hidden dark:block"
      />
    </div>
  );
}
