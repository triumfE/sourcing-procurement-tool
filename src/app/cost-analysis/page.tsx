"use client";
import { useState } from "react";
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, Check, X, ChevronRight, BarChart2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";

const priceIncreases = [
  {
    id:1, supplier:"Bjorneborg Steel AB", material:"Duplex 2205 castings", requestedIncrease:8.5,
    justifiedIncrease:5.2, verdict:"partially_justified", date:"2026-03-15",
    drivers: [
      { factor:"Nickel LME", impact:3.2, trend:"up", source:"LME" },
      { factor:"Energy (electricity)", impact:1.1, trend:"up", source:"Nord Pool" },
      { factor:"EUR/SEK", impact:0.9, trend:"up", source:"ECB" },
      { factor:"Labour cost index", impact:0.0, trend:"stable", source:"SCB" },
    ],
    history: [
      { period:"Q1'24", price:42500 }, { period:"Q2'24", price:42500 }, { period:"Q3'24", price:43800 },
      { period:"Q4'24", price:43800 }, { period:"Q1'25", price:44200 }, { period:"Q2'25", price:44200 },
      { period:"Q3'25", price:45100 }, { period:"Q4'25", price:45100 }, { period:"Q1'26", price:45100 },
      { period:"Q2'26", price:48930, requested:true },
    ],
    recommendation: "Accept 5.2% increase based on verified nickel and energy cost movements. Reject remaining 3.3% — no supporting evidence for claimed logistics cost increase.",
  },
  {
    id:2, supplier:"T-Marine (Nantong) Mechanical", material:"Propeller hub castings GX4CrNiMo16", requestedIncrease:12.0,
    justifiedIncrease:7.8, verdict:"partially_justified", date:"2026-04-01",
    drivers: [
      { factor:"Stainless steel index (FEAF)", impact:4.5, trend:"up", source:"FEAF" },
      { factor:"CNY/EUR exchange", impact:1.8, trend:"up", source:"ECB" },
      { factor:"Freight Shanghai–EU", impact:1.5, trend:"up", source:"Freightos" },
      { factor:"Energy (gas)", impact:0.0, trend:"stable", source:"TTF" },
    ],
    history: [
      { period:"Q1'24", price:185000 }, { period:"Q2'24", price:185000 }, { period:"Q3'24", price:192000 },
      { period:"Q4'24", price:192000 }, { period:"Q1'25", price:195000 }, { period:"Q2'25", price:195000 },
      { period:"Q3'25", price:198000 }, { period:"Q4'25", price:198000 }, { period:"Q1'26", price:198000 },
      { period:"Q2'26", price:221760, requested:true },
    ],
    recommendation: "Accept 7.8% based on verified stainless steel index increase and FX movement. Container freight partially valid. Counter at 8.5% as compromise.",
  },
  {
    id:3, supplier:"Promeco OY", material:"Thruster components machined", requestedIncrease:4.0,
    justifiedIncrease:4.2, verdict:"justified", date:"2026-03-28",
    drivers: [
      { factor:"Steel HRC (MEPS)", impact:2.0, trend:"up", source:"MEPS" },
      { factor:"EUR/NOK exchange", impact:1.2, trend:"up", source:"ECB" },
      { factor:"Finnish electricity", impact:1.0, trend:"up", source:"Nord Pool" },
    ],
    history: [
      { period:"Q1'24", price:78000 }, { period:"Q2'24", price:78000 }, { period:"Q3'24", price:79500 },
      { period:"Q4'24", price:79500 }, { period:"Q1'25", price:80000 }, { period:"Q2'25", price:80000 },
      { period:"Q3'25", price:81000 }, { period:"Q4'25", price:81000 }, { period:"Q1'26", price:81000 },
      { period:"Q2'26", price:84240, requested:true },
    ],
    recommendation: "Accept — increase is fully supported by raw material, energy and FX data. Supplier is transparent and cost increase is below market average.",
  },
  {
    id:4, supplier:"Osterbergs Industrihandel AB", material:"Fasteners & seals assortment", requestedIncrease:15.0,
    justifiedIncrease:3.5, verdict:"not_justified", date:"2026-04-10",
    drivers: [
      { factor:"Steel prices", impact:2.0, trend:"up", source:"MEPS" },
      { factor:"Zinc LME", impact:1.0, trend:"up", source:"LME" },
      { factor:"Logistics", impact:0.5, trend:"stable", source:"Statista" },
      { factor:"Unverified claims", impact:0.0, trend:"stable", source:"—" },
    ],
    history: [
      { period:"Q1'24", price:320 }, { period:"Q2'24", price:320 }, { period:"Q3'24", price:325 },
      { period:"Q4'24", price:325 }, { period:"Q1'25", price:330 }, { period:"Q2'25", price:330 },
      { period:"Q3'25", price:335 }, { period:"Q4'25", price:335 }, { period:"Q1'26", price:335 },
      { period:"Q2'26", price:385, requested:true },
    ],
    recommendation: "Reject — 15% increase has no factual basis beyond 3.5%. Supplier has not provided cost breakdown. Consider alternative sourcing or competitive RFQ.",
  },
];

const verdictConfig: Record<string,{label:string,color:string,icon:typeof Check}> = {
  justified: { label:"Justified", color:"#16a34a", icon:Check },
  partially_justified: { label:"Partially Justified", color:"#d97706", icon:AlertTriangle },
  not_justified: { label:"Not Justified", color:"#dc2626", icon:X },
};

export default function CostAnalysisPage() {
  const [selected, setSelected] = useState(priceIncreases[0]);

  const v = verdictConfig[selected.verdict];

  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
          <DollarSign size={22} style={{ color:"#0070f3" }} />
          <h1 style={{ fontSize:26, fontWeight:800, color:"#0c2340", margin:0 }}>AI Cost Analysis</h1>
        </div>
        <p style={{ color:"#64748b", fontSize:14, margin:0 }}>Validate supplier price increases against real market data — raw materials, energy, FX, freight.</p>
      </div>

      {/* Summary cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
        {[
          { label:"Active Claims", value:priceIncreases.length, color:"#0070f3" },
          { label:"Justified", value:priceIncreases.filter(p=>p.verdict==="justified").length, color:"#16a34a" },
          { label:"Partially Justified", value:priceIncreases.filter(p=>p.verdict==="partially_justified").length, color:"#d97706" },
          { label:"Not Justified", value:priceIncreases.filter(p=>p.verdict==="not_justified").length, color:"#dc2626" },
        ].map(k => (
          <div key={k.label} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:11, color:"#94a3b8", marginBottom:4 }}>{k.label}</div>
            <div style={{ fontSize:28, fontWeight:800, color:k.color }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"320px 1fr", gap:20 }}>
        {/* Left — claim list */}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {priceIncreases.map(p => {
            const vc = verdictConfig[p.verdict];
            const active = selected.id === p.id;
            return (
              <button key={p.id} onClick={()=>setSelected(p)} style={{
                background: active ? "#f0f9ff" : "white", border: active ? "2px solid #0070f3" : "1px solid #e2e8f0",
                borderRadius:10, padding:14, cursor:"pointer", textAlign:"left",
              }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", marginBottom:4 }}>{p.supplier}</div>
                <div style={{ fontSize:12, color:"#64748b", marginBottom:6 }}>{p.material}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:18, fontWeight:800, color:"#dc2626" }}>+{p.requestedIncrease}%</span>
                  <span style={{ fontSize:11, fontWeight:600, color:vc.color, background:`${vc.color}18`, padding:"2px 8px", borderRadius:999 }}>{vc.label}</span>
                </div>
                <div style={{ fontSize:11, color:"#94a3b8", marginTop:4 }}>AI validated: +{p.justifiedIncrease}%</div>
              </button>
            );
          })}
        </div>

        {/* Right — detail */}
        <div>
          {/* Verdict banner */}
          <div style={{ background:`${v.color}08`, border:`1px solid ${v.color}30`, borderRadius:12, padding:"16px 20px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:"#0c2340", marginBottom:4 }}>{selected.supplier} — {selected.material}</div>
              <div style={{ display:"flex", gap:20, fontSize:13 }}>
                <span>Requested: <strong style={{ color:"#dc2626" }}>+{selected.requestedIncrease}%</strong></span>
                <span>AI Validated: <strong style={{ color:"#16a34a" }}>+{selected.justifiedIncrease}%</strong></span>
                <span>Gap: <strong style={{ color:"#d97706" }}>{(selected.requestedIncrease - selected.justifiedIncrease).toFixed(1)}%</strong></span>
              </div>
            </div>
            <span style={{ fontSize:14, fontWeight:700, color:v.color, background:`${v.color}18`, padding:"6px 16px", borderRadius:999 }}>{v.label}</span>
          </div>

          {/* Cost drivers */}
          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:20, marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"#0c2340", margin:"0 0 12px" }}>Cost Driver Analysis</h3>
            {selected.drivers.map(d => (
              <div key={d.factor} style={{ display:"flex", alignItems:"center", gap:12, padding:"8px 0", borderBottom:"1px solid #f8fafc" }}>
                <span style={{ flex:1, fontSize:13, color:"#334155" }}>{d.factor}</span>
                <span style={{ fontSize:11, color:"#94a3b8", width:80 }}>Source: {d.source}</span>
                <div style={{ width:120, height:6, background:"#f1f5f9", borderRadius:3 }}>
                  <div style={{ width:`${Math.min(d.impact/5*100, 100)}%`, height:"100%", background: d.impact > 0 ? "#d97706" : "#16a34a", borderRadius:3 }} />
                </div>
                <span style={{ fontSize:13, fontWeight:700, color: d.impact > 0 ? "#d97706" : "#16a34a", width:50, textAlign:"right" }}>
                  {d.impact > 0 ? "+" : ""}{d.impact}%
                </span>
                {d.trend === "up" ? <TrendingUp size={12} style={{ color:"#dc2626" }} /> : <span style={{ color:"#94a3b8", fontSize:11 }}>→</span>}
              </div>
            ))}
            <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderTop:"1px solid #e2e8f0", marginTop:4 }}>
              <span style={{ flex:1, fontSize:13, fontWeight:700, color:"#0c2340" }}>Total verified impact</span>
              <span style={{ fontSize:15, fontWeight:800, color:"#16a34a" }}>+{selected.justifiedIncrease}%</span>
            </div>
          </div>

          {/* Price history chart */}
          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:20, marginBottom:16 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"#0c2340", margin:"0 0 12px" }}>Price History</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={selected.history} margin={{ top:4, right:16, bottom:4, left:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="period" tick={{ fontSize:10, fill:"#94a3b8" }} />
                <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={55} />
                <Tooltip />
                <Line type="stepAfter" dataKey="price" stroke="#0070f3" strokeWidth={2} dot={(props:Record<string,unknown>) => {
                  const { cx, cy, payload } = props as { cx:number, cy:number, payload:{ requested?:boolean } };
                  if (payload?.requested) return <circle cx={cx} cy={cy} r={5} fill="#dc2626" stroke="white" strokeWidth={2} />;
                  return <circle cx={cx} cy={cy} r={3} fill="#0070f3" />;
                }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* AI Recommendation */}
          <div style={{ background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:12, padding:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <BarChart2 size={16} style={{ color:"#0369a1" }} />
              <h3 style={{ fontSize:14, fontWeight:700, color:"#0369a1", margin:0 }}>AI Recommendation</h3>
            </div>
            <p style={{ fontSize:14, color:"#0c4a6e", lineHeight:1.7, margin:0 }}>{selected.recommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
