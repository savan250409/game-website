import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iPhone / iPad: the NG Studio four-tile mark on cream. */
export default function AppleIcon() {
  const tile = (bg: string) => ({ width: 58, height: 58, borderRadius: 18, background: bg });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fffaf2",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", width: 124, gap: 8 }}>
          <div style={tile("#ff5b3a")} />
          <div style={tile("#ffc23c")} />
          <div style={tile("#12b5a5")} />
          <div style={tile("#17181c")} />
        </div>
      </div>
    ),
    size,
  );
}
