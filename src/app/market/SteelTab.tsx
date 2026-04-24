"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mepsData, mepsStainless } from "./data";

const carbonS = [
  { key:"hrpEU",    label:"HR Plate EU",           color:"#0070f3" },
  { key:"hrpNord",  label:"HR Plate Nordic",        color:"#0891b2" },
  { key:"hrCoilEU", label:"HR Coil EU",             color:"#0c2340" },
  { key:"crCoilEU", label:"CR Coil EU",             color:"#6366f1" },
  { key:"hdgEU",    label:"HD Galvanised Coil EU",  color:"#d97706" },
  { key:"ezgEU",    label:"Electro Zinc Coated EU", color:"#7c3aed" },
  { key:"merBarEU", label:"Merchant Bar EU",         color:"#16a34a" },
  { key:"rebarEU",  label:"Rebar EU",                color:"#dc2626" },
  { key:"secEU",    label:"Sections & Beams EU",     color:"#92400e" },
  { key:"wirEU",    label:"Wire Rod EU",             color:"#64748b" },
];
const stainS = [
  { key:"c316As",  label:"Coil 316 Asia",        color:"#0070f3" },
  { key:"c316EU",  label:"Coil 316 Europa",      color:"#0891b2" },
  { key:"c430As",  label:"Coil 430 Asia",        color:"#6366f1" },
  { key:"c430EU",  label:"Coil 430 Europa",      color:"#7c3aed" },
  { key:"p304As",  label:"Plate 304 Asia",       color:"#16a34a" },
  { key:"p304EU",  label:"Plate 304 Europa",     color:"#15803d" },
  { key:"p316As",  label:"Plate 316 Asia",       color:"#d97706" },
  { key:"p316EU",  label:"Plate 316 Europa",     color:"#b45309" },
  { key:"pb304EU", label:"Peeled Bar 304 EU",    color:"#dc2626" },
  { key:"pb316EU", label:"Peeled Bar 316 EU",    color:"#0c2340" },
];

export default function SteelTab() {
  const [view, setView] = useState<"carbon"|"stainless">("carbon");
  const data   = view === "carbon" ? mepsData : mepsStainless;
  const series = view === "carbon" ? carbonS  : stainS;
  const last   = data[data.length - 1];
  const prev   = data[data.length - 2];

  return (
    <div>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {(["carbon","stainless"] as const).map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding:"8px 18px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer",
            border: view===v ? "1px solid #0070f3" : "1px solid #e2e8f0",
            background: view===v ? "#0070f3" : "white",
            color: view===v ? "white" : "#64748b",
          }}>{v==="carbon" ? "Kolstål" : "Rostfritt"}</button>
        ))}
      </div>

      {/* KPI row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:10, marginBottom:20 }}>
        {series.slice(0,6).map(s => {
          const c = last?.[s.key] as number; const p = prev?.[s.key] as number;
          const pct = p ? (((c-p)/p)*100).toFixed(1) : "–";
          return (
            <div key={s.key} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"10px 14px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:s.color }} />
                <span style={{ fontSize:11, color:"#64748b" }}>{s.label}</span>
              </div>
              <div style={{ fontSize:18, fontWeight:800, color:"#0f172a" }}>{c?.toLocaleString()}</div>
              <div style={{ fontSize:11, color: Number(pct)>=0 ? "#d97706":"#16a34a", fontWeight:600 }}>
                {Number(pct)>=0 ? "+" : ""}{pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:20 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>
          {view==="carbon" ? "Kolstål EUR/tonne (MEPS)" : "Rostfritt EUR/tonne (MEPS)"}
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top:4, right:16, bottom:4, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
            <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={50} />
            <Tooltip formatter={(v,n)=>[`${Number(v).toLocaleString()} EUR/t`,n]} />
            <Legend wrapperStyle={{ fontSize:11 }} />
            {series.map(s => <Line key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color} dot={false} strokeWidth={2} />)}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead><tr style={{ background:"#f8fafc" }}>
              <th style={{ padding:"8px 14px", textAlign:"left", color:"#64748b", fontWeight:600 }}>Typ</th>
              {data.slice(-5).map(d=><th key={d.m as string} style={{ padding:"8px 10px", textAlign:"right", color:"#64748b", fontWeight:600 }}>{d.m as string}</th>)}
            </tr></thead>
            <tbody>{series.map((s,i)=>(
              <tr key={s.key} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"white":"#fafafa" }}>
                <td style={{ padding:"8px 14px", fontWeight:600, color:"#0f172a", whiteSpace:"nowrap" }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:s.color }} />{s.label}
                  </span>
                </td>
                {data.slice(-5).map(d=><td key={d.m as string} style={{ padding:"8px 10px", textAlign:"right", color:"#334155" }}>{(d[s.key] as number)?.toLocaleString()}</td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
