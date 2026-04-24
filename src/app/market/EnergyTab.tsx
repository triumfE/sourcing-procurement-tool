"use client";
import { useState } from "react";
import { ComposedChart, Area, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { energyData } from "./data";

// Electricity data by country — EUR/MWh equivalent. Extended dataset.
const elData = [
  {m:"Jan'21",NO:44,SE:48,FI:51,DK:55,DE:50,FR:53,UK:58,ES:42,IT:55,NL:52,PL:48,AT:50,CH:46,BE:54,US:42,CA:38,MX:60,BR:65,JP:95,KR:88,CN:65,IN:72,SG:110,TW:75,TH:82,VN:70,AU:72,NZ:68,AE:35,SA:30,ZA:55,TR:50,EG:40,IL:85},
  {m:"Jul'21",NO:46,SE:66,FI:78,DK:75,DE:75,FR:79,UK:80,ES:65,IT:78,NL:72,PL:68,AT:72,CH:56,BE:74,US:44,CA:40,MX:62,BR:68,JP:98,KR:90,CN:68,IN:75,SG:115,TW:78,TH:85,VN:72,AU:75,NZ:70,AE:36,SA:31,ZA:58,TR:55,EG:42,IL:88},
  {m:"Jan'22",NO:120,SE:130,FI:145,DK:140,DE:155,FR:160,UK:180,ES:130,IT:170,NL:160,PL:120,AT:150,CH:110,BE:155,US:48,CA:42,MX:65,BR:70,JP:102,KR:95,CN:70,IN:78,SG:120,TW:80,TH:88,VN:74,AU:80,NZ:74,AE:37,SA:32,ZA:62,TR:60,EG:44,IL:92},
  {m:"Jul'22",NO:200,SE:250,FI:300,DK:280,DE:280,FR:350,UK:400,ES:200,IT:350,NL:300,PL:190,AT:270,CH:180,BE:290,US:55,CA:45,MX:68,BR:72,JP:110,KR:100,CN:72,IN:82,SG:130,TW:84,TH:90,VN:76,AU:85,NZ:78,AE:38,SA:33,ZA:68,TR:70,EG:46,IL:98},
  {m:"Jan'23",NO:130,SE:140,FI:160,DK:150,DE:180,FR:170,UK:200,ES:120,IT:180,NL:170,PL:140,AT:165,CH:120,BE:168,US:50,CA:42,MX:64,BR:68,JP:108,KR:98,CN:71,IN:80,SG:122,TW:82,TH:88,VN:75,AU:82,NZ:75,AE:37,SA:32,ZA:65,TR:65,EG:45,IL:95},
  {m:"Jul'23",NO:60,SE:80,FI:90,DK:85,DE:110,FR:100,UK:120,ES:80,IT:110,NL:100,PL:95,AT:105,CH:75,BE:102,US:46,CA:40,MX:62,BR:66,JP:105,KR:96,CN:69,IN:78,SG:118,TW:80,TH:86,VN:73,AU:78,NZ:72,AE:36,SA:31,ZA:60,TR:58,EG:43,IL:90},
  {m:"Jan'24",NO:55,SE:65,FI:75,DK:70,DE:90,FR:80,UK:100,ES:65,IT:85,NL:82,PL:78,AT:88,CH:62,BE:84,US:45,CA:39,MX:61,BR:65,JP:104,KR:95,CN:68,IN:76,SG:116,TW:78,TH:84,VN:72,AU:77,NZ:70,AE:35,SA:30,ZA:58,TR:55,EG:42,IL:88},
  {m:"Jul'24",NO:50,SE:75,FI:80,DK:72,DE:95,FR:85,UK:110,ES:68,IT:90,NL:88,PL:80,AT:92,CH:65,BE:88,US:47,CA:40,MX:63,BR:67,JP:106,KR:97,CN:70,IN:78,SG:118,TW:80,TH:86,VN:74,AU:79,NZ:72,AE:36,SA:31,ZA:60,TR:58,EG:44,IL:90},
  {m:"Jan'25",NO:55,SE:80,FI:90,DK:78,DE:100,FR:90,UK:115,ES:72,IT:95,NL:92,PL:85,AT:98,CH:68,BE:92,US:48,CA:41,MX:64,BR:68,JP:108,KR:98,CN:71,IN:80,SG:120,TW:82,TH:88,VN:75,AU:80,NZ:74,AE:37,SA:32,ZA:62,TR:60,EG:45,IL:92},
  {m:"Mar'26",NO:58,SE:85,FI:95,DK:82,DE:105,FR:92,UK:118,ES:75,IT:98,NL:95,PL:88,AT:102,CH:72,BE:96,US:49,CA:42,MX:66,BR:70,JP:110,KR:100,CN:72,IN:82,SG:122,TW:84,TH:90,VN:76,AU:82,NZ:76,AE:38,SA:33,ZA:64,TR:62,EG:46,IL:94},
];

type Continent = keyof typeof continents;
const continents = {
  "Europe":        [{k:"NO",l:"Norway"},{k:"SE",l:"Sweden"},{k:"FI",l:"Finland"},{k:"DK",l:"Denmark"},{k:"DE",l:"Germany"},{k:"FR",l:"France"},{k:"UK",l:"United Kingdom"},{k:"ES",l:"Spain"},{k:"IT",l:"Italy"},{k:"NL",l:"Netherlands"},{k:"PL",l:"Poland"},{k:"AT",l:"Austria"},{k:"CH",l:"Switzerland"},{k:"BE",l:"Belgium"}],
  "Asia":          [{k:"JP",l:"Japan"},{k:"KR",l:"South Korea"},{k:"CN",l:"China"},{k:"IN",l:"India"},{k:"SG",l:"Singapore"},{k:"TW",l:"Taiwan"},{k:"TH",l:"Thailand"},{k:"VN",l:"Vietnam"}],
  "Americas":      [{k:"US",l:"USA"},{k:"CA",l:"Canada"},{k:"MX",l:"Mexico"},{k:"BR",l:"Brazil"}],
  "Oceania":       [{k:"AU",l:"Australia"},{k:"NZ",l:"New Zealand"}],
  "Middle East & Africa": [{k:"AE",l:"UAE"},{k:"SA",l:"Saudi Arabia"},{k:"ZA",l:"South Africa"},{k:"TR",l:"Turkey"},{k:"EG",l:"Egypt"},{k:"IL",l:"Israel"}],
};
const cColors = ["#0070f3","#dc2626","#16a34a","#7c3aed","#d97706","#0891b2","#6366f1","#b45309","#0c2340","#92400e","#f59e0b","#15803d","#334155","#64748b"];
const latE = energyData[energyData.length-1]; const prvE = energyData[energyData.length-2];

export default function EnergyTab() {
  const [cont, setCont] = useState<Continent>("Europe");
  const [sel, setSel] = useState<string[]>(["NO","SE","FI","DE"]);
  const countries = continents[cont];

  const toggleCountry = (k:string) => {
    setSel(prev => prev.includes(k) ? prev.filter(x=>x!==k) : [...prev,k]);
  };
  const selectContinent = (c:Continent) => {
    setCont(c);
    setSel(continents[c].slice(0,4).map(x=>x.k));
  };

  return (
    <div>
      {/* OMIE + TTF */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:12, marginBottom:20 }}>
        {([{k:"omie",l:"OMIE Electricity Index"},{k:"ttf",l:"TTF Gas Index (End of Day)"}] as const).map(e=>{
          const c=latE[e.k] as number; const p=prvE[e.k] as number;
          const pct=((c-p)/p*100).toFixed(1);
          return (
            <div key={e.k} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
              <div style={{ fontSize:12, color:"#64748b", marginBottom:4 }}>{e.l}</div>
              <div style={{ fontSize:24, fontWeight:800, color:"#0f172a" }}>{c}</div>
              <div style={{ fontSize:11, color:"#94a3b8" }}>EUR/MWh · {latE.m as string}</div>
              <div style={{ fontSize:12, fontWeight:600, color:Number(pct)>=0?"#dc2626":"#16a34a", marginTop:4 }}>
                {Number(pct)>=0?"+":""}{pct}%
              </div>
            </div>
          );
        })}
      </div>

      {/* OMIE + TTF chart */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:24 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>Power Supply — OMIE Electricity & TTF Gas (EUR/MWh)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={energyData} margin={{ top:4, right:16, bottom:4, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
            <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={42} />
            <Tooltip formatter={(v,n)=>[`${v} EUR/MWh`,n]} />
            <Legend wrapperStyle={{ fontSize:11 }} />
            <Area type="monotone" dataKey="omie" name="OMIE Electricity" fill="#eff6ff" stroke="#0070f3" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ttf" name="TTF Gas" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Electricity by country */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 4px" }}>Electricity Price by Country (EUR/MWh)</h3>
        <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 16px" }}>Source: Nord Pool · Trading Economics · IEA. Select continent then toggle countries.</p>

        {/* Continent selector */}
        <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
          {(Object.keys(continents) as Continent[]).map(c=>(
            <button key={c} onClick={()=>selectContinent(c)} style={{
              padding:"6px 14px", borderRadius:6, fontSize:12, fontWeight:600, cursor:"pointer",
              border: cont===c?"1px solid #0070f3":"1px solid #e2e8f0",
              background: cont===c?"#0070f3":"white", color: cont===c?"white":"#64748b",
            }}>{c}</button>
          ))}
        </div>

        {/* Country toggles */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
          {countries.map((c,i)=>{
            const active = sel.includes(c.k);
            const color = cColors[i % cColors.length];
            return (
              <button key={c.k} onClick={()=>toggleCountry(c.k)} style={{
                padding:"4px 10px", borderRadius:6, fontSize:11, fontWeight:600, cursor:"pointer",
                border: `1px solid ${active ? color : "#e2e8f0"}`,
                background: active ? `${color}15` : "white",
                color: active ? color : "#94a3b8",
              }}>
                <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%",
                  background: active ? color : "#cbd5e1", marginRight:4, verticalAlign:"middle" }} />
                {c.l}
              </button>
            );
          })}
        </div>

        {/* KPI strip for selected */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:8, marginBottom:16 }}>
          {sel.map((k,i)=>{
            const label = countries.find(c=>c.k===k)?.l || k;
            const last = elData[elData.length-1] as Record<string,number|string>;
            const prev = elData[elData.length-2] as Record<string,number|string>;
            const cv = last[k] as number; const pv = prev[k] as number;
            const color = cColors[countries.findIndex(c=>c.k===k) % cColors.length];
            return (
              <div key={k} style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:8, padding:"8px 10px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:2 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:color }} />
                  <span style={{ fontSize:10, color:"#64748b" }}>{label}</span>
                </div>
                <span style={{ fontSize:16, fontWeight:800, color:"#0f172a" }}>{cv}</span>
                <span style={{ fontSize:9, color:"#94a3b8", marginLeft:3 }}>EUR/MWh</span>
                {pv && <div style={{ fontSize:10, fontWeight:600, color:cv>pv?"#dc2626":"#16a34a" }}>
                  {cv>pv?"▲":"▼"}{(((cv-pv)/pv)*100).toFixed(1)}%
                </div>}
              </div>
            );
          })}
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={elData} margin={{ top:4, right:16, bottom:4, left:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
            <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={40} />
            <Tooltip formatter={(v,n)=>[`${v} EUR/MWh`,n]} />
            <Legend wrapperStyle={{ fontSize:11 }} />
            {sel.map((k,i)=>{
              const label = countries.find(c=>c.k===k)?.l || k;
              const color = cColors[countries.findIndex(c=>c.k===k) % cColors.length];
              return <Line key={k} type="monotone" dataKey={k} name={label} stroke={color} dot={false} strokeWidth={2} />;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
