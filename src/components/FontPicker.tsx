"use client";

import { useEffect, useState } from "react";

export const FONT_KEY = "pa-moto-font";

const FONTS = [
  { id: "inter", label: "Inter" },
  { id: "geist", label: "Geist" },
  { id: "open-sans", label: "Open Sans" },
  { id: "nunito", label: "Nunito" },
  { id: "lora", label: "Lora (serif)" },
  { id: "atkinson", label: "Atkinson (easy-read)" },
] as const;

export default function FontPicker() {
  const [font, setFont] = useState("geist");

  // The inline script in layout.tsx applies the saved font before hydration;
  // here we just sync the select to it.
  useEffect(() => {
    setFont(document.documentElement.dataset.font ?? "geist");
  }, []);

  function change(id: string) {
    setFont(id);
    document.documentElement.dataset.font = id;
    try {
      window.localStorage.setItem(FONT_KEY, id);
    } catch {
      // storage unavailable — font still applies for this visit
    }
  }

  return (
    <select
      value={font}
      onChange={(e) => change(e.target.value)}
      aria-label="Font"
      className="text-xs rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-slate-600 hover:border-slate-400 cursor-pointer"
    >
      {FONTS.map((f) => (
        <option key={f.id} value={f.id}>
          {f.label}
        </option>
      ))}
    </select>
  );
}
