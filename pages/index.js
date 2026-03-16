import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  const treeRef = useRef(null);
  const familyRef = useRef(null);
  const familyDataRef = useRef(null);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scriptsReady, setScriptsReady] = useState(false);
  const [orientation, setOrientation] = useState(5); // default bottom left

  function initTree(data, orientationValue) {
    if (!treeRef.current || !window.FamilyTree) return;

    if (familyRef.current) {
      familyRef.current.destroy();
    }

    FamilyTree.templates.tommy_male.plus = '<circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line><line x1="0" y1="-11" x2="0" y2="11" stroke-width="1" stroke="#aeaeae"></line>';
    FamilyTree.templates.tommy_male.minus = '<circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>';
    FamilyTree.templates.tommy_female.plus = '<circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line><line x1="0" y1="-11" x2="0" y2="11" stroke-width="1" stroke="#aeaeae"></line>';
    FamilyTree.templates.tommy_female.minus = '<circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="-11" y1="0" x2="11" y2="0" stroke-width="1" stroke="#aeaeae"></line>';

    const heartDef = '<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart"><path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/></g>';
    FamilyTree.templates.tommy_female.defs = heartDef;
    FamilyTree.templates.tommy_male.defs = heartDef;

    const family = new FamilyTree(treeRef.current, {
      menu: { pdf: { text: "Export PDF" } },
      mouseScrool: FamilyTree.action.scroll,
      showYScroll: FamilyTree.scroll.visible,
      showXScroll: FamilyTree.scroll.visible,
      orientation: orientationValue, // pakai nilai dari parameter
      editForm: { buttons: { edit: null } },
      template: "hugo",
      filterBy: { gender: {} },
      mode: "dark",
      nodeBinding: {
        field_0: "name",
        img_0: "img"
      },
      nodes: data
    });

    family.on("expcollclick", function (sender, isCollapsing, nodeId) {
      const node = family.getNode(nodeId);
      if (isCollapsing) {
        family.expandCollapse(nodeId, [], node.ftChildrenIds);
      } else {
        family.expandCollapse(nodeId, node.ftChildrenIds, []);
      }
      return false;
    });

    family.on("render-link", function (sender, args) {
      if (args.cnode.ppid != undefined)
        args.html += `<use data-ctrl-ec-id="${args.node.id}" xlink:href="#heart" x="${args.p.xa}" y="${args.p.ya}"/>`;
      if (args.cnode.isPartner && args.node.partnerSeparation == 30)
        args.html += `<use data-ctrl-ec-id="${args.node.id}" xlink:href="#heart" x="${args.p.xb}" y="${args.p.yb}"/>`;
    });

    familyRef.current = family;
  }

  // Fetch data pertama kali setelah script siap
  useEffect(() => {
    if (!scriptsReady) return;

    setLoading(true);
    fetch("/api/family")
      .then(res => res.json())
      .then(data => {
        familyDataRef.current = data; // simpan data di ref
        setTotalMembers(data.length);
        initTree(data, orientation);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal load data:", err);
        setLoading(false);
      });
  }, [scriptsReady]);

  // Kalau orientation berubah, rebuild tree dengan data yang sudah ada
  useEffect(() => {
    if (!scriptsReady || !familyDataRef.current) return;
    initTree(familyDataRef.current, orientation);
  }, [orientation]);

  function handleRefresh() {
    setLoading(true);
    fetch("/api/family")
      .then(res => res.json())
      .then(data => {
        familyDataRef.current = data;
        setTotalMembers(data.length);
        initTree(data, orientation);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gagal refresh:", err);
        setLoading(false);
      });
  }

  return (
    <>
      <Head>
        <title>Family Tree</title>
        <link rel="icon" type="image/png" href="/family.png" />
      </Head>

      <Script
        src="/familytree.js"
        onLoad={() => setScriptsReady(true)}
      />

      <div style={{ textAlign: "center", marginTop: "3%" }}>
        <h2>Total Family Members: {totalMembers}</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          style={{ marginTop: 8, padding: "6px 16px", cursor: "pointer" }}
        >
          {loading ? "⏳ Loading..." : "🔄 Refresh Data"}
        </button>
      </div>

      {/* Orientation dropdown */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1%" }}>
        <label htmlFor="orientation-dropdown" style={{ marginRight: 10 }}>
          Select Orientation:
        </label>
        <select
          id="orientation-dropdown"
          value={orientation}
          onChange={(e) => setOrientation(parseInt(e.target.value))}
          style={{ padding: "4px 8px" }}
        >
          <option value={0}>Top</option>
          <option value={1}>Bottom</option>
          <option value={2}>Right</option>
          <option value={3}>Left</option>
          <option value={4}>Top Left</option>
          <option value={5}>Bottom Left</option>
          <option value={6}>Right Top</option>
          <option value={7}>Left Top</option>
        </select>
      </div>

      {loading && (
        <div style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 50, height: 50, borderRadius: "50%",
          border: "5px solid #f3f3f3", borderTopColor: "#3498db",
          animation: "spin 1s infinite linear"
        }} />
      )}

      <div
        ref={treeRef}
        style={{ width: "100%", height: "80vh", marginTop: "2%" }}
      />

      <style>{`
        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        html, body { margin: 0; padding: 0; overflow: hidden; font-family: Helvetica; }
      `}</style>
    </>
  );
}