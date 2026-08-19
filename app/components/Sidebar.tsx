"use client";
import React from "react";

export interface ConfigState {
  krok: number;
  sablona: string;
  delka: number;
  sirka: number;
  znacky: { start: boolean; cil: boolean; cisla: boolean; cary: boolean };
  logoUrl: string | null;
  text: string;
  barvaPodlahy: string;
  barvaCar: string;
}

interface SidebarProps {
  config: ConfigState;
  setConfig: React.Dispatch<React.SetStateAction<ConfigState>>;
  onOpenModal: () => void;
}

export const BARVY_PODLAHY = [
  { nazev: "Černá", hex: "#121212" },
  { nazev: "Šedá", hex: "#2a2d34" },
  { nazev: "Modrá", hex: "#1d4ed8" },
  { nazev: "Červená", hex: "#b91c1c" },
];

export const BARVY_CAR = [
  { nazev: "Bílá", hex: "#ffffff" },
  { nazev: "Žlutá", hex: "#facc15" },
];

export default function Sidebar({ config, setConfig, onOpenModal }: SidebarProps) {
  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setConfig((p) => ({ ...p, logoUrl: ev.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ flex: "1 1 320px", background: "#181920", padding: "24px", borderRadius: "12px", border: "1px solid #2d313e" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <span style={{ fontSize: "12px", color: "#e11d48", fontWeight: "bold" }}>KROK {config.krok} Z 6</span>
        <span style={{ fontSize: "12px", color: "#9ca3af" }}>0{config.krok}/06</span>
      </div>

      {config.krok === 1 && (
        <div>
          <h2 style={{ fontSize: "16px", marginBottom: "12px" }}>VYBERTE ŠABLONU</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {["BASIC TRACK", "HYROX SETUP", "BRAND MAT", "WIDE TRACK"].map((s) => (
              <button key={s} onClick={() => setConfig((p) => ({ ...p, sablona: s }))} style={{ padding: "10px", background: config.sablona === s ? "#e11d48" : "#232631", color: "#fff", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {config.krok === 2 && (
        <div>
          <h2 style={{ fontSize: "16px", marginBottom: "12px" }}>ROZMĚRY</h2>
          <label style={{ fontSize: "12px", display: "block" }}>Délka: {config.delka} cm</label>
          <input type="range" min="500" max="2500" step="50" value={config.delka} onChange={(e) => setConfig((p) => ({ ...p, delka: Number(e.target.value) }))} style={{ width: "100%", marginBottom: "12px" }} />
          <label style={{ fontSize: "12px", display: "block" }}>Šířka: {config.sirka} cm</label>
          <input type="range" min="100" max="400" step="10" value={config.sirka} onChange={(e) => setConfig((p) => ({ ...p, sirka: Number(e.target.value) }))} style={{ width: "100%" }} />
        </div>
      )}

      {config.krok === 3 && (
        <div>
          <h2 style={{ fontSize: "16px", marginBottom: "12px" }}>ZNAČENÍ</h2>
          {["start", "cil", "cisla", "cary"].map((z) => (
            <label key={z} style={{ display: "block", marginBottom: "8px", textTransform: "uppercase", fontSize: "12px" }}>
              <input type="checkbox" checked={config.znacky[z as keyof typeof config.znacky]} onChange={(e) => setConfig((p) => ({ ...p, znacky: { ...p.znacky, [z]: e.target.checked } }))} style={{ marginRight: "8px" }} />
              {z}
            </label>
          ))}
        </div>
      )}

      {config.krok === 4 && (
        <div>
          <h2 style={{ fontSize: "16px", marginBottom: "12px" }}>NAHRÁT LOGO</h2>
          <input type="file" accept="image/*" onChange={handleLogo} />
        </div>
      )}

      {config.krok === 5 && (
        <div>
          <h2 style={{ fontSize: "16px", marginBottom: "12px" }}>VLASTNÍ TEXT</h2>
          <input type="text" value={config.text} onChange={(e) => setConfig((p) => ({ ...p, text: e.target.value }))} style={{ width: "100%", padding: "8px", background: "#232631", color: "#fff", border: "1px solid #374151", borderRadius: "6px" }} />
        </div>
      )}

      {config.krok === 6 && (
        <div>
          <h2 style={{ fontSize: "16px", marginBottom: "12px" }}>BARVY</h2>
          <p style={{ fontSize: "12px", color: "#9ca3af" }}>Podlaha:</p>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {BARVY_PODLAHY.map((b) => (
              <button key={b.hex} onClick={() => setConfig((p) => ({ ...p, barvaPodlahy: b.hex }))} style={{ width: "28px", height: "28px", borderRadius: "50%", background: b.hex, border: "none", cursor: "pointer" }} />
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
        {config.krok > 1 && <button onClick={() => setConfig((p) => ({ ...p, krok: p.krok - 1 }))} style={{ flex: 1, padding: "10px", background: "#232631", color: "#fff", border: "none", borderRadius: "6px" }}>Zpět</button>}
        {config.krok < 6 ? (
          <button onClick={() => setConfig((p) => ({ ...p, krok: p.krok + 1 }))} style={{ flex: 2, padding: "10px", background: "#e11d48", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold" }}>Dále</button>
        ) : (
          <button onClick={onOpenModal} style={{ flex: 2, padding: "10px", background: "#16a34a", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold" }}>Poptat</button>
        )}
      </div>
    </div>
  );
}