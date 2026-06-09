import type { NextConfig } from "next";
import path from "node:path";

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Site never needs to be iframed
  { key: "X-Frame-Options", value: "DENY" },
  // Don't leak full URLs cross-origin
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Site uses no sensors/camera/mic — lock them off
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Block foreign scripts/objects; 'unsafe-inline' required by the font
  // pre-paint script (layout.tsx) and Tailwind/React inline style attributes.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile exists in a parent dir).
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
