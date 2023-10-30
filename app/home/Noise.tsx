import bgPattern from "./noise@2x.png";
import clsx from "clsx";

export const Noise = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx("pointer-events-none", className)}
      style={{
        backgroundImage: `url(${bgPattern.src})`,
        backgroundSize: "140px 100px",
        backgroundPosition: "50%",
        backgroundRepeat: "repeat",
      }}
    />
  );
};
