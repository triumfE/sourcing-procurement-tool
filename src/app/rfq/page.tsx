"use client";
import { useState } from "react";
import { Zap, Upload, Send, Plus, Trash2, CheckCircle, Clock, FileText, AlertTriangle, BarChart2, ChevronRight, Search, Filter, Eye } from "lucide-react";

type Status = "draft"|"sent"|"evaluating"|"awarded"|"closed";
type Tab = "create"|"active"|"evaluate";

const statusConfig: Record<Status,{label:string,color:string}> = {
  draft:{label:"Draft",color:"#64748b"}, sent:{label:"Sent",color:"#0070f3"},
  evaluating:{label:"Evaluating",color:"#d97706"}, awarded:{label:"Awarded",color:"#16a34a"},
  closed:{label:"Closed",color:"#94a3b8"},
};

const mockRFQs = [
  { id:"RFQ-2026-041", title:"Propeller hub casting GX4CrNiMo16", status:"evaluating" as Status, suppliers:4, quotes:3, deadline:"2026-05-15", value:"1.2M NOK", created:"2026-04-10" },
  { id:"RFQ-2026-038", title:"CNC machined shaft components — Duplex 2205", status:"sent" as Status, suppliers:6, quotes:0, deadline:"2026-05-01", value:"850K NOK", created:"2026-04-05" },
  { id:"RFQ-2026-035", title:"Welded steel frames — EN 1090-2 EXC3", status:"awarded" as Status, suppliers:5, quotes:5, deadline:"2026-04-20", value:"2.4M NOK", created:"2026-03-22" },
  { id:"RFQ-2026-029", title:"Sheet metal enclosures — laser cut + powder coat", status:"closed" as Status, suppliers:3, quotes:3, deadline:"2026-03-30", value:"420K NOK", created:"2026-03-10" },
];

const mockEval = {
  rfq: "RFQ-2026-041", title:"Propeller hub casting GX4CrNiMo16",
  suppliers: [
    { name:"Bjorneborg Steel AB", country:"🇸🇪", price:385000, currency:"NOK", leadTime:"12w", freight:8500, tooling:0, risk:"low", sustainability:"A", moq:5, total:393500, rank:2, savings:"+2.1%" },
    { name:"Nordic Castings Group", country:"🇸🇪", price:372000, currency:"NOK", leadTime:"14w", freight:6200, tooling:15000, risk:"low", sustainability:"B+", moq:3, total:393200, rank:1, savings:"+2.2%" },
    { name:"Kaiping Yuanhang", country:"🇨🇳", price:265000, currency:"NOK", leadTime:"16w+6w freight", freight:42000, tooling:0, risk:"medium", sustainability:"C", moq:10, total:307000, rank:3, savings:"+23.7%" },
  ],
  currentPrice: 402000,
};

export default function RfqPage() {
  const [tab, setTab] = useState<Tab>("active");
  const [files, setFiles] = useState<string[]>([]);
  const [items, setItems] = useState([{ desc:"", qty:"", unit:"pcs", spec:"" }]);

  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
            <Zap size={22} style={{ color:"#d97706" }} />
            <h1 style={{ fontSize:26, fontWeight:800, color:"#0c2340", margin:0 }}>RFQ Engine</h1>
          </div>
          <p style={{ color:"#64748b", fontSize:14, margin:0 }}>Create, send, track and evaluate quotations with AI-powered TCA analysis.</p>
        </div>
        <button onClick={()=>setTab("create")} style={{ display:"flex", alignItems:"center", gap:6, background:"#0070f3", color:"white", padding:"10px 20px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:700 }}>
          <Plus size={14} /> New RFQ
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:0, borderBottom:"2px solid #e2e8f0", marginBottom:24 }}>
        {([["active","Active RFQs"],["create","Create RFQ"],["evaluate","Evaluation"]] as [Tab,string][]).map(([id,label]) => (
          <button key={id} onClick={()=>setTab(id)} style={{ padding:"10px 20px", fontSize:13, fontWeight:tab===id?700:500, color:tab===id?"#0070f3":"#64748b", background:"transparent", border:"none", cursor:"pointer", borderBottom:tab===id?"2px solid #0070f3":"2px solid transparent", marginBottom:-2 }}>
            {label}
          </button>
        ))}
      </div>

      {/* Active RFQs */}
      {tab === "active" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
            {[{l:"Open",v:2,c:"#0070f3"},{l:"Evaluating",v:1,c:"#d97706"},{l:"Awarded",v:1,c:"#16a34a"},{l:"Total Value",v:"4.9M NOK",c:"#7c3aed"}].map(k => (
              <div key={k.l} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:10, padding:"14px 16px" }}>
                <div style={{ fontSize:11, color:"#94a3b8", marginBottom:4 }}>{k.l}</div>
                <div style={{ fontSize:24, fontWeight:800, color:k.c }}>{k.v}</div>
              </div>
            ))}
          </div>
          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead><tr style={{ background:"#f8fafc" }}>
                {["RFQ","Title","Status","Suppliers","Quotes","Deadline","Value",""].map(h => <th key={h} style={{ padding:"10px 14px", textAlign:"left", color:"#64748b", fontWeight:600 }}>{h}</th>)}
              </tr></thead>
              <tbody>{mockRFQs.map((r,i) => (
                <tr key={r.id} style={{ borderTop:"1px solid #f1f5f9", background:i%2===0?"white":"#fafbfc", cursor:"pointer" }} onClick={()=>r.status==="evaluating"&&setTab("evaluate")}>
                  <td style={{ padding:"10px 14px", fontWeight:600, color:"#0070f3" }}>{r.id}</td>
                  <td style={{ padding:"10px 14px", fontWeight:500, color:"#0f172a" }}>{r.title}</td>
                  <td style={{ padding:"10px 14px" }}><span style={{ fontSize:11, fontWeight:600, color:statusConfig[r.status].color, background:`${statusConfig[r.status].color}18`, padding:"2px 10px", borderRadius:999 }}>{statusConfig[r.status].label}</span></td>
                  <td style={{ padding:"10px 14px" }}>{r.suppliers}</td>
                  <td style={{ padding:"10px 14px" }}>{r.quotes}/{r.suppliers}</td>
                  <td style={{ padding:"10px 14px", color:new Date(r.deadline)<new Date("2026-05-01")?"#dc2626":"#64748b" }}>{r.deadline}</td>
                  <td style={{ padding:"10px 14px", fontWeight:600 }}>{r.value}</td>
                  <td style={{ padding:"10px 14px" }}><ChevronRight size={14} style={{ color:"#94a3b8" }} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create RFQ */}
      {tab === "create" && (
        <div style={{ maxWidth:800 }}>
          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:28, marginBottom:16 }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:"#0c2340", margin:"0 0 16px" }}>RFQ Details</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><label style={lbl}>Title *</label><input placeholder="e.g. Propeller hub casting" style={inp} /></div>
              <div><label style={lbl}>Deadline *</label><input type="date" style={inp} /></div>
              <div><label style={lbl}>Currency</label><select style={inp}><option>NOK</option><option>EUR</option><option>USD</option><option>SEK</option></select></div>
              <div><label style={lbl}>Incoterms</label><select style={inp}><option>EXW</option><option>FCA</option><option>DAP</option><option>DDP</option><option>FOB</option><option>CIF</option></select></div>
              <div><label style={lbl}>Payment Terms</label><select style={inp}><option>Net 30</option><option>Net 45</option><option>Net 60</option><option>Net 90</option></select></div>
              <div><label style={lbl}>Quote Validity</label><select style={inp}><option>30 days</option><option>60 days</option><option>90 days</option></select></div>
            </div>
            <div style={{ marginTop:12 }}><label style={lbl}>Technical Notes</label><textarea placeholder="Scope, requirements, specifications..." rows={3} style={{ ...inp, resize:"vertical" }} /></div>
          </div>

          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:28, marginBottom:16 }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:"#0c2340", margin:"0 0 16px" }}>Documents & Drawings</h3>
            <div style={{ border:"2px dashed #e2e8f0", borderRadius:10, padding:32, textAlign:"center", cursor:"pointer" }}>
              <Upload size={28} style={{ color:"#94a3b8", marginBottom:8 }} />
              <p style={{ fontSize:14, color:"#64748b", margin:"0 0 4px" }}>Drop drawings, BOMs or specifications here</p>
              <p style={{ fontSize:12, color:"#94a3b8", margin:0 }}>PDF, DWG, STEP, Excel — max 50MB</p>
            </div>
          </div>

          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:28, marginBottom:16 }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:"#0c2340", margin:"0 0 16px" }}>Requirements</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div><label style={lbl}>MOQ / Batch Size</label><input placeholder="e.g. 5 pcs" style={inp} /></div>
              <div><label style={lbl}>Delivery Lead Time</label><input placeholder="e.g. 12 weeks" style={inp} /></div>
              <div><label style={lbl}>Required Certifications</label><input placeholder="e.g. ISO 9001, EN 1090" style={inp} /></div>
              <div><label style={lbl}>Quality Requirements</label><input placeholder="e.g. PPAP Level 3" style={inp} /></div>
            </div>
            <div style={{ marginTop:12 }}>
              <label style={{ ...lbl, display:"flex", alignItems:"center", gap:6 }}>
                <input type="checkbox" style={{ accentColor:"#0070f3" }} /> Require NDA acceptance before viewing documents
              </label>
            </div>
          </div>

          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:28, marginBottom:16 }}>
            <h3 style={{ fontSize:16, fontWeight:700, color:"#0c2340", margin:"0 0 12px" }}>Select Suppliers</h3>
            <p style={{ fontSize:13, color:"#94a3b8", margin:"0 0 14px" }}>AI suggests relevant suppliers based on your requirements</p>
            {["Bjorneborg Steel AB — 🇸🇪 Duplex casting, ISO 9001","Nordic Castings Group — 🇸🇪 Sand casting, DNV approved","Kaiping Yuanhang — 🇨🇳 NiAlBronze, ISO 9001","Fundilusa — 🇵🇹 Investment casting","T-Marine Nantong — 🇨🇳 Steel casting, PED"].map(s => (
              <label key={s} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:8, marginBottom:4, cursor:"pointer", background:"#f8fafc" }}>
                <input type="checkbox" defaultChecked={s.includes("Bjorneborg")||s.includes("Nordic")||s.includes("Kaiping")} style={{ accentColor:"#0070f3" }} />
                <span style={{ fontSize:13, color:"#334155" }}>{s}</span>
              </label>
            ))}
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button style={{ display:"flex", alignItems:"center", gap:6, background:"#0070f3", color:"white", padding:"12px 28px", borderRadius:8, border:"none", cursor:"pointer", fontSize:14, fontWeight:700 }}>
              <Send size={16} /> Send RFQ
            </button>
            <button style={{ padding:"12px 28px", borderRadius:8, border:"1px solid #e2e8f0", background:"white", cursor:"pointer", fontSize:14, color:"#64748b" }}>
              Save as Draft
            </button>
          </div>
        </div>
      )}

      {/* Evaluation */}
      {tab === "evaluate" && (
        <div>
          <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:10, padding:"12px 18px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <span style={{ fontSize:14, fontWeight:700, color:"#92400e" }}>{mockEval.rfq}: {mockEval.title}</span>
              <span style={{ fontSize:13, color:"#b45309", marginLeft:12 }}>3 of 4 quotes received</span>
            </div>
            <span style={{ fontSize:12, fontWeight:600, color:"#d97706", background:"#fef3c7", padding:"4px 12px", borderRadius:999 }}>Evaluating</span>
          </div>

          {/* Comparison table */}
          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden", marginBottom:20 }}>
            <div style={{ padding:"14px 20px", borderBottom:"1px solid #f1f5f9" }}>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#0c2340", margin:0 }}>TCA — Total Cost Analysis</h3>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                <thead><tr style={{ background:"#f8fafc" }}>
                  {["","Bjorneborg Steel 🇸🇪","Nordic Castings 🇸🇪","Kaiping Yuanhang 🇨🇳"].map(h => <th key={h} style={{ padding:"10px 16px", textAlign:h?"right":"left", color:"#64748b", fontWeight:600 }}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {[
                    {l:"Unit Price",v:["385,000","372,000","265,000"],bold:true},
                    {l:"Freight",v:["8,500","6,200","42,000"]},
                    {l:"Tooling",v:["0","15,000","0"]},
                    {l:"Total Landed Cost",v:["393,500","393,200","307,000"],bold:true,highlight:true},
                    {l:"vs Current (402,000)",v:["+2.1%","+2.2%","+23.7%"],green:true},
                    {l:"Lead Time",v:["12 weeks","14 weeks","22 weeks"]},
                    {l:"MOQ",v:["5 pcs","3 pcs","10 pcs"]},
                    {l:"Risk",v:["Low","Low","Medium"]},
                    {l:"Sustainability",v:["A","B+","C"]},
                  ].map(row => (
                    <tr key={row.l} style={{ borderTop:"1px solid #f1f5f9", background:row.highlight?"#f0f9ff":"white" }}>
                      <td style={{ padding:"8px 16px", fontWeight:600, color:"#0f172a" }}>{row.l}</td>
                      {row.v.map((v,i) => <td key={i} style={{ padding:"8px 16px", textAlign:"right", fontWeight:row.bold?700:400, color:row.green?"#16a34a":"#334155" }}>{v}</td>)}
                    </tr>
                  ))}
                  <tr style={{ borderTop:"2px solid #e2e8f0", background:"#f8fafc" }}>
                    <td style={{ padding:"10px 16px", fontWeight:700, color:"#0c2340" }}>AI Rank</td>
                    <td style={{ padding:"10px 16px", textAlign:"right", fontSize:16, fontWeight:800, color:"#d97706" }}>#2</td>
                    <td style={{ padding:"10px 16px", textAlign:"right", fontSize:16, fontWeight:800, color:"#16a34a" }}>#1 ⭐</td>
                    <td style={{ padding:"10px 16px", textAlign:"right", fontSize:16, fontWeight:800, color:"#0070f3" }}>#3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Recommendation */}
          <div style={{ background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:12, padding:20, marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <BarChart2 size={16} style={{ color:"#0369a1" }} />
              <h3 style={{ fontSize:14, fontWeight:700, color:"#0369a1", margin:0 }}>AI Recommendation</h3>
            </div>
            <p style={{ fontSize:14, color:"#0c4a6e", lineHeight:1.7, margin:0 }}>
              <strong>Nordic Castings Group</strong> recommended as primary supplier. While unit price is marginally higher than Kaiping, the total landed cost is nearly identical (393,200 vs 307,000) when accounting for shorter lead time, lower risk, and no CBAM impact. Bjorneborg is a strong backup with highest SQ score. Kaiping offers best price but medium risk, longer lead time, and sustainability concerns. Consider dual-sourcing Nordic + Bjorneborg for supply security.
            </p>
          </div>

          {/* Scenario buttons */}
          <div style={{ display:"flex", gap:10, marginBottom:20 }}>
            {["Best Price","Lowest Risk","Fastest Delivery","Best Overall"].map(s => (
              <button key={s} style={{ padding:"8px 18px", borderRadius:8, border:s==="Best Overall"?"1px solid #0070f3":"1px solid #e2e8f0", background:s==="Best Overall"?"#0070f3":"white", color:s==="Best Overall"?"white":"#64748b", fontSize:12, fontWeight:600, cursor:"pointer" }}>
                {s}
              </button>
            ))}
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button style={{ display:"flex", alignItems:"center", gap:6, background:"#16a34a", color:"white", padding:"12px 24px", borderRadius:8, border:"none", cursor:"pointer", fontSize:14, fontWeight:700 }}>
              <CheckCircle size={16} /> Award to Nordic Castings
            </button>
            <button style={{ display:"flex", alignItems:"center", gap:6, background:"white", color:"#64748b", padding:"12px 24px", borderRadius:8, border:"1px solid #e2e8f0", cursor:"pointer", fontSize:14 }}>
              <FileText size={16} /> Export Board Presentation
            </button>
            <button style={{ display:"flex", alignItems:"center", gap:6, background:"white", color:"#64748b", padding:"12px 24px", borderRadius:8, border:"1px solid #e2e8f0", cursor:"pointer", fontSize:14 }}>
              Re-RFQ Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const lbl: React.CSSProperties = { fontSize:12, color:"#64748b", display:"block", marginBottom:4 };
const inp: React.CSSProperties = { width:"100%", padding:"8px 12px", borderRadius:8, border:"1px solid #e2e8f0", fontSize:13, outline:"none" };
