import { useState, useEffect } from "react";

import {
  Navbar as NavbarSection,
  Hero as HeroSection,
  About as AboutSection,
  CEO as CEOSection,
  Process as ProcessSection,
  Gallery as GallerySection,
  Interiors as InteriorsSection,
  Portfolio as PortfolioSection,
  Contact as ContactSection,
  Lightbox as LightboxSection,
} from "./components/Sections";
import { LogoMark } from "./components/LogoMark";
import { IMAGES } from "./config/images";
import {
  CORE_VALUES,
  GALLERY_PROJECTS,
  INTERIOR_PROJECTS,
  NAV_LINKS,
  PORTFOLIO_ROWS,
  STATS,
  STEPS,
} from "./config/content";
import { globalCSS } from "./styles/global";

// ─── Styles ──────────────────────────────────────────────────────
const S = {
  // ── Navbar ──
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "0",
    background: "rgba(17,28,53,0.97)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(245,166,35,.15)",
  },
  navInner: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 6%",
    flexWrap: "wrap",
    gap: "1rem",
  },
  navBrand: {
    display: "flex",
    alignItems: "center",
    gap: ".85rem",
    cursor: "pointer",
    textDecoration: "none",
  },
  navWordmark: { display: "flex", flexDirection: "column", lineHeight: 1 },
  navWordmarkTop: {
    fontFamily: "'Playfair Display',serif",
    fontWeight: 900,
    fontSize: "1.3rem",
    color: "#fff",
    letterSpacing: ".04em",
  },
  navWordmarkBot: {
    fontFamily: "'DM Sans',sans-serif",
    fontWeight: 600,
    fontSize: ".6rem",
    color: "#f5a623",
    letterSpacing: ".28em",
    textTransform: "uppercase",
    marginTop: 2,
  },
  navLinks: {
    display: "flex",
    gap: "2.2rem",
    listStyle: "none",
    alignItems: "center",
  },
  navLinksOpen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    paddingTop: ".75rem",
  },
  navLink: {
    color: "#8a9bc4",
    textDecoration: "none",
    fontSize: ".83rem",
    letterSpacing: ".06em",
    textTransform: "uppercase",
    fontWeight: 500,
    transition: "color .2s",
    cursor: "pointer",
  },
  navCta: {
    background: "#f5a623",
    color: "#111c35",
    fontWeight: 700,
    padding: ".55rem 1.5rem",
    borderRadius: 2,
    fontSize: ".8rem",
    letterSpacing: ".06em",
    textTransform: "uppercase",
    cursor: "pointer",
    border: "none",
    fontFamily: "'DM Sans',sans-serif",
    transition: "background .2s",
  },
  navMenuBtn: {
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(245,166,35,.3)",
    background: "rgba(245,166,35,.08)",
    color: "#f5a623",
    width: 42,
    height: 42,
    borderRadius: 4,
    cursor: "pointer",
  },

  // ── Hero ──
  hero: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    padding: "8rem 6% 5rem",
    gap: "5rem",
    position: "relative",
    overflow: "hidden",
    background: "#111c35",
    maxWidth: "100%",
  },
  heroInner: {
    maxWidth: 1400,
    margin: "0 auto",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "5rem",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 50% 70% at 75% 50%,rgba(245,166,35,.07) 0%,transparent 70%)",
  },
  heroGrid: {
    position: "absolute",
    inset: 0,
    opacity: 0.025,
    backgroundImage:
      "linear-gradient(#f5a623 1px,transparent 1px),linear-gradient(90deg,#f5a623 1px,transparent 1px)",
    backgroundSize: "60px 60px",
  },
  heroContent: { position: "relative", zIndex: 2 },
  heroBadge: {
    display: "inline-block",
    background: "rgba(245,166,35,.1)",
    border: "1px solid rgba(245,166,35,.3)",
    color: "#f5a623",
    padding: ".35rem 1rem",
    fontSize: ".72rem",
    letterSpacing: ".18em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: "1.8rem",
    borderRadius: 1,
  },
  heroH1: {
    fontFamily: "'Playfair Display',serif",
    fontSize: "clamp(3rem,5.5vw,5rem)",
    lineHeight: 1.02,
    fontWeight: 900,
    marginBottom: "1.5rem",
  },
  heroEm: { color: "#f5a623", fontStyle: "normal", display: "block" },
  heroP: {
    color: "#8a9bc4",
    fontSize: "1.05rem",
    lineHeight: 1.85,
    maxWidth: 520,
    marginBottom: "2.2rem",
  },
  heroBtns: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  btnPrimary: {
    background: "#f5a623",
    color: "#111c35",
    fontWeight: 700,
    padding: ".95rem 2.2rem",
    borderRadius: 2,
    fontSize: ".9rem",
    letterSpacing: ".04em",
    textTransform: "uppercase",
    transition: "all .2s",
    cursor: "pointer",
    border: "none",
    fontFamily: "'DM Sans',sans-serif",
  },
  btnOutline: {
    border: "1.5px solid rgba(245,166,35,.45)",
    color: "#f5a623",
    padding: ".95rem 2.2rem",
    borderRadius: 2,
    fontSize: ".9rem",
    letterSpacing: ".04em",
    textTransform: "uppercase",
    transition: "all .2s",
    cursor: "pointer",
    background: "transparent",
    fontFamily: "'DM Sans',sans-serif",
  },
  heroStats: { display: "flex", gap: "3rem", marginTop: "3rem" },
  statNum: {
    fontFamily: "'Playfair Display',serif",
    fontSize: "2.6rem",
    fontWeight: 900,
    color: "#f5a623",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: ".72rem",
    color: "#8a9bc4",
    textTransform: "uppercase",
    letterSpacing: ".1em",
    marginTop: ".2rem",
  },
  heroImgWrap: {
    position: "relative",
    zIndex: 2,
    minHeight: 540,
    borderRadius: 8,
    overflow: "hidden",
    border: "2px solid rgba(245,166,35,.2)",
  },
  heroImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    minHeight: 540,
  },
  heroImgBadge: {
    position: "absolute",
    bottom: "1.8rem",
    left: "1.8rem",
    background: "#f5a623",
    color: "#111c35",
    padding: ".85rem 1.3rem",
    borderRadius: 3,
    fontWeight: 700,
    fontSize: ".88rem",
    boxShadow: "0 4px 20px rgba(245,166,35,.35)",
  },
  heroImgBadgeSpan: {
    display: "block",
    fontSize: ".72rem",
    fontWeight: 500,
    opacity: 0.8,
  },

  // ── Section helpers ──
  sectionTag: {
    display: "inline-block",
    color: "#f5a623",
    fontSize: ".72rem",
    letterSpacing: ".18em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: ".9rem",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display',serif",
    fontSize: "clamp(2rem,3.8vw,3rem)",
    fontWeight: 700,
    lineHeight: 1.08,
    marginBottom: "1rem",
  },
  divider: {
    width: 52,
    height: 3,
    background: "#f5a623",
    marginBottom: "2rem",
  },

  // ── About ──
  aboutSection: { background: "#1a2744", padding: "7rem 6%" },
  aboutInner: { maxWidth: 1400, margin: "0 auto" },
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5rem",
    alignItems: "start",
  },
  aboutImgWrap: {
    borderRadius: 8,
    overflow: "hidden",
    border: "2px solid rgba(245,166,35,.15)",
    position: "relative",
    minHeight: 480,
    background: "#111c35",
  },
  aboutImg: {
    width: "100%",
    objectFit: "cover",
    display: "block",
    minHeight: 480,
  },
  aboutImgBadge: {
    position: "absolute",
    bottom: "1.4rem",
    right: "1.4rem",
    background: "rgba(17,28,53,.92)",
    border: "1px solid rgba(245,166,35,.35)",
    color: "#f5a623",
    padding: ".7rem 1.1rem",
    borderRadius: 3,
    fontSize: ".78rem",
    fontWeight: 600,
    backdropFilter: "blur(8px)",
  },
  aboutLeftP: {
    color: "#8a9bc4",
    lineHeight: 1.9,
    fontSize: "1rem",
    marginBottom: "1.2rem",
  },
  aboutRight: {
    background: "#111c35",
    border: "1px solid rgba(245,166,35,.15)",
    padding: "2.5rem",
    borderRadius: 6,
    position: "relative",
    marginTop: "2rem",
  },
  aboutRightH3: {
    fontFamily: "'Playfair Display',serif",
    fontSize: "1.4rem",
    marginBottom: "1.5rem",
  },
  valueItem: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1.2rem",
    alignItems: "flex-start",
  },
  valueIcon: {
    color: "#f5a623",
    fontSize: "1rem",
    marginTop: ".2rem",
    flexShrink: 0,
  },
  valueStrong: { display: "block", fontSize: ".92rem", marginBottom: ".18rem" },
  valueSpan: { color: "#8a9bc4", fontSize: ".83rem" },

  // ── CEO ──
  ceoSection: {
    background: "#111c35",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    padding: "7rem 6%",
  },
  ceoInner: { maxWidth: 800, margin: "0 auto", position: "relative" },
  blockquote: {
    fontFamily: "'Playfair Display',serif",
    fontSize: "clamp(1.15rem,2.3vw,1.55rem)",
    lineHeight: 1.7,
    fontStyle: "italic",
    color: "#f5f2ed",
    marginBottom: "2rem",
  },
  ceoSig: {
    color: "#f5a623",
    fontWeight: 600,
    fontSize: ".95rem",
    letterSpacing: ".05em",
  },
  ceoSigSpan: {
    display: "block",
    color: "#8a9bc4",
    fontSize: ".8rem",
    fontWeight: 400,
    marginTop: ".25rem",
  },

  // ── Process ──
  howSection: { background: "#1a2744", padding: "7rem 6%" },
  howInner: { maxWidth: 1400, margin: "0 auto" },
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "2rem",
    marginTop: "2.8rem",
  },
  step: {
    background: "#111c35",
    border: "1px solid rgba(245,166,35,.12)",
    padding: "2.5rem 2.2rem",
    borderRadius: 6,
    transition: "border-color .3s,transform .3s",
  },
  stepNum: {
    fontFamily: "'Playfair Display',serif",
    fontSize: "4rem",
    fontWeight: 900,
    color: "rgba(245,166,35,.15)",
    lineHeight: 1,
    marginBottom: "1rem",
  },
  stepH3: { fontSize: "1.08rem", fontWeight: 600, marginBottom: ".75rem" },
  stepP: { color: "#8a9bc4", fontSize: ".9rem", lineHeight: 1.75 },

  // ── Galleries ──
  gallerySection: { background: "#111c35", padding: "7rem 6%" },
  interiorSection: { background: "#1a2744", padding: "7rem 6%" },
  galleryInner: { maxWidth: 1400, margin: "0 auto" },
  galleryIntro: { maxWidth: 640, marginBottom: "2.8rem" },
  galleryIntroP: { color: "#8a9bc4", lineHeight: 1.8, fontSize: ".97rem" },
  /* ── 4-column grid for larger screens ── */
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 16,
  },
  gcard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 8,
    cursor: "pointer",
    border: "1px solid rgba(245,166,35,.1)",
    transition: "border-color .3s,transform .3s,box-shadow .3s",
    aspectRatio: "4/3",
    background: "#0d1628",
  },
  gcardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform .4s ease",
  },
  gcardOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to top,rgba(10,18,40,.96) 0%,rgba(10,18,40,.15) 55%,transparent 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "1.2rem 1.3rem",
  },
  gcardSite: {
    color: "#f5a623",
    fontSize: ".7rem",
    textTransform: "uppercase",
    letterSpacing: ".15em",
    fontWeight: 700,
    marginBottom: ".3rem",
  },
  gcardDesc: {
    color: "rgba(255,255,255,.85)",
    fontSize: ".82rem",
    lineHeight: 1.35,
  },

  // ── Portfolio table ──
  projectsSection: { background: "#1a2744", padding: "7rem 6%" },
  projectsInner: { maxWidth: 1400, margin: "0 auto" },
  tblWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: ".88rem" },
  th: {
    textAlign: "left",
    padding: "1rem 1.2rem",
    background: "rgba(245,166,35,.08)",
    color: "#f5a623",
    fontSize: ".72rem",
    textTransform: "uppercase",
    letterSpacing: ".12em",
    fontWeight: 600,
    borderBottom: "1px solid rgba(245,166,35,.2)",
  },
  td: {
    padding: "1rem 1.2rem",
    color: "#8a9bc4",
    verticalAlign: "middle",
    borderBottom: "1px solid rgba(255,255,255,.04)",
  },
  tdFirst: { color: "#fff", fontWeight: 500 },
  tagR: {
    display: "inline-block",
    padding: ".2rem .7rem",
    fontSize: ".7rem",
    borderRadius: 2,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: ".07em",
    background: "rgba(245,166,35,.12)",
    color: "#f5a623",
  },
  tagC: {
    display: "inline-block",
    padding: ".2rem .7rem",
    fontSize: ".7rem",
    borderRadius: 2,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: ".07em",
    background: "rgba(100,160,255,.12)",
    color: "#7ab5ff",
  },
  tagM: {
    display: "inline-block",
    padding: ".2rem .7rem",
    fontSize: ".7rem",
    borderRadius: 2,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: ".07em",
    background: "rgba(150,255,180,.1)",
    color: "#7ee09a",
  },

  // ── Contact ──
  contactSection: { background: "#111c35", padding: "7rem 6%" },
  contactInner: { maxWidth: 1400, margin: "0 auto" },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5rem",
    alignItems: "start",
  },
  contactInfoP: {
    color: "#8a9bc4",
    lineHeight: 1.85,
    marginBottom: "2.2rem",
    fontSize: ".97rem",
  },
  citem: {
    display: "flex",
    gap: "1.1rem",
    alignItems: "flex-start",
    marginBottom: "1.8rem",
  },
  cicon: {
    width: 46,
    height: 46,
    background: "rgba(245,166,35,.1)",
    border: "1px solid rgba(245,166,35,.25)",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f5a623",
    fontSize: "1.1rem",
    flexShrink: 0,
  },
  cdetailStrong: {
    display: "block",
    fontSize: ".75rem",
    color: "#f5a623",
    textTransform: "uppercase",
    letterSpacing: ".1em",
    marginBottom: ".28rem",
  },
  cdetailA: { color: "#fff", fontSize: ".95rem", textDecoration: "none" },
  cform: {
    background: "#1a2744",
    border: "1px solid rgba(245,166,35,.12)",
    padding: "2.5rem",
    borderRadius: 6,
  },
  cformH3: {
    fontFamily: "'Playfair Display',serif",
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
  },
  formBody: {
    display: "flex",
    flexDirection: "column",
    gap: "0.9rem",
  },
  formSectionTitle: {
    fontSize: ".74rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: ".16em",
    color: "#f5a623",
    marginBottom: ".25rem",
  },
  frow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.85rem",
  },
  fgrp: {
    display: "flex",
    flexDirection: "column",
    gap: ".35rem",
  },
  fgrpLabel: {
    fontSize: ".72rem",
    color: "#8a9bc4",
    textTransform: "uppercase",
    letterSpacing: ".08em",
  },
  fgrpInput: {
    background: "#111c35",
    border: "1px solid rgba(245,166,35,.15)",
    color: "#fff",
    padding: ".75rem .9rem",
    borderRadius: 2,
    fontFamily: "'DM Sans',sans-serif",
    fontSize: ".92rem",
    outline: "none",
    transition: "border-color .2s",
  },
  fsubBtn: {
    width: "100%",
    background: "#f5a623",
    color: "#111c35",
    border: "none",
    padding: "0.95rem",
    fontWeight: 700,
    fontSize: ".92rem",
    textTransform: "uppercase",
    letterSpacing: ".08em",
    cursor: "pointer",
    borderRadius: 2,
    transition: "background .2s",
    fontFamily: "'DM Sans',sans-serif",
  },

  // ── Footer ──
  footer: {
    background: "#0b1325",
    borderTop: "1px solid rgba(245,166,35,.1)",
    padding: "1.8rem 6%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    fontSize: ".8rem",
    color: "#8a9bc4",
  },
  footerInner: {
    maxWidth: 1400,
    margin: "0 auto",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },

  // ── Lightbox ──
  lightbox: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.97)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "1rem",
  },
  lbImg: {
    maxWidth: "90vw",
    maxHeight: "80vh",
    objectFit: "contain",
    borderRadius: 8,
    border: "1px solid rgba(245,166,35,.2)",
    display: "block",
  },
  lbClose: {
    position: "absolute",
    top: "1.5rem",
    right: "2rem",
    color: "#f5a623",
    fontSize: "2.4rem",
    cursor: "pointer",
    background: "none",
    border: "none",
    lineHeight: 1,
  },
  lbCaption: {
    color: "#8a9bc4",
    marginTop: "1rem",
    fontSize: ".9rem",
    textAlign: "center",
    letterSpacing: ".03em",
  },
};

// ─── Navbar ──────────────────────────────────────────────────────
function Navbar() {
  return <NavbarSection styles={S} links={NAV_LINKS} />;
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return <HeroSection styles={S} stats={STATS} heroImage={IMAGES.hero} />;
}

// ─── About ────────────────────────────────────────────────────────
function About() {
  return <AboutSection styles={S} values={CORE_VALUES} />;
}

// ─── CEO ──────────────────────────────────────────────────────────
function CEO() {
  return <CEOSection styles={S} />;
}

// ─── Process ──────────────────────────────────────────────────────
function Process() {
  return <ProcessSection styles={S} steps={STEPS} />;
}

// ─── Gallery section ──────────────────────────────────────────────
function Gallery({ onOpen }) {
  return (
    <GallerySection
      styles={S}
      projects={GALLERY_PROJECTS}
      images={IMAGES.gallery}
      onOpen={onOpen}
    />
  );
}

// ─── Interiors section ────────────────────────────────────────────
function Interiors({ onOpen }) {
  return (
    <InteriorsSection
      styles={S}
      projects={INTERIOR_PROJECTS}
      images={IMAGES.interiors}
      onOpen={onOpen}
    />
  );
}

// ─── Portfolio table ──────────────────────────────────────────────
function Portfolio() {
  return <PortfolioSection styles={S} rows={PORTFOLIO_ROWS} />;
}

// ─── Contact ──────────────────────────────────────────────────────
function Contact() {
  return <ContactSection styles={S} />;
}

// ─── Lightbox ─────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  return <LightboxSection styles={S} item={item} onClose={onClose} />;
}

// ─── App root ─────────────────────────────────────────────────────
export default function SriHariConstructions() {
  const [lbItem, setLbItem] = useState(null);
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <CEO />
      <Process />
      <Gallery onOpen={setLbItem} />
      <Interiors onOpen={setLbItem} />
      <Portfolio />
      <Contact />
      <footer style={S.footer}>
        <div style={S.footerInner}>
          <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
            <LogoMark size={32} />
            <span>
              © 2026 <strong>Sri Hari Constructions</strong>. All rights
              reserved.
            </span>
          </div>
          <div>#24, Samayapuram Nagar 8th Street, Porur, Chennai – 600 116</div>
        </div>
      </footer>
      {lbItem && <Lightbox item={lbItem} onClose={() => setLbItem(null)} />}
    </>
  );
}
