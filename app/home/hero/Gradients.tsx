import { SVGProps } from "react";

export function Gradients(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1400}
      height={3436}
      fill="none"
      viewBox="0 0 1400 3436"
      {...props}
    >
      <path fill="url(#a)" fillOpacity={0.05} d="M0 0h1400v3435.11H0z" />
      <path fill="url(#b)" fillOpacity={0.14} d="M0 0h1400v3435.11H0z" />
      <path fill="url(#c)" fillOpacity={0.11} d="M0 0h1400v3435.11H0z" />
      <defs>
        <radialGradient
          id="a"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(-198.5 -942.256 355.119 -1030.57 712.5 1110.52)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2CD1" />
          <stop offset={1} stopColor="#F848D1" stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id="b"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(280.5 -426.056 -44.4314 1069.28 1057 402.901)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#44BCFF" />
          <stop offset={1} stopColor="#150938" stopOpacity={0} />
        </radialGradient>
        <radialGradient
          id="c"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(74 895.336 -387.374 783.485 321 -92.621)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD749" />
          <stop offset={1} stopColor="#FFD749" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
}
