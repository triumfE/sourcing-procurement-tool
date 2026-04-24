"use client";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { forecastData } from "./data";

const signals = [
  { label:"Hot Rolled Plate EU", trend:"up", val:"+3–5%",   h:"6m",  color:"#d97706", reason:"Stigande EU-efterfrågan. Importtullar USA driver omdirigering." },
  { label:"Nickel (LME)",        trend:"up", val:"+5–8%",   h:"12m", color:"#7c3aed", reason:"EV-batteriefterfrågan långsiktigt. Indonesisk prod håller nere kortsiktigt." },
  { label:"Bronze NiAlBronze",   trend:"up", val:"+2–4%",   h:"12m", color:"#b45309", reason:"Kopparpris trending up. NiAlBronze följer Cu med ~2 mån fördröjning." },
  { label:"TTF Gas",             trend:"up", val:"+10–15%",  h:"6m",  color:"#dc2626", reason:"Lager under normalnivå Q1 2026. Geopolitisk LNG-risk Mellanöstern." },
  { label:"El Norden",           trend:"flat",val:"±5%",     h:"6m",  color:"#16a34a", reason:"Normala vattennivåer Norge. Vindkraftsexpansion balanserar." },
  { label:"Container Shanghai–EU",trend:"flat",val:"±8%",   h:"6m",  color:"#0891b2", reason:"Röda Havet-omdirigering pågår. Ny normalnivå ~2 500 USD/FEU." },
  { label:"EU ETS Carbon",       trend:"up", val:"+5–10%",  h:"12m", color:"#0c2340", reason:"CBAM-utfasning av gratistilldelning. Stigande compliance-kostnader." },
  { label:"Aluminium (LME)",     trend:"up", val:"+3–6%",   h:"12m", color:"#0070f3", reason:"Kina minskar exportrabatter. EU CBAM ökar importkostnad." },
];

const icon = (t:string) => t==="up"?"↑":t==="down"?"↓":"→";
const clr  = (t:string) => t==="up"?"#d97706":t==="down"?"#dc2626":"#16a34a";

const chartData = forecastData.map(d=>({
  ...d,
  hrpAsia_a: d.type==="actual"?d.hrpAsia:undefined,
  hrpEU_a:   d.type==="actual"?d.hrpEU:undefined,
  hrpAsia_f: d.type==="forecast"||(d.m==="Mar'26")?d.hrpAsia:undefined,
  hrpEU_f:   d.type==="forecast"||(d.m==="Mar'26")?d.hrpEU:undefined,
}));

export default function ForecastTab() {
  return (
    <div>
      {/* Signal cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12, marginBottom:24 }}>
        {signals.map(s=>(
          <div key={s.label} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{s.label}</span>
              <span style={{ fontSize:18, fontWeight:800, color:clr(s.trend) }}>{icon(s.trend)}</span>
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:8 }}>
              <span style={{ fontSize:12, fontWeight:700, color:clr(s.trend), background:`${clr(s.trend)}18`, padding:"2px 8px", borderRadius:999 }}>{s.val}</span>
              <span style={{ fontSize:12, color:"#94a3b8", padding:"2px 8px", background:"#f8fafc", borderRadius:999, border:"1px solid #e2e8f0" }}>{s.h}</span>
            </div>
            <div style={{ fontSize:12, color:"#64748b", lineHeight:1.5 }}>{s.reason}</div>
          </div>
        ))}
      </div>

      {/* Forecast chart */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 2px" }}>Hot Rolled Plate — Prognos (EUR/tonne)</h3>
        <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 14px" }}>Heldragen = faktisk · Streckad = prognos · Pivot: Mar 2026</p>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData} margin={{ top:4, right:16, bottom:4, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
            <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={45} domain={[550,800]} />
            <Tooltip formatter={(v,n)=>v?[`${v} EUR/t`,n]:[null,n]} />
            <ReferenceLine x="Mar'26" stroke="#94a3b8" strokeDasharray="4 2" label={{ value:"Nu", fontSize:10, fill:"#94a3b8" }} />
            <Line type="monotone" dataKey="hrpEU_a"   name="Europa (faktisk)"  stroke="#0070f3" strokeWidth={2} dot={false} connectNulls={false} />
            <Line type="monotone" dataKey="hrpAsia_a"  name="Asien (faktisk)"   stroke="#0891b2" strokeWidth={2} dot={false} connectNulls={false} />
            <Line type="monotone" dataKey="hrpEU_f"    name="Europa (prognos)"  stroke="#0070f3" strokeWidth={2} dot={false} strokeDasharray="6 3" connectNulls={false} />
            <Line type="monotone" dataKey="hrpAsia_f"  name="Asien (prognos)"   stroke="#0891b2" strokeWidth={2} dot={false} strokeDasharray="6 3" connectNulls={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
