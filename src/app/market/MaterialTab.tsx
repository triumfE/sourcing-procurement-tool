"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Search, Plus, ChevronDown, ChevronRight } from "lucide-react";
import { bronzeData, ironIndexData } from "./data";

const bronzeS = [
  { key:"niAlBronze", label:"NiAlBronze CuAl10Ni5Fe5", color:"#b45309" },
  { key:"cuNi30",     label:"CuNi 70/30",              color:"#0070f3" },
  { key:"tinBronze",  label:"Tin Bronze CuSn12",       color:"#7c3aed" },
  { key:"cuAl",       label:"Aluminium Bronze CuAl10", color:"#16a34a" },
];
const ironS = [
  { key:"castEU",  label:"Cast Iron — Europe",  color:"#0c2340" },
  { key:"pigEU",   label:"Pig Iron — Europe",   color:"#0070f3" },
  { key:"scrapEU", label:"Steel Scrap — Europe",color:"#16a34a" },
  { key:"castCN",  label:"Cast Iron — China",   color:"#dc2626", dash:"5 3" },
  { key:"pigCN",   label:"Pig Iron — China",    color:"#f59e0b", dash:"5 3" },
];

// Process taxonomy
const processes: Record<string, string[]> = {
  "CNC Machining":          ["Turning","Milling","5-Axis","EDM / Wire EDM","Grinding","Boring","Drilling","Swiss-type"],
  "Welding":                ["TIG","MIG/MAG","Laser Welding","Electron Beam","Submerged Arc","Friction Stir","Orbital","Resistance"],
  "Casting":                ["Sand Casting","Investment Casting","Die Casting","Centrifugal","Lost Foam","Shell Moulding","Gravity"],
  "Forging":                ["Open Die","Closed Die","Ring Rolling","Upset Forging","Press Forging","Hammer Forging"],
  "Composites":             ["Carbon Fiber Layup","Filament Winding","RTM","Prepreg Autoclave","Pultrusion","Infusion"],
  "Additive / 3D Printing": ["SLM / DMLS (Metal)","FDM / FFF","SLA / DLP","SLS (Polymer)","Binder Jetting","EBM","WAAM"],
  "Surface Treatment":      ["Painting / Coating","Anodizing","Chrome Plating","Thermal Spray","Shot Peening","Galvanizing"],
  "Assembly":               ["Complete Products","Sub-Assembly","Magnet Assembly","Electrical Assembly","Mechanical Assembly"],
  "Magnets":                ["NdFeB (Rare Earth)","Ferrite","SmCo","Bonded Magnets","Magnet Assemblies","Magnetization"],
};

// Custom material search list
const allMaterials = [
  "Aluminium 6061","Aluminium 7075","Brass C360","Bronze CuAl10Ni5Fe5","Bronze CuSn12","Carbon Steel 1045",
  "Carbon Steel A36","Cast Iron GG25","Cast Iron GGG40","Chromium","Cobalt","Copper C110","Duplex 2205",
  "Hastelloy C276","Inconel 625","Inconel 718","Lead","Manganese Bronze","Monel 400","NiAlBronze",
  "Nickel 200","Pig Iron","PTFE","Stainless 303","Stainless 304","Stainless 316","Stainless 17-4PH",
  "Steel Scrap","Super Duplex 2507","Tin","Titanium Gr2","Titanium Gr5","Tungsten","Zinc","Zirconium",
  "CFRP (Carbon Fiber)","GFRP (Glass Fiber)","Kevlar","NdFeB Magnets","Ferrite Magnets","SmCo Magnets",
];

function Kpi({data,series}:{data:Record<string,string|number|undefined>[],series:{key:string,label:string,color:string}[]}) {
  const l=data[data.length-1]; const p=data[data.length-2];
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:10, marginBottom:20 }}>
      {series.map(s=>{
        const c=l[s.key] as number; const pr=p[s.key] as number;
        const pct=pr?((c-pr)/pr*100).toFixed(1):"–";
        return (
          <div key={s.key} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"12px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:s.color }} />
              <span style={{ fontSize:11, color:"#64748b", lineHeight:1.3 }}>{s.label}</span>
            </div>
            <div style={{ fontSize:20, fontWeight:800, color:"#0f172a" }}>{c?.toLocaleString()}</div>
            <div style={{ fontSize:10, color:"#94a3b8" }}>EUR/tonne</div>
            <div style={{ fontSize:11, fontWeight:600, color:Number(pct)>=0?"#d97706":"#16a34a", marginTop:2 }}>
              {Number(pct)>=0?"+":""}{pct}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Chart({title,sub,data,series,height=260}:{title:string,sub:string,data:Record<string,string|number|undefined>[],series:{key:string,label:string,color:string,dash?:string}[],height?:number}) {
  return (
    <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:20 }}>
      <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 2px" }}>{title}</h3>
      <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 14px" }}>{sub}</p>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top:4, right:16, bottom:4, left:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="m" tick={{ fontSize:10, fill:"#94a3b8" }} />
          <YAxis tick={{ fontSize:10, fill:"#94a3b8" }} width={50} />
          <Tooltip formatter={(v,n)=>[`${Number(v).toLocaleString()} EUR/t`,n]} />
          <Legend wrapperStyle={{ fontSize:11 }} />
          {series.map(s=><Line key={s.key} type="monotone" dataKey={s.key} name={s.label}
            stroke={s.color} dot={false} strokeWidth={2} strokeDasharray={s.dash} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function MaterialTab() {
  const [matSearch, setMatSearch] = useState("");
  const [tracked, setTracked] = useState<string[]>(["Bronze CuAl10Ni5Fe5","Stainless 316","Inconel 625"]);
  const [openProc, setOpenProc] = useState<string|null>("CNC Machining");
  const filtered = allMaterials.filter(m => m.toLowerCase().includes(matSearch.toLowerCase()) && !tracked.includes(m));

  return (
    <div>
      {/* Bronze */}
      <h2 style={{ fontSize:17, fontWeight:800, color:"#0c2340", margin:"0 0 14px" }}>Bronze & Copper Alloys</h2>
      <Kpi data={bronzeData} series={bronzeS} />
      <Chart title="Bronze Index (EUR/tonne)" sub="NiAlBronze = standard for marine propellers. CuNi 70/30 for seawater systems." data={bronzeData} series={bronzeS} />

      {/* Iron */}
      <h2 style={{ fontSize:17, fontWeight:800, color:"#0c2340", margin:"24px 0 14px" }}>Iron & Raw Material Index</h2>
      <Kpi data={ironIndexData} series={ironS} />
      <Chart title="Iron Index — Europe vs China (EUR/tonne)" sub="FEAF & CAEF. Cast iron, pig iron, steel scrap." data={ironIndexData} series={ironS} />

      {/* Custom material tracker */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24, marginBottom:20 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 4px" }}>Custom Material Tracker</h3>
        <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 16px" }}>Search and add any material to your watchlist. Get price alerts and trend data.</p>

        {/* Search */}
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, background:"#f8fafc",
            border:"1px solid #e2e8f0", borderRadius:8, padding:"8px 12px" }}>
            <Search size={14} style={{ color:"#94a3b8" }} />
            <input value={matSearch} onChange={e=>setMatSearch(e.target.value)}
              placeholder="Search materials — e.g. Inconel, Titanium, CFRP..."
              style={{ border:"none", outline:"none", background:"transparent", flex:1, fontSize:13, color:"#0f172a" }} />
          </div>
        </div>

        {/* Search results */}
        {matSearch && filtered.length > 0 && (
          <div style={{ border:"1px solid #e2e8f0", borderRadius:8, marginBottom:12, maxHeight:180, overflow:"auto" }}>
            {filtered.slice(0,8).map(m=>(
              <button key={m} onClick={()=>{ setTracked([...tracked,m]); setMatSearch(""); }}
                style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"8px 12px",
                  border:"none", borderBottom:"1px solid #f1f5f9", cursor:"pointer",
                  background:"white", fontSize:13, color:"#334155", textAlign:"left" }}>
                <Plus size={12} style={{ color:"#0070f3" }} /> {m}
              </button>
            ))}
          </div>
        )}

        {/* Tracked materials */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {tracked.map(m=>(
            <span key={m} style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px",
              background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:999, fontSize:12, color:"#0369a1" }}>
              {m}
              <button onClick={()=>setTracked(tracked.filter(x=>x!==m))}
                style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8", fontSize:14, lineHeight:1 }}>×</button>
            </span>
          ))}
        </div>
      </div>

      {/* Process taxonomy */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:24 }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:"0 0 4px" }}>Manufacturing Processes & Capabilities</h3>
        <p style={{ fontSize:12, color:"#94a3b8", margin:"0 0 16px" }}>Full taxonomy of industrial processes tracked on this platform. Click to expand.</p>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:12 }}>
          {Object.entries(processes).map(([cat, subs])=>(
            <div key={cat} style={{ border:"1px solid #e2e8f0", borderRadius:8, overflow:"hidden" }}>
              <button onClick={()=>setOpenProc(openProc===cat?null:cat)}
                style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%",
                  padding:"10px 14px", border:"none", cursor:"pointer",
                  background: openProc===cat ? "#f0f9ff" : "#f8fafc",
                  fontSize:13, fontWeight:700, color:"#0c2340" }}>
                <span>{cat}</span>
                <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <span style={{ fontSize:11, color:"#94a3b8", fontWeight:400 }}>{subs.length}</span>
                  {openProc===cat ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
              </button>
              {openProc===cat && (
                <div style={{ padding:"8px 14px", borderTop:"1px solid #f1f5f9" }}>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {subs.map(s=>(
                      <span key={s} style={{ fontSize:12, color:"#475569", background:"#f1f5f9",
                        padding:"3px 10px", borderRadius:6 }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
