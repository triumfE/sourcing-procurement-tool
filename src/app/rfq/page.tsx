"use client";
import { Zap } from "lucide-react";

export default function RfqPage() {
  return (
    <div style={{ maxWidth:1000, margin:"0 auto", padding:"32px 24px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
        <Zap size={22} style={{ color:"#7c3aed" }} />
        <h1 style={{ fontSize:26, fontWeight:800, color:"#0c2340", margin:0 }}>RFQ Engine</h1>
      </div>
      <p style={{ color:"#64748b", fontSize:14, marginBottom:32 }}>Send RFQs, compare quotations, generate TCA and board-ready presentations.</p>
      <div style={{ background:"white", border:"1px solid #e2e8f0", borderRadius:12, padding:48, textAlign:"center" }}>
        <Zap size={32} style={{ color:"#cbd5e1", marginBottom:12 }} />
        <h3 style={{ color:"#94a3b8", fontSize:16, margin:"0 0 6px" }}>Coming Soon</h3>
        <p style={{ color:"#cbd5e1", fontSize:13 }}>RFQ workflow with AI-powered TCA analysis</p>
      </div>
    </div>
  );
}
