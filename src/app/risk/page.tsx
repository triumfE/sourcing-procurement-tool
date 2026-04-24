"use client";
import { AlertTriangle, Shield, Globe2, TrendingDown, DollarSign, Users, MapPin, BarChart2 } from "lucide-react";

const risks = [
  { id:1, type:"concentration", severity:"high", supplier:"T-Marine (Nantong)", metric:"32% of propeller hub spend", desc:"Single-source for GX4CrNiMo16 castings. No qualified backup.", action:"Qualify Kaiping Yuanhang as secondary source. Target: Q3 2026." },
  { id:2, type:"certification", severity:"high", supplier:"Osterbergs Industrihandel AB", metric:"ISO14001 expired 2027-08-24", desc:"Environmental cert expiring. SQ score 77.7% — below threshold.", action:"Issue corrective action request. Review at next QBR." },
  { id:3, type:"financial", severity:"medium", supplier:"Lyckes Produktionsverktyg AB", metric:"OTD 51.2%", desc:"Critically low delivery performance. Spend 5.5 MNOK. Financial distress signals.", action:"Reduce order volume. Start sourcing alternatives." },
  { id:4, type:"geopolitical", severity:"medium", supplier:"Kaiping Yuanhang Propeller", metric:"China — High risk country", desc:"Export control exposure. CBAM cost impact. USD/CNY FX risk.", action:"Monitor. Include CBAM impact in TCA. Dual-source strategy." },
  { id:5, type:"concentration", severity:"medium", supplier:"Promeco OY", metric:"26.1 MNOK — 14% of spend", desc:"Finland single source for thruster components. No backup qualified.", action:"Identify European alternatives. RFQ planned Q2 2026." },
  { id:6, type:"esg", severity:"low", supplier:"SKF Marine GmbH", metric:"Scope 3 data missing", desc:"No sustainability reporting received. ISO14001 active but Scope 3 not disclosed.", action:"Request sustainability data package at next review." },
];

const sevColor = (s:string) => s==="high"?"#dc2626":s==="medium"?"#d97706":"#16a34a";
const typeIcon = (t:string) => {
  switch(t) {
    case "concentration": return <Users size={16} style={{ color:"#7c3aed" }} />;
    case "financial": return <TrendingDown size={16} style={{ color:"#dc2626" }} />;
    case "geopolitical": return <Globe2 size={16} style={{ color:"#d97706" }} />;
    case "certification": return <Shield size={16} style={{ color:"#0070f3" }} />;
    case "esg": return <BarChart2 size={16} style={{ color:"#16a34a" }} />;
    default: return <AlertTriangle size={16} style={{ color:"#94a3b8" }} />;
  }
};

const countryRisks = [
  { country:"Norway", suppliers:3635, risk:"Low", spend:"5,645 MNOK" },
  { country:"China", suppliers:466, risk:"High", spend:"1,113 MNOK" },
  { country:"South Korea", suppliers:974, risk:"High", spend:"287 MNOK" },
  { country:"Poland", suppliers:1176, risk:"Medium", spend:"295 MNOK" },
  { country:"India", suppliers:234, risk:"High", spend:"44 MNOK" },
  { country:"Brazil", suppliers:565, risk:"High", spend:"135 MNOK" },
  { country:"Finland", suppliers:998, risk:"Low", spend:"1,812 MNOK" },
  { country:"Sweden", suppliers:684, risk:"Low", spend:"874 MNOK" },
];
const riskColors: Record<string,string> = { Low:"#16a34a", Medium:"#d97706", High:"#dc2626" };

export default function RiskPage() {
  const high = risks.filter(r=>r.severity==="high").length;
  const medium = risks.filter(r=>r.severity==="medium").length;

  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
          <AlertTriangle size={22} style={{ color:"#dc2626" }} />
          <h1 style={{ fontSize:26, fontWeight:800, color:"#0c2340", margin:0 }}>Supply Chain Risk Monitor</h1>
        </div>
        <p style={{ color:"#64748b", fontSize:14, margin:0 }}>Concentration risk, financial distress, geopolitical exposure, certification gaps and ESG compliance.</p>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
        {[
          { label:"High Severity", value:high, color:"#dc2626" },
          { label:"Medium Severity", value:medium, color:"#d97706" },
          { label:"Active Risks", value:risks.length, color:"#0070f3" },
          { label:"Countries Monitored", value:countryRisks.length, color:"#7c3aed" },
        ].map(k => (
          <div key={k.label} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:11, color:"#94a3b8", marginBottom:4 }}>{k.label}</div>
            <div style={{ fontSize:28, fontWeight:800, color:k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Risk alerts */}
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontSize:17, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>Active Risk Alerts</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {risks.map(r => (
            <div key={r.id} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"16px 20px", borderLeft:`4px solid ${sevColor(r.severity)}` }}>
              <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
                <div style={{ width:36, height:36, borderRadius:8, background:`${sevColor(r.severity)}10`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {typeIcon(r.type)}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:14, fontWeight:700, color:"#0f172a" }}>{r.supplier}</span>
                    <span style={{ fontSize:10, fontWeight:600, padding:"2px 8px", borderRadius:999, background:`${sevColor(r.severity)}18`, color:sevColor(r.severity) }}>{r.severity}</span>
                    <span style={{ fontSize:10, color:"#94a3b8", background:"#f1f5f9", padding:"2px 8px", borderRadius:4 }}>{r.type}</span>
                  </div>
                  <div style={{ fontSize:13, fontWeight:600, color:"#475569", marginBottom:4 }}>{r.metric}</div>
                  <div style={{ fontSize:13, color:"#64748b", marginBottom:8, lineHeight:1.5 }}>{r.desc}</div>
                  <div style={{ fontSize:13, color:"#0369a1", background:"#f0f9ff", padding:"8px 12px", borderRadius:6, border:"1px solid #bae6fd" }}>
                    <strong>Action:</strong> {r.action}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country risk */}
      <h2 style={{ fontSize:17, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>Country Risk Overview</h2>
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead><tr style={{ background:"#f8fafc" }}>
            {["Country","Suppliers","Risk Level","Spend"].map(h =>
              <th key={h} style={{ padding:"10px 16px", textAlign:"left", color:"#64748b", fontWeight:600 }}>{h}</th>
            )}
          </tr></thead>
          <tbody>{countryRisks.map((c,i) => (
            <tr key={c.country} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"white":"#fafbfc" }}>
              <td style={{ padding:"10px 16px", fontWeight:600 }}>{c.country}</td>
              <td style={{ padding:"10px 16px" }}>{c.suppliers.toLocaleString()}</td>
              <td style={{ padding:"10px 16px" }}><span style={{ fontSize:12, fontWeight:600, color:riskColors[c.risk], background:`${riskColors[c.risk]}18`, padding:"2px 10px", borderRadius:999 }}>{c.risk}</span></td>
              <td style={{ padding:"10px 16px", fontWeight:600 }}>{c.spend}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
