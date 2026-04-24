"use client";
import { useState } from "react";
import { Gauge, TrendingUp, TrendingDown, AlertTriangle, Shield, Calendar, Search, ChevronDown, Star, FileCheck } from "lucide-react";

const suppliers = [
  { id:1, name:"Lagersmit Sealing Solutions B.V.", code:"100010822", spend:23.6, sq:87.9, otd:92, quality:96, certQM:"ISO9001", certQMExp:"2027-09-14", certEnv:"NO", certH:"NO", cyber:"NO", risk:"low", trend:"stable" },
  { id:2, name:"I P Huse AS", code:"100001339", spend:20.9, sq:96.5, otd:95, quality:98, certQM:"ISO9001", certQMExp:"2026-04-19", certEnv:"ISO14001", certEnvExp:"2027-02-14", certH:"ISO 45001", certHExp:"2027-02-14", cyber:"NO", risk:"low", trend:"up" },
  { id:3, name:"Bjorneborg Steel AB", code:"100062526", spend:18.4, sq:100, otd:88, quality:99, certQM:"ISO9001", certQMExp:"2027-09-22", certEnv:"ISO14001", certEnvExp:"2027-09-22", certH:"NO", cyber:"NO", risk:"medium", trend:"stable" },
  { id:4, name:"Osterbergs Industrihandel AB", code:"100011633", spend:14.2, sq:77.7, otd:82, quality:90, certQM:"ISO9001", certQMExp:"2027-08-24", certEnv:"ISO14001", certEnvExp:"2027-08-24", certH:"NO", cyber:"OTHER", risk:"high", trend:"down" },
  { id:5, name:"SKF Marine GmbH", code:"100004950", spend:12.6, sq:89.8, otd:91, quality:97, certQM:"ISO9001", certQMExp:"2026-08-18", certEnv:"ISO14001", certEnvExp:"2027-06-30", certH:"ISO 45001", certHExp:"2027-06-30", cyber:"NO", risk:"low", trend:"stable" },
  { id:6, name:"Kristinehamn Teknik & Service AB", code:"100070425", spend:12.2, sq:93.3, otd:89, quality:95, certQM:"ISO9001", certQMExp:"2026-01-31", certEnv:"ISO14001", certEnvExp:"2027-03-09", certH:"OTHER", cyber:"NO", risk:"low", trend:"up" },
  { id:7, name:"T-Marine (Nantong) Mechanical", code:"100008049", spend:45.9, sq:90.6, otd:85, quality:93, certQM:"ISO9001", certQMExp:"2028-02-24", certEnv:"ISO14001", certEnvExp:"2028-02-24", certH:"ISO 45001", certHExp:"2028-02-24", cyber:"NO", risk:"medium", trend:"stable" },
  { id:8, name:"Kaiping Yuanhang Propeller", code:"100066172", spend:8.3, sq:98.8, otd:94, quality:100, certQM:"ISO9001", certQMExp:"2028-03-09", certEnv:"ISO14001", certEnvExp:"2027-01-21", certH:"ISO 45001", certHExp:"2027-04-21", cyber:"NO", risk:"low", trend:"up" },
  { id:9, name:"Promeco OY", code:"100017034", spend:26.1, sq:91.3, otd:88, quality:94, certQM:"ISO9001", certQMExp:"2027-08-25", certEnv:"ISO14001", certEnvExp:"2026-08-15", certH:"NO", cyber:"NO", risk:"low", trend:"stable" },
  { id:10, name:"Lyckes Produktionsverktyg AB", code:"100009587", spend:5.5, sq:97.9, otd:51.2, quality:95, certQM:"ISO9001", certQMExp:"2026-12-15", certEnv:"ISO14001", certEnvExp:"2026-12-15", certH:"NO", cyber:"OTHER", risk:"high", trend:"down" },
];

const riskColor = (r:string) => r==="low"?"#16a34a":r==="medium"?"#d97706":"#dc2626";
const trendIcon = (t:string) => t==="up"?<TrendingUp size={12} style={{color:"#16a34a"}} />:t==="down"?<TrendingDown size={12} style={{color:"#dc2626"}} />:<span style={{color:"#94a3b8",fontSize:11}}>→</span>;

const expiringSoon = suppliers.filter(s => {
  const dates = [s.certQMExp, s.certEnvExp, s.certHExp].filter(Boolean);
  return dates.some(d => d && new Date(d) < new Date("2026-08-01"));
});

export default function PerformancePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"spend"|"sq"|"otd"|"quality">("spend");
  const [view, setView] = useState<"table"|"cards">("table");

  const filtered = suppliers
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => (b as unknown as Record<string,number>)[sort] - (a as unknown as Record<string,number>)[sort]);

  const avgOTD = (suppliers.reduce((s,x) => s+x.otd, 0) / suppliers.length).toFixed(1);
  const avgQuality = (suppliers.reduce((s,x) => s+x.quality, 0) / suppliers.length).toFixed(1);
  const avgSQ = (suppliers.reduce((s,x) => s+x.sq, 0) / suppliers.length).toFixed(1);
  const totalSpend = suppliers.reduce((s,x) => s+x.spend, 0).toFixed(1);

  return (
    <div style={{ maxWidth:1280, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
          <Gauge size={22} style={{ color:"#0070f3" }} />
          <h1 style={{ fontSize:26, fontWeight:800, color:"#0c2340", margin:0 }}>Supplier Performance</h1>
        </div>
        <p style={{ color:"#64748b", fontSize:14, margin:0 }}>Track delivery, quality, compliance and certifications across your supplier base.</p>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:24 }}>
        {[
          { label:"Total Spend YTD", value:`${totalSpend}M NOK`, icon:TrendingUp, color:"#0070f3" },
          { label:"Avg OTD", value:`${avgOTD}%`, icon:Gauge, color:Number(avgOTD)>90?"#16a34a":"#d97706" },
          { label:"Avg Quality", value:`${avgQuality}%`, icon:Star, color:Number(avgQuality)>95?"#16a34a":"#d97706" },
          { label:"Avg SQ Score", value:`${avgSQ}%`, icon:Shield, color:"#7c3aed" },
          { label:"Certs Expiring Soon", value:String(expiringSoon.length), icon:AlertTriangle, color:expiringSoon.length>0?"#dc2626":"#16a34a" },
        ].map(k => (
          <div key={k.label} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:11, color:"#94a3b8", marginBottom:4 }}>{k.label}</div>
                <div style={{ fontSize:24, fontWeight:800, color:"#0f172a" }}>{k.value}</div>
              </div>
              <k.icon size={18} style={{ color:k.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:10, marginBottom:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6, background:"white", border:"1px solid #e2e8f0", borderRadius:8, padding:"6px 12px", flex:1, maxWidth:300 }}>
          <Search size={14} style={{ color:"#94a3b8" }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search suppliers..."
            style={{ border:"none", outline:"none", background:"transparent", fontSize:13, flex:1 }} />
        </div>
        <select value={sort} onChange={e=>setSort(e.target.value as typeof sort)}
          style={{ padding:"6px 12px", borderRadius:8, border:"1px solid #e2e8f0", fontSize:12, cursor:"pointer", background:"white" }}>
          <option value="spend">Sort: Spend</option>
          <option value="otd">Sort: OTD</option>
          <option value="quality">Sort: Quality</option>
          <option value="sq">Sort: SQ Score</option>
        </select>
      </div>

      {/* Table */}
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead><tr style={{ background:"#f8fafc" }}>
              {["Supplier","Spend MNOK","SQ","OTD %","Quality %","QM Cert","Env Cert","H&S","Cyber","Risk","Trend"].map(h =>
                <th key={h} style={{ padding:"10px 12px", textAlign:"left", color:"#64748b", fontWeight:600, whiteSpace:"nowrap" }}>{h}</th>
              )}
            </tr></thead>
            <tbody>{filtered.map((s,i) => (
              <tr key={s.id} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"white":"#fafbfc" }}>
                <td style={{ padding:"10px 12px", fontWeight:600, color:"#0f172a", whiteSpace:"nowrap" }}>{s.name}</td>
                <td style={{ padding:"10px 12px", fontWeight:700 }}>{s.spend}</td>
                <td style={{ padding:"10px 12px" }}><span style={{ color:s.sq>=90?"#16a34a":s.sq>=80?"#d97706":"#dc2626", fontWeight:700 }}>{s.sq}%</span></td>
                <td style={{ padding:"10px 12px" }}><span style={{ color:s.otd>=90?"#16a34a":s.otd>=80?"#d97706":"#dc2626", fontWeight:700 }}>{s.otd}%</span></td>
                <td style={{ padding:"10px 12px" }}><span style={{ color:s.quality>=95?"#16a34a":"#d97706", fontWeight:700 }}>{s.quality}%</span></td>
                <td style={{ padding:"10px 12px" }}><CertBadge type={s.certQM} exp={s.certQMExp} /></td>
                <td style={{ padding:"10px 12px" }}><CertBadge type={s.certEnv} exp={s.certEnvExp} /></td>
                <td style={{ padding:"10px 12px" }}><CertBadge type={s.certH} exp={s.certHExp} /></td>
                <td style={{ padding:"10px 12px" }}><span style={{ fontSize:11, color:s.cyber==="NO"?"#94a3b8":"#475569" }}>{s.cyber}</span></td>
                <td style={{ padding:"10px 12px" }}><span style={{ fontSize:11, fontWeight:600, color:riskColor(s.risk), background:`${riskColor(s.risk)}18`, padding:"2px 8px", borderRadius:999 }}>{s.risk}</span></td>
                <td style={{ padding:"10px 12px" }}>{trendIcon(s.trend)}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CertBadge({ type, exp }: { type:string; exp?:string }) {
  if (type === "NO") return <span style={{ color:"#dc2626", fontSize:11 }}>✗</span>;
  const expiring = exp && new Date(exp) < new Date("2026-08-01");
  return (
    <div>
      <span style={{ fontSize:11, fontWeight:600, color:"#16a34a" }}>{type}</span>
      {exp && <div style={{ fontSize:10, color:expiring?"#dc2626":"#94a3b8" }}>{exp}</div>}
    </div>
  );
}
