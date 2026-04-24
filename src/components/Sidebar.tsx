"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, DollarSign, AlertTriangle, TrendingUp, FolderOpen, Zap, Shield, Lock, Settings, ClipboardCheck } from "lucide-react";

const nav = [
  { href: "/performance", label: "Supplier Performance", icon: Gauge },
  { href: "/cost-analysis", label: "AI Cost Analysis", icon: DollarSign },
  { href: "/risk", label: "Risk Monitor", icon: AlertTriangle },
  { href: "/documents", label: "Document Hub", icon: FolderOpen },
  { href: "/rfq", label: "RFQ Engine", icon: Zap },
  { href: "/naval", label: "Naval & Defence", icon: Shield, locked: true },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside style={{ width: 240, background: "#0c1829", minHeight: "100vh", padding: "20px 0", display: "flex", flexDirection: "column" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 20px 24px", textDecoration: "none" }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: "#0070f3", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ClipboardCheck size={17} style={{ color: "white" }} />
        </div>
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 13, lineHeight: 1 }}>Sourcing &</div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>Procurement Tool</div>
        </div>
      </Link>

      <div style={{ padding: "0 16px 8px" }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>Modules</span>
      </div>

      <nav style={{ flex: 1 }}>
        {nav.map(item => {
          const active = path.startsWith(item.href);
          const locked = (item as { locked?: boolean }).locked;
          return locked ? (
            <div key={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", color: "rgba(255,255,255,0.25)", fontSize: 13 }}>
              <item.icon size={16} /> <span style={{ flex: 1 }}>{item.label}</span> <Lock size={12} style={{ color: "#d97706" }} />
            </div>
          ) : (
            <Link key={item.href} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 20px",
              color: active ? "white" : "rgba(255,255,255,0.5)", textDecoration: "none",
              background: active ? "rgba(255,255,255,0.08)" : "transparent",
              borderLeft: active ? "3px solid #0070f3" : "3px solid transparent",
              fontSize: 13, fontWeight: active ? 600 : 400,
            }}>
              <item.icon size={16} /> {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: 12 }}>
          <Settings size={14} /> Settings
        </Link>
      </div>
    </aside>
  );
}
