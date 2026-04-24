"use client";

import { useState } from "react";
import { FileText, Upload, CheckCircle, Clock, Send, Download, Plus, Globe, Lock } from "lucide-react";

const TEMPLATE_TYPES = [
  { id: "NDA_BILATERAL", label: "NDA — Bilateral", desc: "Mutual confidentiality. Most common for supplier dialogue.", color: "#0070f3", icon: "🤝" },
  { id: "NDA_UNILATERAL", label: "NDA — Unilateral", desc: "One-way disclosure. Use for market research or RFI.", color: "#7c3aed", icon: "📋" },
  { id: "SA_MANUFACTURING", label: "Supply Agreement — Manufacturing", desc: "Full framework agreement. Covers price, quality, lead time, SLA.", color: "#0c2340", icon: "🏭" },
  { id: "SA_SERVICE", label: "Supply Agreement — Service", desc: "For FSE, maintenance, and service scope agreements.", color: "#0891b2", icon: "🔧" },
  { id: "SA_SIMPLE", label: "Supply Agreement — Simple (SMB)", desc: "One-page plain-language agreement for smaller engagements.", color: "#16a34a", icon: "📄" },
  { id: "TCA_REPORT", label: "TCA Report", desc: "Total Cost of Acquisition comparison across multiple suppliers.", color: "#d97706", icon: "📊" },
  { id: "CUSTOM", label: "Upload Your Template", desc: "Use your own T&Cs. AI fills in supplier data automatically.", color: "#64748b", icon: "⬆️" },
];

const LANGUAGES = [
  { code: "en", label: "English" }, { code: "sv", label: "Svenska" },
  { code: "no", label: "Norsk" }, { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" }, { code: "pl", label: "Polski" },
  { code: "fi", label: "Suomi" }, { code: "nl", label: "Nederlands" },
  { code: "es", label: "Español" }, { code: "it", label: "Italiano" },
  { code: "zh", label: "中文" }, { code: "ja", label: "日本語" },
];

const mockDocs = [
  { id: "d1", title: "NDA — Kristinehamn Mekaniska AB", type: "NDA", status: "SIGNED", lang: "EN", date: "2025-03-12", supplier: "Kristinehamn Mekaniska AB" },
  { id: "d2", title: "Supply Agreement — PrecyzjaPlus", type: "SA", status: "SENT", lang: "EN/PL", date: "2025-04-02", supplier: "PrecyzjaPlus Sp. z o.o." },
  { id: "d3", title: "NDA — MachTech s.r.o.", type: "NDA", status: "DRAFT", lang: "EN", date: "2025-04-14", supplier: "MachTech s.r.o." },
];

const STATUS_COLORS: Record<string, string> = {
  SIGNED: "badge-green", SENT: "badge-blue", DRAFT: "badge-gray",
  AWAITING_SIGNATURE: "badge-yellow", EXPIRED: "badge-red",
};

function DocRow({ doc }: { doc: typeof mockDocs[0] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 18px", background: "white", border: "1px solid #e2e8f0",
      borderRadius: 10, marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, background: "#f1f5f9", borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          <FileText size={16} style={{ color: "#0c2340" }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{doc.title}</div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>
            {doc.type} · {doc.lang} · {doc.date}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span className={`badge ${STATUS_COLORS[doc.status]}`}>{doc.status}</span>
        <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px",
          background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 6,
          fontSize: 12, color: "#475569", cursor: "pointer" }}>
          <Download size={12} /> PDF
        </button>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const [view, setView] = useState<"library" | "generate">("library");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState(1);
  const [navalMode, setNavalMode] = useState(false);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 20px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0c2340", margin: 0 }}>Document Hub</h1>
          <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>
            Generate NDA, Supply Agreement, TCA reports · 12+ languages · Adobe Sign integration
          </p>
        </div>
        <button onClick={() => { setView("generate"); setStep(1); setSelectedType(null); }}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px",
            background: "#0c2340", color: "white", border: "none", borderRadius: 8,
            fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={14} /> Generate Document
        </button>
      </div>

      {/* View toggle */}
      <div style={{ display: "flex", gap: 2, background: "white", border: "1px solid #e2e8f0",
        borderRadius: 10, padding: 4, marginBottom: 24, width: "fit-content" }}>
        {(["library", "generate"] as const).map(v => (
          <button key={v} onClick={() => setView(v)}
            style={{ padding: "7px 18px", borderRadius: 7, border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: view === v ? 600 : 400,
              background: view === v ? "#0c2340" : "transparent",
              color: view === v ? "white" : "#64748b" }}>
            {v === "library" ? "Document Library" : "Generate New"}
          </button>
        ))}
      </div>

      {view === "library" && (
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#475569", marginBottom: 12 }}>
            {mockDocs.length} documents
          </div>
          {mockDocs.map(d => <DocRow key={d.id} doc={d} />)}
        </div>
      )}

      {view === "generate" && (
        <div>
          {/* Steps indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
            {["Select type", "Configure", "Preview & send"].map((s, i) => {
              const n = i + 1;
              const active = step === n;
              const done = step > n;
              return (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 24, height: 24, borderRadius: "50%",
                      background: done ? "#16a34a" : active ? "#0c2340" : "#f1f5f9",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, fontWeight: 700, color: (done || active) ? "white" : "#94a3b8" }}>
                      {done ? "✓" : n}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: active ? 600 : 400,
                      color: active ? "#0c2340" : "#94a3b8" }}>{s}</span>
                  </div>
                  {i < 2 && <div style={{ width: 32, height: 1, background: "#e2e8f0" }} />}
                </div>
              );
            })}
          </div>

          {/* Step 1: Select template type */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0c2340", marginBottom: 16 }}>
                Select document type
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                {TEMPLATE_TYPES.map(t => (
                  <div key={t.id} onClick={() => { setSelectedType(t.id); setStep(2); }}
                    style={{ background: "white", border: `2px solid ${selectedType === t.id ? t.color : "#e2e8f0"}`,
                      borderRadius: 12, padding: 20, cursor: "pointer", transition: "all 0.15s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = t.color)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = selectedType === t.id ? t.color : "#e2e8f0")}>
                    <div style={{ fontSize: 24, marginBottom: 10 }}>{t.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 5 }}>{t.label}</div>
                    <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{t.desc}</div>
                    {t.id === "CUSTOM" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10,
                        fontSize: 12, color: "#64748b" }}>
                        <Lock size={11} /> Your T&Cs are never modified — only variables filled
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Configure */}
          {step === 2 && selectedType && (
            <div style={{ maxWidth: 640 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0c2340", marginBottom: 20 }}>
                Configure document
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Supplier */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", display: "block", marginBottom: 6 }}>
                    Supplier
                  </label>
                  <select style={{ width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0",
                    borderRadius: 8, fontSize: 14, outline: "none", color: "#0f172a", background: "white" }}>
                    <option>Kristinehamn Mekaniska AB — Sweden</option>
                    <option>PrecyzjaPlus Sp. z o.o. — Poland</option>
                    <option>MachTech s.r.o. — Czech Republic</option>
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", display: "block", marginBottom: 6 }}>
                    <Globe size={13} style={{ display: "inline", marginRight: 4 }} />
                    Document language
                  </label>
                  <select value={lang} onChange={e => setLang(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0",
                      borderRadius: 8, fontSize: 14, outline: "none", color: "#0f172a", background: "white" }}>
                    {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
                  </select>
                </div>

                {/* Jurisdiction */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", display: "block", marginBottom: 6 }}>
                    Governing law / Jurisdiction
                  </label>
                  <select style={{ width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0",
                    borderRadius: 8, fontSize: 14, outline: "none", color: "#0f172a", background: "white" }}>
                    <option>Sweden — Stockholm District Court</option>
                    <option>England & Wales</option>
                    <option>Norway — Oslo District Court</option>
                    <option>Germany — ICC Frankfurt</option>
                    <option>International — ICC Paris Arbitration</option>
                  </select>
                </div>

                {/* Validity */}
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", display: "block", marginBottom: 6 }}>
                    Validity period
                  </label>
                  <select style={{ width: "100%", padding: "9px 12px", border: "1px solid #e2e8f0",
                    borderRadius: 8, fontSize: 14, outline: "none", color: "#0f172a", background: "white" }}>
                    <option>1 year</option>
                    <option>2 years (recommended)</option>
                    <option>3 years</option>
                    <option>Indefinite</option>
                  </select>
                </div>

                {/* Naval clause */}
                {(selectedType === "NDA_BILATERAL" || selectedType === "SA_MANUFACTURING") && (
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer",
                    padding: 14, background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                    <input type="checkbox" checked={navalMode} onChange={e => setNavalMode(e.target.checked)}
                      style={{ marginTop: 2, accentColor: "#0c2340" }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 2 }}>
                        Add ITAR / export control clauses
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>
                        Include re-export prohibition, end-user statement, dual-use declaration
                      </div>
                    </div>
                  </label>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(1)}
                    style={{ padding: "9px 18px", background: "#f8fafc", border: "1px solid #e2e8f0",
                      borderRadius: 8, fontSize: 13, fontWeight: 600, color: "#475569", cursor: "pointer" }}>
                    ← Back
                  </button>
                  <button onClick={() => setStep(3)}
                    style={{ flex: 1, padding: "9px 18px", background: "#0c2340", color: "white",
                      border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                    Generate Preview →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 3 && (
            <div style={{ maxWidth: 700 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0c2340", marginBottom: 20 }}>
                Preview & Send
              </h2>

              {/* Mock document preview */}
              <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 12,
                padding: 32, marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <div style={{ textAlign: "center", marginBottom: 24, paddingBottom: 20, borderBottom: "2px solid #0c2340" }}>
                  <div style={{ fontSize: 11, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    NON-DISCLOSURE AGREEMENT
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#0c2340" }}>
                    Bilateral Confidentiality Agreement
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#475569", lineHeight: 1.8 }}>
                  <p>This Non-Disclosure Agreement ("<strong>Agreement</strong>") is entered into as of{" "}
                    <strong>[Date of Signing]</strong> by and between:</p>
                  <p><strong>Party A:</strong> [Your Organisation], a company registered under the laws of Sweden,
                    with registered office at [Address];</p>
                  <p><strong>Party B:</strong> Kristinehamn Mekaniska AB, a company registered in Sweden
                    (org. nr. 556xxx-xxxx), with registered office at Kristinehamn, Sweden.</p>
                  <p>The parties wish to explore a potential business relationship and may disclose certain
                    confidential information to each other. This Agreement governs such disclosures.</p>
                  <p style={{ color: "#94a3b8", fontStyle: "italic", fontSize: 12 }}>
                    [... full document continues with confidentiality obligations, permitted disclosures,
                    term, governing law — Stockholm District Court, Sweden ...]
                  </p>
                </div>
                {navalMode && (
                  <div style={{ marginTop: 16, padding: 14, background: "#fff7ed",
                    border: "1px solid #fed7aa", borderRadius: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#9a3412", marginBottom: 4 }}>
                      ITAR / Export Control Clause (added)
                    </div>
                    <div style={{ fontSize: 12, color: "#c2410c", lineHeight: 1.6 }}>
                      Party B acknowledges that information shared may be subject to ITAR (22 C.F.R. §§ 120-130)
                      and agrees not to re-export, transfer, or disclose to any foreign national without prior written authorisation...
                    </div>
                  </div>
                )}
              </div>

              {/* Send options */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "11px", background: "#0c2340", color: "white", border: "none",
                  borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  <Send size={14} /> Send via Adobe Sign
                </button>
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "11px", background: "#f8fafc", color: "#475569",
                  border: "1px solid #e2e8f0", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  <Download size={14} /> Download PDF
                </button>
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
                Adobe Sign integration · DocuSign compatible · Legally binding e-signature
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
