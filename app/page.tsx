"use client";
import React, { useState } from "react";
import Sidebar, { ConfigState } from "./components/Sidebar";
import Canvas from "./components/Canvas";

export default function Home() {
  const [config, setConfig] = useState<ConfigState>({
    krok: 1,
    sablona: "BASIC TRACK",
    delka: 1000,
    sirka: 120,
    znacky: { start: true, cil: true, cisla: true, cary: true },
    logoUrl: null,
    text: "VAS-FLOORS",
    barvaPodlahy: "#121212",
    barvaCar: "#ffffff",
  });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", display: "flex", flexWrap: "wrap", gap: "20px", minHeight: "100vh" }}>
      <Sidebar config={config} setConfig={setConfig} onOpenModal={() => setModalOpen(true)} />
      <Canvas config={config} setConfig={setConfig} />

      {modalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 }}>
          <div style={{ background: "#181920", padding: "24px", borderRadius: "12px", width: "320px", border: "1px solid #2d313e" }}>
            <h3>Poptávka konfigurace</h3>
            <p style={{ fontSize: "12px", color: "#9ca3af", margin: "10px 0" }}>Délka: {config.delka} cm, Šířka: {config.sirka} cm</p>
            <button onClick={() => { alert("Odesláno!"); setModalOpen(false); }} style={{ width: "100%", padding: "10px", background: "#e11d48", color: "#fff", border: "none", borderRadius: "6px" }}>Potvrdit odeslání</button>
            <button onClick={() => setModalOpen(false)} style={{ width: "100%", padding: "8px", background: "transparent", color: "#9ca3af", border: "none", marginTop: "6px" }}>Zavřít</button>
          </div>
        </div>
      )}
    </main>
  );
}