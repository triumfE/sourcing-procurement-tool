"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fxData, carbonData } from "./data";

const fxS = [
  { key:"eurusd", label:"EUR/USD",  color:"#0070f3" },
  { key:"eurnok", label:"EUR/NOK",  color:"#16a34a" },
  { key:"eurcny", label:"EUR/CNY",  color:"#dc2626" },
  { key:"eurjpy", label:"EUR/JPY",  color:"#7c3aed" },
  { key:"eurkrw", label:"EUR/KRW",  color:"#d97706" },
  { key:"usdcny", label:"USD/CNY",  color:"#0891b2" },
];
const carbonS = [
  { key:"ets",  label:"EU ETS",      color:"#0070f3" },
  { key:"ukEts",label:"UK ETS",      color:"#7c3aed" },
  { key:"ccer", label:"Kina CCER",   color:"#dc2626" },
];

const lastFx = fxData[fxData.length-1]; const prevFx = fxData[fxData.length-2];
const lastCo = carbonData[carbonData.length-1]; const prevCo = carbonData[carbonData.length-2];

export default function CurrencyTab() {
  return (
    <div>
      {/* FX KPIs */}
      <h2 style={{ fontSize:17, fontWeight:800, color:"#0c2340", margin:"0 0 14px" }}>Valutakurser</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:10, marginBottom:20 }}>
        {fxS.map(s=>{
          const c=lastFx[s.key] as number; const p=prevFx[s.key] as number;
          const pct=((c-p)/p*100).toFixed(1);
          return (
            <div key={s.key} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"12px 14px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:s.color }} />
                <span style={{ fontSize:12, color:"#64748b" }}>{s.label}</span>
              </div>
              <div style={{ fontSize:20, fontWeight:800, color:"#0f172a" }}>{c >= 100 ? c.toLocaleString() : c.toFixed(2)}</div>
              <div style={{ fontSize:11, fontWeight:600, color:Number(pct)>=0?"#d97706":"#16a34a", marginTop:2 }}>
                {Number(pct)>=0?"+":""}{pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* FX chart */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:28 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 2px" }}>Valutakurser — historik</h3>
        <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 14px" }}>Källa: ECB / World Bank. EUR-baserat. EUR/KRW på separat skala (höger).</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={fxData} margin={{ top:4, right:16, bottom:4, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
            <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={45} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize:11 }} />
            {fxS.filter(s=>s.key!=="eurkrw").map(s=>
              <Line key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color} dot={false} strokeWidth={2} />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Carbon KPIs */}
      <h2 style={{ fontSize:17, fontWeight:800, color:"#0c2340", margin:"0 0 14px" }}>Koldioxidpriser (EUR/tCO₂)</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
        {carbonS.map(s=>{
          const c=lastCo[s.key] as number; const p=prevCo[s.key] as number;
          const pct=((c-p)/p*100).toFixed(1);
          return (
            <div key={s.key} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:s.color }} />
                <span style={{ fontSize:12, color:"#64748b" }}>{s.label}</span>
              </div>
              <div style={{ fontSize:24, fontWeight:800, color:"#0f172a" }}>{c}</div>
              <div style={{ fontSize:11, color:"#94a3b8" }}>EUR/tCO₂</div>
              <div style={{ fontSize:12, fontWeight:600, color:Number(pct)>=0?"#d97706":"#16a34a", marginTop:4 }}>
                {Number(pct)>=0?"+":""}{pct}% · CBAM-relevans
              </div>
            </div>
          );
        })}
      </div>

      {/* Carbon chart */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 2px" }}>Carbon Price — EU ETS · UK ETS · Kina CCER</h3>
        <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 14px" }}>
          EU ETS påverkar direkt materialkostnad genom CBAM. Kina CCER fortfarande lågt men expanderar.
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={carbonData} margin={{ top:4, right:16, bottom:4, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
            <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={40} />
            <Tooltip formatter={(v,n)=>[`${v} EUR/tCO₂`,n]} />
            <Legend wrapperStyle={{ fontSize:11 }} />
            {carbonS.map(s=><Line key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color} dot={false} strokeWidth={2} />)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
