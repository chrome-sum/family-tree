import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Script from "next/script";

// ─── DARK ELEGANT TEMPLATE ───────────────────────────────────────────────────
function registerDarkElegantTemplates() {
  if (!window.FamilyTree) return;

  const W = 220;
  const H = 100;

  // ── shared defs (gradients, clipPaths) ─────────────────────────────────────
  const sharedDefs = `
    <linearGradient id="de_male_card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a5f"/>
      <stop offset="100%" stop-color="#0f2744"/>
    </linearGradient>
    <linearGradient id="de_female_card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b1f3a"/>
      <stop offset="100%" stop-color="#1f0f2a"/>
    </linearGradient>
    <linearGradient id="de_neutral_card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="de_male_accent" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0ea5e9"/>
    </linearGradient>
    <linearGradient id="de_female_accent" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f472b6"/>
      <stop offset="100%" stop-color="#db2777"/>
    </linearGradient>
    <linearGradient id="de_neutral_accent" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>
  `;

  // ── base dark template ──────────────────────────────────────────────────────
  const baseDE = Object.assign({}, FamilyTree.templates.base);
  baseDE.defs = sharedDefs;
  baseDE.size = [W, H];
  baseDE.padding = [40, 20, 30, 20];
  baseDE.expandCollapseSize = 18;

  baseDE.plus = `
    <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <line x1="-6" y1="0" x2="6" y2="0" stroke="#94a3b8" stroke-width="1.5"/>
    <line x1="0" y1="-6" x2="0" y2="6" stroke="#94a3b8" stroke-width="1.5"/>
  `;
  baseDE.minus = `
    <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <line x1="-6" y1="0" x2="6" y2="0" stroke="#94a3b8" stroke-width="1.5"/>
  `;

  baseDE.link = `<path stroke-linejoin="round" stroke="#334155" stroke-width="1.5px" fill="none" d="{rounded}"/>`;
  baseDE.nodeMenuButton = "";
  baseDE.up = `
    <g transform="translate(95,-14)">
      <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="#475569" stroke-width="1"/>
      <path d="M-5,3 L0,-3 L5,3" stroke="#94a3b8" stroke-width="1.5" fill="none"/>
    </g>
  `;

  // ── MALE template ───────────────────────────────────────────────────────────
  const maleNode = `
    <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="url(#de_male_card)"/>
    <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="none" stroke="#1e3a8a" stroke-width="1"/>
    <rect x="0" y="0" width="5" height="${H}" rx="3" fill="url(#de_male_accent)"/>
    <line x1="10" y1="1" x2="${W - 10}" y2="1" stroke="#38bdf8" stroke-width="0.6" opacity="0.35"/>
    <circle cx="42" cy="50" r="22" fill="#071e38"/>
    <circle cx="42" cy="50" r="20" fill="none" stroke="#38bdf8" stroke-width="0.8" opacity="0.5"/>
    <circle cx="42" cy="51" r="8" fill="none" stroke="#38bdf8" stroke-width="1.4"/>
    <line x1="48" y1="45" x2="53" y2="40" stroke="#38bdf8" stroke-width="1.4"/>
    <line x1="49" y1="40" x2="53" y2="40" stroke="#38bdf8" stroke-width="1.4"/>
    <line x1="53" y1="40" x2="53" y2="44" stroke="#38bdf8" stroke-width="1.4"/>
    <circle cx="191" cy="82" r="2" fill="#38bdf8" opacity="0.5"/>
    <circle cx="200" cy="82" r="2" fill="#38bdf8" opacity="0.3"/>
    <circle cx="209" cy="82" r="2" fill="#38bdf8" opacity="0.15"/>
  `;

  const maleTmpl = Object.assign({}, baseDE);
  maleTmpl.node = maleNode;
  maleTmpl.field_0 = `
    <text
      data-width="${W - 80}"
      style="font-size:14px;font-weight:600;letter-spacing:0.3px;"
      fill="#f1f5f9"
      x="78" y="45"
      text-anchor="start"
    >{val}</text>
    <text x="78" y="62" style="font-size:9px;letter-spacing:1.5px;" fill="#38bdf8" opacity="0.8">LAKI-LAKI</text>
  `;

  maleTmpl.link = `<path stroke-linejoin="round" stroke="#1d4ed8" stroke-width="1.5px" fill="none" d="{rounded}"/>`;
  maleTmpl.plus = `
    <circle cx="0" cy="0" r="12" fill="#071e38" stroke="#1d4ed8" stroke-width="1"/>
    <line x1="-6" y1="0" x2="6" y2="0" stroke="#38bdf8" stroke-width="1.5"/>
    <line x1="0" y1="-6" x2="0" y2="6" stroke="#38bdf8" stroke-width="1.5"/>
  `;
  maleTmpl.minus = `
    <circle cx="0" cy="0" r="12" fill="#071e38" stroke="#1d4ed8" stroke-width="1"/>
    <line x1="-6" y1="0" x2="6" y2="0" stroke="#38bdf8" stroke-width="1.5"/>
  `;

  // ── FEMALE template ─────────────────────────────────────────────────────────
  const femaleNode = `
    <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="url(#de_female_card)"/>
    <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="none" stroke="#831843" stroke-width="1"/>
    <rect x="0" y="0" width="5" height="${H}" rx="3" fill="url(#de_female_accent)"/>
    <line x1="10" y1="1" x2="${W - 10}" y2="1" stroke="#f472b6" stroke-width="0.6" opacity="0.35"/>
    <circle cx="42" cy="50" r="22" fill="#1a0824"/>
    <circle cx="42" cy="50" r="20" fill="none" stroke="#f472b6" stroke-width="0.8" opacity="0.5"/>
    <circle cx="42" cy="46" r="8" fill="none" stroke="#f472b6" stroke-width="1.4"/>
    <line x1="42" y1="54" x2="42" y2="62" stroke="#f472b6" stroke-width="1.4"/>
    <line x1="38" y1="58" x2="46" y2="58" stroke="#f472b6" stroke-width="1.4"/>
    <circle cx="191" cy="82" r="2" fill="#f472b6" opacity="0.5"/>
    <circle cx="200" cy="82" r="2" fill="#f472b6" opacity="0.3"/>
    <circle cx="209" cy="82" r="2" fill="#f472b6" opacity="0.15"/>
  `;

  const femaleTmpl = Object.assign({}, baseDE);
  femaleTmpl.node = femaleNode;
  femaleTmpl.field_0 = `
    <text
      data-width="${W - 80}"
      style="font-size:14px;font-weight:600;letter-spacing:0.3px;"
      fill="#f1f5f9"
      x="78" y="45"
      text-anchor="start"
    >{val}</text>
    <text x="78" y="62" style="font-size:9px;letter-spacing:1.5px;" fill="#f472b6" opacity="0.8">PEREMPUAN</text>
  `;

  femaleTmpl.link = `<path stroke-linejoin="round" stroke="#9d174d" stroke-width="1.5px" fill="none" d="{rounded}"/>`;
  femaleTmpl.plus = `
    <circle cx="0" cy="0" r="12" fill="#1a0824" stroke="#9d174d" stroke-width="1"/>
    <line x1="-6" y1="0" x2="6" y2="0" stroke="#f472b6" stroke-width="1.5"/>
    <line x1="0" y1="-6" x2="0" y2="6" stroke="#f472b6" stroke-width="1.5"/>
  `;
  femaleTmpl.minus = `
    <circle cx="0" cy="0" r="12" fill="#1a0824" stroke="#9d174d" stroke-width="1"/>
    <line x1="-6" y1="0" x2="6" y2="0" stroke="#f472b6" stroke-width="1.5"/>
  `;

  // ── NEUTRAL template (no gender) ────────────────────────────────────────────
  const neutralNode = `
    <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="url(#de_neutral_card)"/>
    <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="none" stroke="#334155" stroke-width="1"/>
    <rect x="0" y="0" width="5" height="${H}" rx="3" fill="url(#de_neutral_accent)"/>
    <line x1="10" y1="1" x2="${W - 10}" y2="1" stroke="#94a3b8" stroke-width="0.6" opacity="0.3"/>
    <circle cx="42" cy="50" r="22" fill="#0d1929"/>
    <circle cx="42" cy="50" r="20" fill="none" stroke="#64748b" stroke-width="0.8" opacity="0.5"/>
    <text x="42" y="56" font-size="18" fill="#475569" text-anchor="middle">?</text>
  `;

  const neutralTmpl = Object.assign({}, baseDE);
  neutralTmpl.node = neutralNode;
  neutralTmpl.field_0 = `
    <text
      data-width="${W - 80}"
      style="font-size:14px;font-weight:600;letter-spacing:0.3px;"
      fill="#cbd5e1"
      x="78" y="45"
      text-anchor="start"
    >{val}</text>
    <text x="78" y="62" style="font-size:9px;letter-spacing:1.5px;" fill="#64748b" opacity="0.8">—</text>
  `;

  // ── register templates ──────────────────────────────────────────────────────
  FamilyTree.templates.de_male   = maleTmpl;
  FamilyTree.templates.de_female = femaleTmpl;
  FamilyTree.templates.de        = neutralTmpl;

  // tags auto-routing by gender
  // these get picked up by the config tags below
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Home() {
  const treeRef       = useRef(null);
  const familyRef     = useRef(null);
  const familyDataRef = useRef(null);

  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading]           = useState(true);
  const [scriptsReady, setScriptsReady] = useState(false);
  const [orientation, setOrientation]   = useState(5);

  // ── init tree ───────────────────────────────────────────────────────────────
  function initTree(data, orientationValue) {
    if (!treeRef.current || !window.FamilyTree) return;

    registerDarkElegantTemplates();

    if (familyRef.current) {
      familyRef.current.destroy();
    }

    const family = new FamilyTree(treeRef.current, {
      menu: { pdf: { text: "Export PDF" } },
      mouseScrool:  FamilyTree.action.scroll,
      showYScroll:  FamilyTree.scroll.visible,
      showXScroll:  FamilyTree.scroll.visible,
      orientation:  orientationValue,
      editForm:     { buttons: { edit: null } },

      // ── use our dark elegant template as default ──
      template: "de",

      // ── gender → template routing ─────────────────
      tags: {
        male:   { template: "de_male" },
        female: { template: "de_female" },

        // keep children-group working
        "children-group": {
          template: "cgroup",
          subTreeConfig: { siblingSeparation: 7, columns: 1 },
        },
      },

      filterBy: { gender: {} },
      mode: "dark",

      nodeBinding: {
        field_0: "name",
      },

      nodes: data,

      // spacing
      levelSeparation:   60,
      siblingSeparation: 30,
      subtreeSeparation: 50,
      minPartnerSeparation: 40,
    });

    // ── custom expand/collapse click ──────────────────
    family.on("expcollclick", function (sender, isCollapsing, nodeId) {
      const node = family.getNode(nodeId);
      if (isCollapsing) {
        family.expandCollapse(nodeId, [], node.ftChildrenIds);
      } else {
        family.expandCollapse(nodeId, node.ftChildrenIds, []);
      }
      return false;
    });

    // ── heart on partner links ────────────────────────
    const heartDef =
      '<g transform="matrix(0.045,0,0,0.045,-10,-8)" id="heart_de">' +
      '<path fill="#7c3aed" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711' +
      'c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909l-8.431-8.909' +
      'C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778' +
      'c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581' +
      'c6.482,6.843,17.284,7.136,24.127,0.654c0.224-0.212,0.442-0.43,0.654-0.654' +
      'l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/></g>';

    FamilyTree.templates.de_male.defs   = FamilyTree.templates.de.defs + heartDef;
    FamilyTree.templates.de_female.defs = FamilyTree.templates.de.defs + heartDef;
    FamilyTree.templates.de.defs        = FamilyTree.templates.de.defs + heartDef;

    family.on("render-link", function (sender, args) {
      if (args.cnode.ppid != undefined)
        args.html += `<use data-ctrl-ec-id="${args.node.id}" xlink:href="#heart_de" x="${args.p.xa}" y="${args.p.ya}"/>`;
      if (args.cnode.isPartner && args.node.partnerSeparation === 30)
        args.html += `<use data-ctrl-ec-id="${args.node.id}" xlink:href="#heart_de" x="${args.p.xb}" y="${args.p.yb}"/>`;
    });

    familyRef.current = family;
  }

  // ── fetch on script ready ───────────────────────────────────────────────────
  useEffect(() => {
    if (!scriptsReady) return;
    setLoading(true);
    fetch("/api/family")
      .then((r) => r.json())
      .then((data) => {
        familyDataRef.current = data;
        setTotalMembers(data.length);
        initTree(data, orientation);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal load data:", err);
        setLoading(false);
      });
  }, [scriptsReady]);

  // ── rebuild on orientation change ──────────────────────────────────────────
  useEffect(() => {
    if (!scriptsReady || !familyDataRef.current) return;
    initTree(familyDataRef.current, orientation);
  }, [orientation]);

  // ── refresh handler ─────────────────────────────────────────────────────────
  function handleRefresh() {
    setLoading(true);
    fetch("/api/family")
      .then((r) => r.json())
      .then((data) => {
        familyDataRef.current = data;
        setTotalMembers(data.length);
        initTree(data, orientation);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal refresh:", err);
        setLoading(false);
      });
  }

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>Family Tree</title>
        <link rel="icon" type="image/png" href="/family.png" />
      </Head>

      <Script src="/familytree.js" onLoad={() => setScriptsReady(true)} />

      {/* ── header bar ─────────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 24px",
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
      }}>
        {/* title + counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", letterSpacing: "0.5px" }}>
            🌳 Family Tree
          </span>
          <span style={{
            background: "#1e3a5f",
            color: "#38bdf8",
            fontSize: 12,
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: 20,
            border: "1px solid #1d4ed8",
          }}>
            {totalMembers} anggota
          </span>
        </div>

        {/* controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* orientation select */}
          <select
            value={orientation}
            onChange={(e) => setOrientation(parseInt(e.target.value))}
            style={{
              background: "#1e293b",
              color: "#94a3b8",
              border: "1px solid #334155",
              borderRadius: 8,
              padding: "6px 12px",
              fontSize: 13,
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value={0}>↑ Top</option>
            <option value={1}>↓ Bottom</option>
            <option value={2}>→ Right</option>
            <option value={3}>← Left</option>
            <option value={4}>↖ Top Left</option>
            <option value={5}>↙ Bottom Left</option>
            <option value={6}>↗ Right Top</option>
            <option value={7}>↙ Left Top</option>
          </select>

          {/* refresh button */}
          <button
            onClick={handleRefresh}
            disabled={loading}
            style={{
              background: loading ? "#1e293b" : "#0f2744",
              color: loading ? "#475569" : "#38bdf8",
              border: "1px solid #1d4ed8",
              borderRadius: 8,
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "⏳ Loading…" : "↺ Refresh"}
          </button>
        </div>
      </div>

      {/* ── legend ─────────────────────────────────────────────────── */}
      <div style={{
        display: "flex",
        gap: 20,
        padding: "8px 24px",
        background: "#0a1120",
        borderBottom: "1px solid #1e293b",
      }}>
        {[
          { color: "#38bdf8", label: "Laki-laki" },
          { color: "#f472b6", label: "Perempuan" },
          { color: "#7c3aed", label: "Pasangan" },
          { color: "#94a3b8", label: "Tidak diketahui" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              width: 10, height: 10,
              borderRadius: 2,
              background: color,
              display: "inline-block",
            }} />
            <span style={{ fontSize: 11, color: "#64748b" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── tree canvas ────────────────────────────────────────────── */}
      <div style={{ position: "relative", background: "#060d1a" }}>
        {loading && (
          <div style={{
            position: "fixed",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 999,
          }}>
            <div style={{
              width: 48, height: 48,
              borderRadius: "50%",
              border: "3px solid #1e293b",
              borderTopColor: "#38bdf8",
              animation: "spin 0.8s infinite linear",
            }} />
          </div>
        )}

        <div
          ref={treeRef}
          style={{ width: "100%", height: "calc(100vh - 90px)" }}
        />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: translate(-50%,-50%) rotate(360deg); }
        }
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: #060d1a;
        }
        /* scrollbar dark */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
        /* FamilyTreeJS connector override */
        .bft-dark { background-color: #060d1a !important; }
      `}</style>
    </>
  );
}