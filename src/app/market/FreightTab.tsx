"use client";
import { useState } from "react";
import { ComposedChart, Bar, Area, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { freightTruck, freightContainer, freightSea, freightAir } from "./data";

type Mode = "truck"|"container"|"sea"|"air";

const modes: { id:Mode, label:string, unit:string }[] = [
  { id:"truck",     label:"Lastbil",   unit:"Index (bas 100)" },
  { id:"container", label:"Container",  unit:"USD/TEU · FEU" },
  { id:"sea",       label:"Sjöfrakt",   unit:"Index / poäng" },
  { id:"air",       label:"Flygfrakt",  unit:"USD/kg" },
];

const seriesMap: Record<Mode, {key:string,label:string,color:string}[]> = {
  truck:     [{ key:"ftlEU",label:"FTL Europa",color:"#0070f3" },{ key:"ltlEU",label:"LTL Europa",color:"#7c3aed" },{ key:"nordics",label:"Norden",color:"#16a34a" }],
  container: [{ key:"c20",label:"20ft",color:"#0070f3" },{ key:"c40",label:"40ft",color:"#d97706" },{ key:"c40hc",label:"40ft HC",color:"#dc2626" }],
  sea:       [{ key:"bdi",label:"Baltic Dry (BDI)",color:"#0070f3" },{ key:"bci",label:"Baltic Capesize (BCI)",color:"#0c2340" },{ key:"bsi",label:"Baltic Supramax (BSI)",color:"#7c3aed" },{ key:"roro",label:"RoRo Index",color:"#16a34a" }],
  air:       [{ key:"bal",label:"Baltic Air (BAI)",color:"#0070f3" },{ key:"tatl",label:"Transatlantic",color:"#d97706" },{ key:"tpac",label:"Transpacific",color:"#dc2626" }],
};
const dataMap: Record<Mode, Record<string,string|number|undefined>[]> = { truck:freightTruck, container:freightContainer, sea:freightSea, air:freightAir };

export default function FreightTab() {
  const [mode, setMode] = useState<Mode>("truck");
  const data   = dataMap[mode];
  const series = seriesMap[mode];
  const info   = modes.find(m=>m.id===mode)!;
  const last   = data[data.length-1]; const prev = data[data.length-2];

  return (
    <div>
      {/* Mode selector */}
      <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
        {modes.map(m=>(
          <button key={m.id} onClick={()=>setMode(m.id)} style={{
            padding:"8px 18px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer",
            border: mode===m.id?"1px solid #0070f3":"1px solid #e2e8f0",
            background: mode===m.id?"#0070f3":"white",
            color: mode===m.id?"white":"#64748b",
          }}>{m.label}</button>
        ))}
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12, marginBottom:20 }}>
        {series.map(s=>{
          const c=last[s.key] as number; const p=prev[s.key] as number;
          const pct=p?((c-p)/p*100).toFixed(1):"–";
          return (
            <div key={s.key} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:s.color }} />
                <span style={{ fontSize:12, color:"#64748b" }}>{s.label}</span>
              </div>
              <div style={{ fontSize:22, fontWeight:800, color:"#0f172a" }}>{typeof c === "number" && c < 100 ? c.toFixed(1) : c?.toLocaleString()}</div>
              <div style={{ fontSize:11, color:"#94a3b8" }}>{info.unit}</div>
              <div style={{ fontSize:12, fontWeight:600, color:Number(pct)>=0?"#d97706":"#16a34a", marginTop:4 }}>
                {Number(pct)>=0?"+":""}{pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:20 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 2px" }}>{info.label} — {info.unit}</h3>
        <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 14px" }}>
          Källa: {mode==="sea"?"Baltic Exchange":mode==="container"?"Freightos / Drewry":mode==="air"?"Baltic Air Freight Index / IATA":"Statista / Upply"}
        </p>
        <ResponsiveContainer width="100%" height={280}>
          {mode === "container" ? (
            <ComposedChart data={data} margin={{ top:4, right:16, bottom:4, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
              <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={52} tickFormatter={v=>v>=1000?`$${(v/1000).toFixed(0)}K`:`$${v}`} />
              <Tooltip formatter={(v,n)=>[`$${Number(v).toLocaleString()}`,n]} />
              <Legend wrapperStyle={{ fontSize:11 }} />
              {series.map(s=><Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[3,3,0,0]} opacity={0.8} />)}
            </ComposedChart>
          ) : (
            <LineChart data={data} margin={{ top:4, right:16, bottom:4, left:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
              <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={50} />
              <Tooltip formatter={(v,n)=>[mode==="air"?`$${Number(v).toFixed(2)}/kg`:Number(v).toLocaleString(),n]} />
              <Legend wrapperStyle={{ fontSize:11 }} />
              {series.map(s=><Line key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color} dot={false} strokeWidth={2} />)}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead><tr style={{ background:"#f8fafc" }}>
              <th style={{ padding:"8px 14px", textAlign:"left", color:"#64748b", fontWeight:600 }}>Serie</th>
              {data.slice(-5).map(d=><th key={d.m as string} style={{ padding:"8px 10px", textAlign:"right", color:"#64748b", fontWeight:600 }}>{d.m as string}</th>)}
            </tr></thead>
            <tbody>{series.map((s,i)=>(
              <tr key={s.key} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"white":"#fafafa" }}>
                <td style={{ padding:"8px 14px", fontWeight:600, color:"#0f172a", whiteSpace:"nowrap" }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:s.color }} />{s.label}
                  </span>
                </td>
                {data.slice(-5).map(d=>{
                  const v=d[s.key] as number;
                  return <td key={d.m as string} style={{ padding:"8px 10px", textAlign:"right", color:"#334155" }}>
                    {mode==="air"?v?.toFixed(2):v?.toLocaleString()}
                  </td>;
                })}
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
