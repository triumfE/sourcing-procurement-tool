"use client";

import Link from "next/link";
import { Gauge, DollarSign, AlertTriangle, FolderOpen, Zap, Shield, Lock, ArrowRight, TrendingUp, TrendingDown, Check, Users, BarChart2, Star, ChevronRight } from "lucide-react";

const modules = [
  { href:"/performance", icon:Gauge, title:"Supplier Performance", desc:"Track OTD, quality, SQ scores and certifications across your entire supplier base. Automated scorecards and expiry alerts.", color:"#0070f3", metrics:["92% avg OTD","96% quality","5 certs expiring"] },
  { href:"/cost-analysis", icon:DollarSign, title:"AI Cost Analysis", desc:"Validate supplier price increases against real market data — LME, MEPS, energy, FX and freight indices. AI-powered recommendations.", color:"#16a34a", metrics:["4 active claims","$2.1M savings identified","62% partially justified"] },
  { href:"/risk", icon:AlertTriangle, title:"Risk Monitor", desc:"Concentration risk, financial distress, geopolitical exposure, certification gaps and ESG compliance. Early warnings before issues become critical.", color:"#dc2626", metrics:["2 high severity","6 active risks","8 countries monitored"] },
  { href:"/documents", icon:FolderOpen, title:"Document Hub", desc:"Centralized storage for contracts, NDAs, certificates, price lists, audit reports. Minutes of Meeting, action lists and follow-up tracking.", color:"#7c3aed", metrics:["Contract management","NDA tracking","Audit trail"] },
  { href:"/rfq", icon:Zap, title:"RFQ Engine", desc:"Send RFQs to multiple suppliers. AI generates benchmark comparisons, TCA analysis, commercial matrices and board-ready presentations.", color:"#d97706", metrics:["Multi-supplier RFQ","Auto TCA","Board presentations"] },
];

const kpis = [
  { label:"Suppliers Tracked", value:"127", trend:"+8", up:true },
  { label:"Avg OTD", value:"92.4%", trend:"+1.2%", up:true },
  { label:"Open Claims", value:"4", trend:"-2", up:false },
  { label:"Active Risks", value:"6", trend:"+1", up:true },
  { label:"Cost Savings YTD", value:"$2.1M", trend:"+340K", up:true },
  { label:"Contracts Expiring 90d", value:"12", trend:"", up:false },
];

const recentActivity = [
  { type:"risk", text:"Osterbergs Industrihandel — Financial distress warning", time:"2h ago", color:"#dc2626" },
  { type:"cost", text:"Bjorneborg Steel — Price increase +8.5% → AI validated 5.2%", time:"6h ago", color:"#d97706" },
  { type:"cert", text:"T-Marine Nantong — New ISO 45001 certification", time:"1d ago", color:"#16a34a" },
  { type:"perf", text:"Lyckes Produktionsverktyg — OTD dropped to 51.2%", time:"2d ago", color:"#dc2626" },
  { type:"cost", text:"Promeco OY — Price increase +4.0% → Fully justified", time:"3d ago", color:"#16a34a" },
];

export default function Home() {
  return (
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px" }}>
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg, #0c2340, #1a3a5c)", borderRadius:20, padding:"40px 44px", marginBottom:28, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:30, top:"50%", transform:"translateY(-50%)", opacity:0.06 }}>
          <BarChart2 size={200} />
        </div>
        <div style={{ position:"relative", zIndex:1, maxWidth:600 }}>
          <h1 style={{ fontSize:30, fontWeight:800, color:"white", margin:"0 0 10px", lineHeight:1.2 }}>
            Take control of your<br />sourcing & procurement
          </h1>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.6)", lineHeight:1.7, margin:"0 0 24px" }}>
            AI-powered supplier management. Track performance, validate costs, monitor risks and streamline RFQs — all in one platform built for procurement professionals.
          </p>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/performance" style={{ display:"flex", alignItems:"center", gap:6, background:"#0070f3", color:"white", padding:"12px 24px", borderRadius:10, textDecoration:"none", fontSize:14, fontWeight:700 }}>
              Open Dashboard <ArrowRight size={14} />
            </Link>
            <Link href="/cost-analysis" style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.1)", color:"white", padding:"12px 24px", borderRadius:10, textDecoration:"none", fontSize:14, fontWeight:600, border:"1px solid rgba(255,255,255,0.15)" }}>
              Try AI Cost Analysis
            </Link>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:10, marginBottom:28 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:"14px 16px" }}>
            <div style={{ fontSize:11, color:"#94a3b8", marginBottom:4 }}>{k.label}</div>
            <div style={{ fontSize:22, fontWeight:800, color:"#0f172a" }}>{k.value}</div>
            {k.trend && (
              <div style={{ fontSize:11, fontWeight:600, color:k.label.includes("Risk") || k.label.includes("Expir") ? (k.up?"#dc2626":"#16a34a") : (k.up?"#16a34a":"#dc2626"), display:"flex", alignItems:"center", gap:3, marginTop:2 }}>
                {k.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {k.trend}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:20 }}>
        {/* Modules */}
        <div>
          <h2 style={{ fontSize:17, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>Modules</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {modules.map(m => (
              <Link key={m.href} href={m.href} style={{ textDecoration:"none" }}>
                <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:"20px 24px", display:"flex", gap:16, cursor:"pointer", transition:"box-shadow 0.2s" }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:`${m.color}10`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <m.icon size={24} style={{ color:m.color }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                      <h3 style={{ fontSize:16, fontWeight:700, color:"#0f172a", margin:0 }}>{m.title}</h3>
                      <ChevronRight size={16} style={{ color:"#94a3b8" }} />
                    </div>
                    <p style={{ fontSize:13, color:"#64748b", lineHeight:1.5, margin:"0 0 8px" }}>{m.desc}</p>
                    <div style={{ display:"flex", gap:8 }}>
                      {m.metrics.map(met => (
                        <span key={met} style={{ fontSize:11, color:"#475569", background:"#f1f5f9", padding:"2px 8px", borderRadius:4 }}>{met}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Naval & Defence — locked */}
            <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:"20px 24px", display:"flex", gap:16, opacity:0.6 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:"#0c234010", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Shield size={24} style={{ color:"#0c2340" }} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                  <h3 style={{ fontSize:16, fontWeight:700, color:"#0f172a", margin:0 }}>Naval & Defence</h3>
                  <Lock size={16} style={{ color:"#d97706" }} />
                </div>
                <p style={{ fontSize:13, color:"#64748b", lineHeight:1.5, margin:0 }}>Restricted workspace. Security clearance required. Defence-grade documentation controls and ITAR-safe handling.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column — activity + quick stats */}
        <div>
          <h2 style={{ fontSize:17, fontWeight:700, color:"#0c2340", margin:"0 0 14px" }}>Recent Activity</h2>
          <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, overflow:"hidden", marginBottom:16 }}>
            {recentActivity.map((a,i) => (
              <div key={i} style={{ padding:"12px 16px", borderBottom:i<recentActivity.length-1?"1px solid #f1f5f9":"none", display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:a.color, marginTop:6, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, color:"#334155", lineHeight:1.4 }}>{a.text}</div>
                  <div style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Value prop */}
          <div style={{ background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:12, padding:20 }}>
            <h3 style={{ fontSize:14, fontWeight:700, color:"#0369a1", margin:"0 0 12px" }}>Why this tool?</h3>
            {[
              "Validate price increases with AI — save 15-25% on cost claims",
              "Early risk warnings before supply chain disruptions",
              "Automated scorecards replace manual Excel tracking",
              "Board-ready reports generated in seconds, not days",
            ].map(v => (
              <div key={v} style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:8, fontSize:13, color:"#0c4a6e" }}>
                <Check size={14} style={{ color:"#0369a1", flexShrink:0, marginTop:2 }} /> {v}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ background:"#0c2340", borderRadius:12, padding:20, marginTop:16, textAlign:"center" }}>
            <h3 style={{ color:"white", fontSize:15, fontWeight:700, margin:"0 0 6px" }}>Ready to streamline procurement?</h3>
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:12, margin:"0 0 14px" }}>Contact us for a demo and enterprise pricing</p>
            <a href="mailto:sales@supplieriq.com" style={{ display:"inline-block", background:"#0070f3", color:"white", padding:"10px 24px", borderRadius:8, textDecoration:"none", fontSize:13, fontWeight:700 }}>
              Request Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
