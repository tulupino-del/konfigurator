"use client";
import React, { useState } from "react";
import { ConfigState } from "./Sidebar";

export default function Canvas({ config, setConfig }: { config: ConfigState; setConfig: React.Dispatch<React.SetStateAction<ConfigState>> }) {
  const [zoom, setZoom] = useState(1);
  const svgWidth = Math.max(350, config.delka / 2.5);
  const svgHeight = Math.max(120, config.sirka * 0.9);

  return (
    <div style={{ flex: "2 1 450px", background: "#090a0d", border: "1px solid #2d313e", borderRadius: "12px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", background: "#181920", borderBottom: "1px solid #2d313e" }}>
        {[1, 2, 3, 4, 5, 6].map((k) => (
          <button key={k} onClick={() => setConfig((p) => ({ ...p, krok: k }))} style={{ flex: 1, padding: "10px", background: config.krok === k ? "#232631" : "transparent", color: config.krok === k ? "#e11d48" : "#9ca3af", border: "none", borderBottom: config.krok === k ? "2px solid #e11d48" : "none", fontSize: "11px", fontWeight: "bold" }}>
            0{k}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "30px", position: "relative" }}>
        <div style={{ position: "absolute", bottom: "10px", right: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <button onClick={() => setZoom((z) => Math.min(1.8, z + 0.1))} style={{ width: "28px", height: "28px", background: "#232631", color: "#fff", border: "none", borderRadius: "4px" }}>+</button>
          <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))} style={{ width: "28px", height: "28px", background: "#232631", color: "#fff", border: "none", borderRadius: "4px" }}>-</button>
        </div>
        <div style={{ transform: `scale(${zoom})`, transition: "transform 0.2s" }}>
          <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ background: config.barvaPodlahy, borderRadius: "6px" }}>
            {config.znacky.cary && <line x1="0" y1={svgHeight / 2} x2={svgWidth} y2={svgHeight / 2} stroke={config.barvaCar} strokeDasharray="6 6" strokeWidth="2" />}
            {config.znacky.start && <text x="25" y={svgHeight / 2 + 4} fill={config.barvaCar} fontSize="11" fontWeight="bold">START</text>}
            {config.znacky.cil && <text x={svgWidth - 45} y={svgHeight / 2 + 4} fill={config.barvaCar} fontSize="11" fontWeight="bold">FINISH</text>}
            {config.text && <text x={svgWidth / 2} y={svgHeight - 15} fill={config.barvaCar} fontSize="12" fontWeight="bold" textAnchor="middle">{config.text}</text>}
            {config.logoUrl && <image href={config.logoUrl} x={svgWidth / 2 - 20} y={svgHeight / 2 - 20} height="25" width="40" />}
          </svg>
        </div>
      </div>
    </div>
  );
}