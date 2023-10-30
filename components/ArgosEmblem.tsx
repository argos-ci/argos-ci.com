import * as React from "react";

export const ArgosEmblem = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 126"
    fill="none"
    {...props}
  >
    <path
      fill="url(#a)"
      fillRule="evenodd"
      d="M0 62.815C30.988 20.938 64.397 0 100.229 0c35.83 0 69.087 20.938 99.771 62.815C169.316 104.938 136.058 126 100.229 126 64.397 126 30.988 104.938 0 62.815Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M100.717 115.438c28.928 0 52.379-23.562 52.379-52.627 0-29.063-23.451-52.626-52.379-52.626-28.927 0-52.379 23.563-52.379 52.626 0 8.137-1.658 44.498 2.712 34.984 4.37-9.516 4.956-11.94 7.716-8.612 9.609 11.583 25.77 26.254 41.951 26.254v.001Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#b)"
      d="M100.751 98.838c19.791 0 35.835-16.13 35.835-36.027 0-19.897-16.044-36.027-35.835-36.027-19.79 0-35.835 16.13-35.835 36.027 0 19.897 16.044 36.027 35.835 36.027Z"
    />
    <path
      fill="url(#c)"
      fillRule="evenodd"
      d="M114.321 96.203c18.375-7.462 27.254-28.483 19.828-46.951.001 37.434-40.333 45.097-54.194 31.156-13.862-13.941-11.742-43.082 7.482-51.086-18.375 7.461-27.254 28.482-19.828 46.951 7.423 18.469 28.338 27.392 46.712 19.93Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#d)"
      fillRule="evenodd"
      d="M114.171 91.85c15.313-6.036 26.361-26.45 18.936-44.92.001 37.435-30.565 41.154-44.427 27.213-13.862-13.94-7.433-37.62 3.037-44.43-18.374 7.463-27.264 25.962-19.84 44.43 7.424 18.47 26.982 23.743 42.294 17.707Z"
      clipRule="evenodd"
    />
    <defs>
      <radialGradient
        id="b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(49.5529 0 0 49.8186 111.708 62.811)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#311476" />
        <stop offset={1} stopColor="#2B214F" />
      </radialGradient>
      <radialGradient
        id="c"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(50.31718 25.84342 -25.91885 50.46404 36.517 126.056)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1B357A" />
        <stop offset={1} stopColor="#512BCD" />
      </radialGradient>
      <radialGradient
        id="d"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(46.0444 35.84278 -34.94295 44.88845 27.861 131.395)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#493CA8" />
        <stop offset={1} stopColor="#512BCC" />
      </radialGradient>
      <linearGradient
        id="a"
        x1={160.24}
        x2={99.979}
        y1={46.408}
        y2={111.071}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#804FCE" />
        <stop offset={1} stopColor="#2D3383" />
      </linearGradient>
    </defs>
  </svg>
);
