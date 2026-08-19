"use client";

import React, { useState } from "react";

export default function Home() {
  const [krok, setKrok] = useState(1);
  const [delka, setDelka] = useState(1000);
  const [sirka, setSirka] = useState(120);

  return (
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ color: "#e11d48" }}>Konfigurátor SprintTrack — VAS-FLOORS</h1>
      <p style={{ color: "#9ca3af", marginBottom: "30px" }}>Aplikace je úspěšně v provozu!</p>

      <div style={{ background: "#181920", padding: "20px", borderRadius: "12px", border: "1px solid #2d313e", display: "inline-block", textAlign: "left", minWidth: "300px" }}>
        <h3>Krok {krok} z 6</h3>
        <p>Délka: <strong>{delka} cm</strong></p>
        <p>Šířka: <strong>{sirka} cm</strong></p>
        <button onClick={() => setKrok((k) => (k % 6) + 1)} style={{ padding: "10px 20px", background: "#e11d48", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }}>
          Další krok
        </button>
      </div>
    </main>
  );
}