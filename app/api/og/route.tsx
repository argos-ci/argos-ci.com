import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

// Use Edge Runtime for faster cold starts
export const runtime = "edge";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const title = searchParams.get("title") || "Argos";
    const subtitle = searchParams.get("subtitle") || "";

    // Build background image URL if provided
    const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://argos-ci.com"}/opengraph-bg.png`;

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: `url(${imageUrl})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          padding: "30px 60px",
        }}
      >
        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Main Title */}
          <div
            style={{
              fontFamily: '"Geist", system-ui, sans-serif',
              fontSize: title.length > 50 ? "56px" : "70px",
              fontWeight: 700,
              color: "#1A1523",
              lineHeight: "1.1",
              marginBottom: subtitle ? "10px" : "0",
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              style={{
                fontSize: "36px",
                fontFamily: '"Inter", system-ui, sans-serif',
                fontWeight: "400",
                color: "#5C5A66",
                lineHeight: "1.3",
                maxWidth: "900px",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Geist",
            data: await loadGoogleFont("Geist", title),
            style: "normal" as const,
            weight: 700 as const,
          },
          subtitle
            ? {
                name: "Inter",
                data: await loadGoogleFont("Inter", subtitle),
                style: "normal" as const,
                weight: 400 as const,
              }
            : null,
        ].filter((x) => x !== null),
      },
    );
  } catch (error) {
    console.error("Error generating OG image:", error);

    // Return a fallback image on error
    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        Something went wrong
      </div>,
      { width: 1200, height: 630 },
    );
  }
}
