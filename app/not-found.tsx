import Link from "next/link";
import { Flower2 } from "lucide-react";

export default function NotFound() {
  return (
    <html lang="tr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          background: "#3D2817",
          color: "#F8F6F1",
          fontFamily: "Inter, system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <Flower2 size={48} color="#9B8FAA" />
        <h1 style={{ fontSize: "2rem", margin: 0 }}>404</h1>
        <p style={{ opacity: 0.8, maxWidth: 360 }}>
          Bu sayfa bahçenin sisinde kayboldu. / This page is lost in the
          garden mist.
        </p>
        <Link
          href="/tr"
          style={{
            marginTop: "0.5rem",
            background: "#7B6B8D",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.5rem",
            textDecoration: "none",
          }}
        >
          Ana Sayfa / Home
        </Link>
      </body>
    </html>
  );
}
