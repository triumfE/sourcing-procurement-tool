"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { lmeData, lmeMetals } from "./data";

const latest = lmeData[lmeData.length - 1];
const prev   = lmeData[lmeData.length - 2];

export default function MetalsTab() {
  return (
    <div>
      {/* KPI strip */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:10, marginBottom:24 }}>
        {lmeMetals.map(m => {
          const curr = latest[m.key] as number;
          const prv  = prev[m.key]  as number;
          const pct  = (((curr - prv) / prv) * 100).toFixed(1);
          const up   = curr >= prv;
          return (
            <div key={m.key} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"12px 14px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:m.color, flexShrink:0 }} />
                <span style={{ fontSize:11, color:"#64748b", fontWeight:500 }}>{m.label}</span>
              </div>
              <div style={{ fontSize:20, fontWeight:800, color:"#0f172a" }}>{curr.toLocaleString()}</div>
              <div style={{ fontSize:10, color:"#94a3b8" }}>{m.unit}</div>
              <div style={{ fontSize:11, fontWeight:600, color: up ? "#d97706" : "#16a34a", marginTop:3 }}>
                {up ? "▲" : "▼"} {up ? "+" : ""}{pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Combined chart — scale note */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:20 }}>
        <div style={{ marginBottom:14 }}>
          <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 2px" }}>LME Genomsnittspris — alla metaller (USD/tonne)</h3>
          <p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>Cobalt dominerar skalan. Använd mini-graferna nedan för individuella trender.</p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={lmeData} margin={{ top:4, right:16, bottom:4, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
            <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={52} tickFormatter={v => v>=1000 ? `${(v/1000).toFixed(0)}K` : v} />
            <Tooltip formatter={(v, name) => [`${Number(v).toLocaleString()} USD/t`, name]} />
            <Legend wrapperStyle={{ fontSize:11 }} />
            {lmeMetals.map(m => (
              <Line key={m.key} type="monotone" dataKey={m.key} name={m.label}
                stroke={m.color} dot={false} strokeWidth={1.5} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Mini charts — 3 per row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
        {lmeMetals.map(m => (
          <div key={m.key} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <span style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{m.label}</span>
              <span style={{ fontSize:12, color:"#94a3b8" }}>{(latest[m.key] as number)?.toLocaleString()} {m.unit}</span>
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <LineChart data={lmeData.slice(-10)} margin={{ top:2, right:4, bottom:2, left:0 }}>
                <Line type="monotone" dataKey={m.key} stroke={m.color} dot={false} strokeWidth={2} />
                <Tooltip formatter={(v) => [`${Number(v).toLocaleString()} ${m.unit}`, m.label]}
                  contentStyle={{ fontSize:11 }} labelStyle={{ fontSize:11 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>

      {/* Detail table */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden", marginTop:20 }}>
        <div style={{ padding:"12px 20px", borderBottom:"1px solid #f1f5f9", background:"#f8fafc" }}>
          <h3 style={{ fontSize:13, fontWeight:700, color:"#0c2340", margin:0 }}>Detaljdata — senaste perioder (USD/tonne)</h3>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ background:"#f8fafc" }}>
                <th style={{ padding:"8px 16px", textAlign:"left", color:"#64748b", fontWeight:600, whiteSpace:"nowrap" }}>Metall</th>
                {lmeData.slice(-6).map(d => (
                  <th key={d.m as string} style={{ padding:"8px 12px", textAlign:"right", color:"#64748b", fontWeight:600, whiteSpace:"nowrap" }}>{d.m as string}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {lmeMetals.map((m, i) => (
                <tr key={m.key} style={{ borderTop:"1px solid #f1f5f9", background: i%2===0 ? "white" : "#fafafa" }}>
                  <td style={{ padding:"8px 16px", fontWeight:600, color:"#0f172a", whiteSpace:"nowrap" }}>
                    <span style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
                      <span style={{ width:8, height:8, borderRadius:"50%", background:m.color, flexShrink:0 }} />
                      {m.label}
                    </span>
                  </td>
                  {lmeData.slice(-6).map(d => (
                    <td key={d.m as string} style={{ padding:"8px 12px", textAlign:"right", color:"#334155" }}>
                      {(d[m.key] as number)?.toLocaleString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
