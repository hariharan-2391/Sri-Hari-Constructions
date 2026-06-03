import { useState, useEffect, useRef } from "react";

/* ─── CSS Variables & Global Styles (injected once) ─── */
const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:#111c35;color:#fff;overflow-x:hidden}
:root{
  --navy:#1a2744;--navy-dark:#111c35;--gold:#f5a623;--gold-light:#ffc145;
  --white:#fff;--off-white:#f5f2ed;--muted:#8a9bc4;
}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.anim{animation:fadeUp .7s ease both}
.anim-delay1{animation-delay:.1s}
.anim-delay2{animation-delay:.25s}
.anim-delay3{animation-delay:.38s}
.anim-delay4{animation-delay:.5s}
.anim-delay5{animation-delay:.62s}
`;

/* ─── Data ─── */
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#how", label: "Process" },
  { href: "#gallery", label: "Projects" },
  { href: "#projects", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

const STATS = [
  { num: "20+", label: "Years Experience" },
  { num: "30+", label: "Projects Completed" },
  { num: "₹40Cr+", label: "Construction Value" },
];

const CORE_VALUES = [
  { title: "Quality Workmanship", desc: "Premium materials and skilled craftsmen on every project" },
  { title: "Innovative Engineering", desc: "Advanced construction methods meeting modern standards" },
  { title: "Safety First", desc: "Strict safety standards maintained throughout construction" },
  { title: "Client Satisfaction", desc: "Transparent communication and on-time delivery" },
  { title: "Sustainability", desc: "Building for the future with long-term value in mind" },
];

const STEPS = [
  { num: "01", title: "Planning & Consultation", desc: "We begin every project by understanding client requirements, goals, and execution expectations through detailed consultation and strategic planning — analysing scope, site conditions, budget, and timeline." },
  { num: "02", title: "Design & Engineering", desc: "Our experienced architects, engineers, and construction professionals develop innovative and structurally strong solutions meeting modern construction standards with a focus on functionality and aesthetics." },
  { num: "03", title: "Construction & Delivery", desc: "Using quality materials, advanced methods, and skilled workmanship, we execute every project with precision and safety — with strict quality checks ensuring timely, complete delivery." },
];

const GALLERY_PROJECTS = [
  { site: "Site: Adayar", desc: "Modern Contemporary Residential House" },
  { site: "Site: Kanthan Nagar, Orapakkam", desc: "Modern 3-Storey Residential Apartment" },
  { site: "Site: Mugalivakkam", desc: "Modern Luxury Villa — Geometric Architecture" },
  { site: "Site: Kelambakkam, OMR Road", desc: "Commercial-Residential G+2" },
  { site: "Site: Kalpakam", desc: "Contemporary Villa Design" },
  { site: "Site: Ram Nagar, Velachery", desc: "Modern Duplex-Style Villa" },
  { site: "Site: Valasaravakam", desc: "Traditional Luxury Residence" },
  { site: "Site: A.V.M Nagar, Urapakkam", desc: "Residential Apartment G+2" },
  { site: "Site: Rajalakshmi Nagar, Madipakkam", desc: "Modern Minimalist Individual House" },
  { site: "Site: Ram Nagar, Urapakkam", desc: "Multi-Storey Residential Building" },
  { site: "Site: Saidapet", desc: "Modern Minimalist Residential" },
  { site: "Site: Sowndariyam, Saidapet", desc: "Contemporary Apartment Complex" },
  { site: "Site: Orapakkam", desc: "Multi-Family Apartment Complex" },
  { site: "Site: Thirunindravur", desc: "Traditional Indian Residential Design" },
  { site: "Site: Sealyiur, Thambaram", desc: "Luxury Modern Villa — Stone Cladding" },
  { site: "Site: Alcon Nagar, Orapakkam", desc: "Stilt + 4 Floor Residential Complex" },
  { site: "Site: Aurl Nagar, Urapakkam", desc: "Modern Minimalist Apartment" },
  { site: "Site: Crompet", desc: "Contemporary Individual House" },
  { site: "Site: Kilpukam", desc: "Modern Contemporary Apartment" },
  { site: "Site: Korattur", desc: "Neo-Classical Luxury Residential" },
];

const INTERIOR_PROJECTS = [
  { site: "Modular Kitchen", desc: "Luxury U-shaped kitchen with glass cabinets & LED lighting" },
  { site: "Master Bedroom", desc: "Warm hotel-style bedroom with timber accents" },
  { site: "Premium Bedroom", desc: "Contemporary bedroom with floor-to-ceiling drapes" },
  { site: "Classic Bedroom", desc: "Elegant tufted headboard with gold accent pillows" },
  { site: "Office Workstation", desc: "Biophilic open-plan office with wood slat walls" },
  { site: "Corporate Lobby", desc: "Marble-floored reception with crystal pendant lights" },
  { site: "Rooftop Dining", desc: "Glass-ceiling restaurant with hanging planters & string lights" },
  { site: "Office Interior", desc: "Modern open workspace with glass partition conference room" },
  { site: "Creative Office", desc: "Hexagonal LED ceiling with yellow accent workstations" },
  { site: "Executive Cabin", desc: "Director's cabin with teak wall panel & world map art" },
  { site: "Luxury Living Hall", desc: "Double-height foyer with false ceiling & marble floors" },
  { site: "Kitchen Interior", desc: "Brown gloss modular kitchen with marble island" },
  { site: "Living Room", desc: "Open-plan living with glass railing staircase" },
  { site: "Kids Bedroom", desc: "Playful themed bedroom with loft study desk" },
];

const PORTFOLIO_ROWS = [
  { client: "Natarajan", type: "r", location: "Triplicane", period: "1998–99", area: "5,000", value: "20,00,000" },
  { client: "Dr. Ramaswamy", type: "r", location: "Saligramam", period: "2002", area: "1,500", value: "12,75,000" },
  { client: "Mathivathanam", type: "m", location: "Jaferkanpet", period: "2002–03", area: "3,200", value: "19,00,000" },
  { client: "Madhivathanam", type: "r", location: "Ambattur", period: "2003", area: "3,400", value: "17,00,000" },
  { client: "Kumar", type: "m", location: "R.A. Puram", period: "2000–11", area: "4,800", value: "60,00,000" },
  { client: "Amith", type: "c", location: "Korattur", period: "2000–11", area: "4,800 (G+2)", value: "60,00,000" },
  { client: "Varatharajan", type: "r", location: "West Mambalam", period: "2007–08", area: "1,800", value: "21,60,000" },
  { client: "Jayasree", type: "r", location: "Royaptha", period: "2008–09", area: "2,500", value: "30,00,000" },
  { client: "Eros Hassan", type: "r", location: "Adayar", period: "2011–13", area: "1,800", value: "30,00,000" },
  { client: "Mahendran (S.L. Anandan)", type: "r", location: "Noombal", period: "2010–11", area: "13,000 (G+2, 3 Blocks)", value: "1,60,00,000" },
  { client: "Kumaran (Vel Foundation)", type: "r", location: "Urapakkam", period: "2010–11", area: "5,000 (G+2)", value: "60,00,000" },
  { client: "Satish", type: "r", location: "Arul Nagar, Urapakkam", period: "2011–12", area: "6,000", value: "72,00,000" },
  { client: "Mahendran & Amith (S.L. Anandan Foundation)", type: "r", location: "Kilpukam", period: "2012–13", area: "9,000", value: "1,12,50,000" },
  { client: "Kumaran (Vel Foundation)", type: "r", location: "Saidapet", period: "2012–13", area: "10,000", value: "1,20,00,000" },
  { client: "Jayasree", type: "r", location: "Thiruninravur", period: "2012–13", area: "3,000", value: "60,00,000" },
  { client: "Mani (Home Tec)", type: "r", location: "A.V.M Nagar, Urapakkam", period: "2012–13", area: "4,800 + 9,900", value: "1,77,40,000" },
  { client: "Durai Swamy", type: "c", location: "Kelambakkam, OMR Road", period: "2013–14", area: "6,000 (G+2)", value: "85,00,000" },
  { client: "Mr. Dinesh Kumar", type: "r", location: "Sealyiur, Tambaram", period: "2014–15", area: "3,000", value: "45,00,000" },
  { client: "Kumaran Karthikeyan", type: "r", location: "Kanthan Nagar, Urapakkam", period: "2015", area: "5,120 (G+2)", value: "78,00,000" },
  { client: "Mani / Mahendran (Homtec)", type: "r", location: "Alcon Nagar, Urapakkam", period: "2015", area: "15,000 + 4,000 Stilt", value: "2,70,00,000" },
  { client: "Vijay (A.C.C Foundation)", type: "r", location: "Lakshmi Avenue, Urapakkam", period: "2015", area: "10,785 (G+2)", value: "1,50,00,000" },
  { client: "Mr. Manigandan", type: "r", location: "Rajalakshmi Nagar, Madipakkam", period: "2015–16", area: "3,296", value: "52,73,600" },
  { client: "Kalaimani Gopal", type: "r", location: "Ram Nagar, Velachery", period: "2016", area: "3,425 (G+1)", value: "54,80,000" },
];

/* ─── Inline Styles ─── */
const S = {
  /* Nav */
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 5%", background: "rgba(17,28,53,0.96)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(245,166,35,.15)" },
  navBrand: { display: "flex", alignItems: "center", gap: ".7rem", cursor: "pointer" },
  navBrandText: { fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.1, color: "#fff" },
  navBrandSpan: { display: "block", color: "#f5a623", fontSize: ".6rem", fontFamily: "'DM Sans',sans-serif", letterSpacing: ".22em", fontWeight: 600, textTransform: "uppercase" },
  navLinks: { display: "flex", gap: "1.8rem", listStyle: "none" },
  navLink: { color: "#8a9bc4", textDecoration: "none", fontSize: ".82rem", letterSpacing: ".05em", textTransform: "uppercase", fontWeight: 500, transition: "color .2s", cursor: "pointer" },
  navCta: { background: "#f5a623", color: "#111c35", fontWeight: 700, padding: ".5rem 1.3rem", borderRadius: 2, textDecoration: "none", fontSize: ".8rem", letterSpacing: ".05em", textTransform: "uppercase", transition: "background .2s", cursor: "pointer" },
  /* Hero */
  hero: { minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", padding: "7rem 5% 4rem", gap: "4rem", position: "relative", overflow: "hidden", background: "#111c35" },
  heroBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 70% at 75% 50%,rgba(245,166,35,.07) 0%,transparent 70%)" },
  heroGrid: { position: "absolute", inset: 0, opacity: .03, backgroundImage: "linear-gradient(#f5a623 1px,transparent 1px),linear-gradient(90deg,#f5a623 1px,transparent 1px)", backgroundSize: "55px 55px" },
  heroContent: { position: "relative", zIndex: 2 },
  heroBadge: { display: "inline-block", background: "rgba(245,166,35,.1)", border: "1px solid rgba(245,166,35,.3)", color: "#f5a623", padding: ".3rem .9rem", fontSize: ".7rem", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.5rem", borderRadius: 1 },
  heroH1: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.6rem,5vw,4.2rem)", lineHeight: 1.05, fontWeight: 900, marginBottom: "1.3rem" },
  heroEm: { color: "#f5a623", fontStyle: "normal", display: "block" },
  heroP: { color: "#8a9bc4", fontSize: ".97rem", lineHeight: 1.8, maxWidth: 480, marginBottom: "2rem" },
  heroBtns: { display: "flex", gap: ".8rem", flexWrap: "wrap" },
  btnPrimary: { background: "#f5a623", color: "#111c35", fontWeight: 700, padding: ".8rem 1.8rem", textDecoration: "none", borderRadius: 2, fontSize: ".85rem", letterSpacing: ".04em", textTransform: "uppercase", transition: "all .2s", display: "inline-block", cursor: "pointer", border: "none" },
  btnOutline: { border: "1px solid rgba(245,166,35,.4)", color: "#f5a623", padding: ".8rem 1.8rem", textDecoration: "none", borderRadius: 2, fontSize: ".85rem", letterSpacing: ".04em", textTransform: "uppercase", transition: "all .2s", display: "inline-block", cursor: "pointer", background: "transparent" },
  heroStats: { display: "flex", gap: "2.5rem", marginTop: "2.5rem" },
  statNum: { fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 900, color: "#f5a623", lineHeight: 1 },
  statLabel: { fontSize: ".68rem", color: "#8a9bc4", textTransform: "uppercase", letterSpacing: ".1em", marginTop: ".15rem" },
  heroImgWrap: { position: "relative", zIndex: 2, minHeight: 480, background: "rgba(245,166,35,.04)", borderRadius: 6, border: "2px solid rgba(245,166,35,.12)", display: "flex", alignItems: "center", justifyContent: "center" },
  heroImgBadge: { position: "absolute", bottom: "-1rem", left: "-1rem", background: "#f5a623", color: "#111c35", padding: ".75rem 1.1rem", borderRadius: 3, fontWeight: 700, fontSize: ".82rem", boxShadow: "0 4px 16px rgba(245,166,35,.3)" },
  heroImgBadgeSpan: { display: "block", fontSize: ".68rem", fontWeight: 500, opacity: .8 },
  /* Section base */
  section: { padding: "5.5rem 5%" },
  sectionTag: { display: "inline-block", color: "#f5a623", fontSize: ".7rem", letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: ".8rem" },
  sectionTitle: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem" },
  divider: { width: 45, height: 3, background: "#f5a623", marginBottom: "1.8rem" },
  /* About */
  aboutSection: { background: "#1a2744", padding: "5.5rem 5%" },
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" },
  aboutLeftP: { color: "#8a9bc4", lineHeight: 1.85, fontSize: ".95rem", marginBottom: "1.1rem" },
  aboutRight: { background: "#111c35", border: "1px solid rgba(245,166,35,.15)", padding: "2.2rem", borderRadius: 4, position: "relative" },
  aboutRightH3: { fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", marginBottom: "1.3rem" },
  valueItem: { display: "flex", gap: ".9rem", marginBottom: "1.1rem", alignItems: "flex-start" },
  valueIcon: { color: "#f5a623", fontSize: "1rem", marginTop: ".15rem", flexShrink: 0 },
  valueStrong: { display: "block", fontSize: ".88rem", marginBottom: ".15rem" },
  valueSpan: { color: "#8a9bc4", fontSize: ".8rem" },
  /* CEO */
  ceoSection: { background: "#111c35", position: "relative", overflow: "hidden", textAlign: "center", padding: "5.5rem 5%" },
  ceoInner: { maxWidth: 720, margin: "0 auto", position: "relative" },
  blockquote: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,2.2vw,1.45rem)", lineHeight: 1.65, fontStyle: "italic", color: "#f5f2ed", marginBottom: "1.8rem" },
  ceoSig: { color: "#f5a623", fontWeight: 600, fontSize: ".92rem", letterSpacing: ".05em" },
  ceoSigSpan: { display: "block", color: "#8a9bc4", fontSize: ".78rem", fontWeight: 400, marginTop: ".2rem" },
  /* Steps */
  howSection: { background: "#1a2744", padding: "5.5rem 5%" },
  steps: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.8rem", marginTop: "2.5rem" },
  step: { background: "#111c35", border: "1px solid rgba(245,166,35,.12)", padding: "2.2rem 1.8rem", borderRadius: 4, transition: "border-color .3s,transform .3s", cursor: "default" },
  stepNum: { fontFamily: "'Playfair Display',serif", fontSize: "3.5rem", fontWeight: 900, color: "rgba(245,166,35,.15)", lineHeight: 1, marginBottom: ".8rem" },
  stepH3: { fontSize: "1rem", fontWeight: 600, marginBottom: ".7rem" },
  stepP: { color: "#8a9bc4", fontSize: ".85rem", lineHeight: 1.7 },
  /* Gallery */
  gallerySection: { background: "#111c35", padding: "5.5rem 5%" },
  interiorSection: { background: "#1a2744", padding: "5.5rem 5%" },
  galleryIntro: { maxWidth: 600, marginBottom: "2.5rem" },
  galleryIntroP: { color: "#8a9bc4", lineHeight: 1.75, fontSize: ".93rem" },
  galleryGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 },
  gcard: { position: "relative", overflow: "hidden", borderRadius: 6, cursor: "pointer", border: "1px solid rgba(245,166,35,.1)", transition: "border-color .3s,transform .3s,box-shadow .3s", aspectRatio: "16/9", background: "rgba(245,166,35,.04)", display: "flex", alignItems: "flex-end" },
  gcardOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(10,18,40,.95) 0%,rgba(10,18,40,.2) 50%,transparent 100%)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "1.1rem 1.2rem" },
  gcardSite: { color: "#f5a623", fontSize: ".68rem", textTransform: "uppercase", letterSpacing: ".15em", fontWeight: 700, marginBottom: ".25rem" },
  gcardDesc: { color: "rgba(255,255,255,.82)", fontSize: ".8rem", lineHeight: 1.3 },
  /* Portfolio table */
  projectsSection: { background: "#1a2744", padding: "5.5rem 5%" },
  projectsIntroP: { color: "#8a9bc4", lineHeight: 1.75, fontSize: ".93rem" },
  tblWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: ".85rem" },
  th: { textAlign: "left", padding: ".85rem 1.1rem", background: "rgba(245,166,35,.08)", color: "#f5a623", fontSize: ".7rem", textTransform: "uppercase", letterSpacing: ".12em", fontWeight: 600, borderBottom: "1px solid rgba(245,166,35,.2)" },
  td: { padding: ".85rem 1.1rem", color: "#8a9bc4", verticalAlign: "middle", borderBottom: "1px solid rgba(255,255,255,.04)" },
  tdFirst: { color: "#fff", fontWeight: 500 },
  tagR: { display: "inline-block", padding: ".18rem .65rem", fontSize: ".68rem", borderRadius: 2, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", background: "rgba(245,166,35,.12)", color: "#f5a623" },
  tagC: { display: "inline-block", padding: ".18rem .65rem", fontSize: ".68rem", borderRadius: 2, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", background: "rgba(100,160,255,.12)", color: "#7ab5ff" },
  tagM: { display: "inline-block", padding: ".18rem .65rem", fontSize: ".68rem", borderRadius: 2, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", background: "rgba(150,255,180,.1)", color: "#7ee09a" },
  /* Contact */
  contactSection: { background: "#111c35", padding: "5.5rem 5%" },
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" },
  contactInfoP: { color: "#8a9bc4", lineHeight: 1.8, marginBottom: "2rem", fontSize: ".93rem" },
  citem: { display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.6rem" },
  cicon: { width: 42, height: 42, background: "rgba(245,166,35,.1)", border: "1px solid rgba(245,166,35,.25)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", color: "#f5a623", fontSize: "1rem", flexShrink: 0 },
  cdetailStrong: { display: "block", fontSize: ".75rem", color: "#f5a623", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".25rem" },
  cdetailA: { color: "#fff", fontSize: ".92rem", textDecoration: "none" },
  cform: { background: "#1a2744", border: "1px solid rgba(245,166,35,.12)", padding: "2.2rem", borderRadius: 4 },
  cformH3: { fontFamily: "'Playfair Display',serif", fontSize: "1.35rem", marginBottom: "1.3rem" },
  frow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".9rem", marginBottom: ".9rem" },
  fgrp: { display: "flex", flexDirection: "column", gap: ".35rem", marginBottom: ".9rem" },
  fgrpLabel: { fontSize: ".72rem", color: "#8a9bc4", textTransform: "uppercase", letterSpacing: ".08em" },
  fgrpInput: { background: "#111c35", border: "1px solid rgba(245,166,35,.15)", color: "#fff", padding: ".7rem .9rem", borderRadius: 2, fontFamily: "'DM Sans',sans-serif", fontSize: ".9rem", outline: "none", transition: "border-color .2s" },
  fsubBtn: { width: "100%", background: "#f5a623", color: "#111c35", border: "none", padding: ".95rem", fontWeight: 700, fontSize: ".88rem", textTransform: "uppercase", letterSpacing: ".08em", cursor: "pointer", borderRadius: 2, transition: "background .2s", fontFamily: "'DM Sans',sans-serif" },
  /* Footer */
  footer: { background: "#0b1325", borderTop: "1px solid rgba(245,166,35,.1)", padding: "1.5rem 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", fontSize: ".78rem", color: "#8a9bc4" },
  /* Lightbox */
  lightbox: { position: "fixed", inset: 0, background: "rgba(0,0,0,.95)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "1rem" },
  lbImg: { maxWidth: "92vw", maxHeight: "82vh", objectFit: "contain", borderRadius: 6, border: "1px solid rgba(245,166,35,.2)" },
  lbClose: { position: "absolute", top: "1.5rem", right: "2rem", color: "#f5a623", fontSize: "2.2rem", cursor: "pointer", background: "none", border: "none", lineHeight: 1 },
  lbCaption: { color: "#8a9bc4", marginTop: ".9rem", fontSize: ".88rem", textAlign: "center", letterSpacing: ".03em" },
};

/* ─── Sub-components ─── */
function Logo() {
  return (
    <div style={S.navBrand} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <svg width="38" height="38" viewBox="0 0 38 38">
        <polygon points="19,2 36,14 30,36 8,36 2,14" fill="#f5a623" opacity=".15" />
        <polygon points="19,2 36,14 30,36 8,36 2,14" fill="none" stroke="#f5a623" strokeWidth="1.5" />
        <text x="19" y="24" textAnchor="middle" fontSize="14" fill="#f5a623">⌂</text>
      </svg>
      <div style={S.navBrandText}>
        SRI HARI<span style={S.navBrandSpan}>Constructions</span>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav style={{ ...S.nav, boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.4)" : "none" }}>
      <Logo />
      <ul style={S.navLinks}>
        {NAV_LINKS.map(l => (
          <li key={l.href}>
            <a
              style={S.navLink}
              onClick={() => scrollTo(l.href)}
              onMouseEnter={e => e.target.style.color = "#f5a623"}
              onMouseLeave={e => e.target.style.color = "#8a9bc4"}
            >{l.label}</a>
          </li>
        ))}
      </ul>
      <a
        style={S.navCta}
        onClick={() => scrollTo("#contact")}
        onMouseEnter={e => e.target.style.background = "#ffc145"}
        onMouseLeave={e => e.target.style.background = "#f5a623"}
      >Get a Quote</a>
    </nav>
  );
}

function Hero({ onGalleryClick }) {
  return (
    <section style={S.hero}>
      <div style={S.heroBg} />
      <div style={S.heroGrid} />
      <div style={{ ...S.heroContent }}>
        <div className="anim anim-delay1" style={S.heroBadge}>Est. 2004 · Porur, Chennai</div>
        <h1 className="anim anim-delay2" style={S.heroH1}>
          Building Spaces<em style={S.heroEm}>That Last.</em>
        </h1>
        <p className="anim anim-delay3" style={S.heroP}>
          Residential, commercial and infrastructure construction delivered with precision, quality craftsmanship, and unwavering integrity — from foundation to final handover.
        </p>
        <div className="anim anim-delay4" style={S.heroBtns}>
          <button
            style={S.btnPrimary}
            onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            onMouseEnter={e => e.target.style.background = "#ffc145"}
            onMouseLeave={e => e.target.style.background = "#f5a623"}
          >View Our Projects</button>
          <button
            style={S.btnOutline}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            onMouseEnter={e => e.target.style.background = "rgba(245,166,35,.08)"}
            onMouseLeave={e => e.target.style.background = "transparent"}
          >Start Your Project</button>
        </div>
        <div className="anim anim-delay5" style={S.heroStats}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={S.statNum}>{s.num}</div>
              <div style={S.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={S.heroImgWrap}>
        <div style={{ color: "rgba(245,166,35,.2)", fontSize: "5rem", fontFamily: "'Playfair Display',serif" }}>⌂</div>
        <div style={S.heroImgBadge}>
          Featured Project
          <span style={S.heroImgBadgeSpan}>Korattur, Chennai</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={S.aboutSection}>
      <div style={S.aboutGrid}>
        <div>
          <div style={S.sectionTag}>— About Us</div>
          <h2 style={S.sectionTitle}>Building Homes, Building Trust</h2>
          <div style={S.divider} />
          <p style={S.aboutLeftP}>Sri Hari Constructions is a trusted construction and infrastructure company based in Chennai, committed to delivering high-quality residential, commercial, and interior projects with precision and professionalism.</p>
          <p style={S.aboutLeftP}>With a strong foundation built on quality workmanship, innovative engineering, and customer satisfaction, we specialize in creating modern spaces that combine durability, functionality, and elegant design.</p>
          <p style={S.aboutLeftP}>From planning and execution to final delivery, our team ensures every project is completed with attention to detail, safety standards, and timely completion. Over the years, we have built strong relationships with clients through transparency, reliability, and consistent project excellence.</p>
        </div>
        <div style={S.aboutRight}>
          <div style={{ position: "absolute", top: -1, left: "2rem", width: 55, height: 3, background: "#f5a623" }} />
          <h3 style={S.aboutRightH3}>Our Core Values</h3>
          {CORE_VALUES.map(v => (
            <div key={v.title} style={S.valueItem}>
              <div style={S.valueIcon}>◆</div>
              <div>
                <strong style={S.valueStrong}>{v.title}</strong>
                <span style={S.valueSpan}>{v.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CEO() {
  return (
    <section id="ceo" style={S.ceoSection}>
      <div style={{ position: "absolute", top: "-3rem", left: "3%", fontFamily: "'Playfair Display',serif", fontSize: "18rem", color: "rgba(245,166,35,.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>"</div>
      <div style={S.ceoInner}>
        <div style={S.sectionTag}>— CEO Message</div>
        <blockquote style={S.blockquote}>
          "We believe every project is an opportunity to create something meaningful and lasting. Our mission is to deliver modern construction solutions with uncompromising quality, integrity, and customer focus — combining advanced construction practices with skilled craftsmanship and innovative thinking."
        </blockquote>
        <div style={S.ceoSig}>
          D. Durairaj
          <span style={S.ceoSigSpan}>Chief Executive Officer, Sri Hari Constructions</span>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="how" style={S.howSection}>
      <div style={S.sectionTag}>— Our Process</div>
      <h2 style={S.sectionTitle}>How We Work</h2>
      <div style={S.divider} />
      <div style={S.steps}>
        {STEPS.map((s, i) => (
          <div
            key={s.num}
            style={{ ...S.step, borderColor: hovered === i ? "#f5a623" : "rgba(245,166,35,.12)", transform: hovered === i ? "translateY(-4px)" : "none" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={S.stepNum}>{s.num}</div>
            <h3 style={S.stepH3}>{s.title}</h3>
            <p style={S.stepP}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GalleryCard({ item, onOpen }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...S.gcard, borderColor: hovered ? "rgba(245,166,35,.55)" : "rgba(245,166,35,.1)", transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? "0 16px 40px rgba(0,0,0,.5)" : "none" }}
      onClick={() => onOpen(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={S.gcardOverlay}>
        <div style={S.gcardSite}>{item.site}</div>
        <div style={S.gcardDesc}>{item.desc}</div>
      </div>
    </div>
  );
}

function Gallery({ onOpen }) {
  return (
    <section id="gallery" style={S.gallerySection}>
      <div style={S.galleryIntro}>
        <div style={S.sectionTag}>— Our Projects</div>
        <h2 style={S.sectionTitle}>Project Showcase</h2>
        <div style={S.divider} />
        <p style={S.galleryIntroP}>20 completed projects across Chennai — from our portfolio. Click any card to view details.</p>
      </div>
      <div style={S.galleryGrid}>
        {GALLERY_PROJECTS.map((item, i) => (
          <GalleryCard key={i} item={item} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function Interiors({ onOpen }) {
  return (
    <section id="interiors" style={S.interiorSection}>
      <div style={S.galleryIntro}>
        <div style={S.sectionTag}>— Interior Works</div>
        <h2 style={S.sectionTitle}>Spaces That Inspire</h2>
        <div style={S.divider} />
        <p style={S.galleryIntroP}>From modular kitchens and luxury bedrooms to corporate offices and grand living spaces — our interior work reflects precision craftsmanship, elegant material selection, and thoughtful design tailored to every client's vision.</p>
      </div>
      <div style={S.galleryGrid}>
        {INTERIOR_PROJECTS.map((item, i) => (
          <GalleryCard key={i} item={item} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function TypeTag({ type }) {
  if (type === "c") return <span style={S.tagC}>Commercial</span>;
  if (type === "m") return <span style={S.tagM}>Mixed</span>;
  return <span style={S.tagR}>Residential</span>;
}

function Portfolio() {
  return (
    <section id="projects" style={S.projectsSection}>
      <div style={{ maxWidth: 560, marginBottom: "2.5rem" }}>
        <div style={S.sectionTag}>— Full Portfolio</div>
        <h2 style={S.sectionTitle}>A Track Record of Excellence</h2>
        <div style={S.divider} />
        <p style={S.projectsIntroP}>Since 2004, Sri Hari Constructions has delivered residential, commercial, and mixed-use projects across Chennai — totalling crores of rupees in construction value.</p>
      </div>
      <div style={S.tblWrap}>
        <table style={S.table}>
          <thead>
            <tr>
              {["Client", "Type", "Location", "Period", "Area (sqft)", "Value (₹)"].map(h => (
                <th key={h} style={S.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PORTFOLIO_ROWS.map((row, i) => (
              <tr key={i}>
                <td style={S.tdFirst}>{row.client}</td>
                <td style={S.td}><TypeTag type={row.type} /></td>
                <td style={S.td}>{row.location}</td>
                <td style={S.td}>{row.period}</td>
                <td style={S.td}>{row.area}</td>
                <td style={S.td}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ Name: "", Phone: "", Email: "", ProjectType: "", Location: "", Budget: "", Message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      data.append("_subject", "New Enquiry - Sri Hari Constructions");
      data.append("_captcha", "false");
      data.append("_template", "table");

      const response = await fetch(
        "https://formsubmit.co/ajax/srihariconstructions.info@gmail.com",
        {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);

        setForm({
          Name: "",
          Phone: "",
          Email: "",
          ProjectType: "",
          Location: "",
          Budget: "",
          Message: "",
        });
      } else {
        alert(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" style={S.contactSection}>
      <div style={S.contactGrid}>
        <div>
          <div style={S.sectionTag}>— Get In Touch</div>
          <h2 style={S.sectionTitle}>Start Your Project With Us</h2>
          <div style={S.divider} />
          <p style={S.contactInfoP}>Ready to build something meaningful and lasting? Reach out to discuss your residential, commercial, or infrastructure project. Our team is ready to bring your vision to life with quality and precision.</p>
          {[
            { icon: "📞", label: "Phone", val: "+91 98765 43210", href: "tel:+919876543210" },
            { icon: "✉️", label: "Email", val: "srihariconstructions.info@gmail.com", href: "mailto:srihariconstructions.info@gmail.com" },
            { icon: "📍", label: "Office", val: "Porur, Chennai, Tamil Nadu, India", href: null },
          ].map(c => (
            <div key={c.label} style={S.citem}>
              <div style={S.cicon}>{c.icon}</div>
              <div>
                <strong style={S.cdetailStrong}>{c.label}</strong>
                {c.href
                  ? <a href={c.href} style={S.cdetailA} onMouseEnter={e => e.target.style.color = "#f5a623"} onMouseLeave={e => e.target.style.color = "#fff"}>{c.val}</a>
                  : <span style={S.cdetailA}>{c.val}</span>}
              </div>
            </div>
          ))}
        </div>
        <div style={S.cform}>
          <h3 style={S.cformH3}>Send Us a Message</h3>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "#f5a623" }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
              <p>Thank you! We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={S.frow}>
                <div style={S.fgrp}>
                  <label style={S.fgrpLabel}>Full Name</label>
                  <input style={S.fgrpInput} name="Name" placeholder="Your Name" required value={form.Name} onChange={handleChange} onFocus={e => e.target.style.borderColor = "#f5a623"} onBlur={e => e.target.style.borderColor = "rgba(245,166,35,.15)"} />
                </div>
                <div style={S.fgrp}>
                  <label style={S.fgrpLabel}>Phone Number</label>
                  <input style={S.fgrpInput} name="Phone" placeholder="+91 XXXXX XXXXX" required value={form.Phone} onChange={handleChange} onFocus={e => e.target.style.borderColor = "#f5a623"} onBlur={e => e.target.style.borderColor = "rgba(245,166,35,.15)"} />
                </div>
              </div>
              <div style={S.fgrp}>
                <label style={S.fgrpLabel}>Email Address</label>
                <input style={S.fgrpInput} type="email" name="Email" placeholder="your@email.com" required value={form.Email} onChange={handleChange} onFocus={e => e.target.style.borderColor = "#f5a623"} onBlur={e => e.target.style.borderColor = "rgba(245,166,35,.15)"} />
              </div>
              <div style={S.fgrp}>
                <label style={S.fgrpLabel}>Project Type</label>
                <select style={{ ...S.fgrpInput, appearance: "none" }} name="ProjectType" required value={form.ProjectType} onChange={handleChange} onFocus={e => e.target.style.borderColor = "#f5a623"} onBlur={e => e.target.style.borderColor = "rgba(245,166,35,.15)"}>
                  <option value="">Select Project Type</option>
                  {["Residential Construction", "Commercial Construction", "Renovation", "Interior Design", "Infrastructure Project"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.fgrp}>
                <label style={S.fgrpLabel}>Project Location</label>
                <input style={S.fgrpInput} name="Location" placeholder="Enter Project Location" value={form.Location} onChange={handleChange} onFocus={e => e.target.style.borderColor = "#f5a623"} onBlur={e => e.target.style.borderColor = "rgba(245,166,35,.15)"} />
              </div>
              <div style={S.fgrp}>
                <label style={S.fgrpLabel}>Estimated Budget</label>
                <select style={{ ...S.fgrpInput, appearance: "none" }} name="Budget" value={form.Budget} onChange={handleChange} onFocus={e => e.target.style.borderColor = "#f5a623"} onBlur={e => e.target.style.borderColor = "rgba(245,166,35,.15)"}>
                  <option value="">Select Budget</option>
                  {["Below ₹10 Lakhs", "₹10 - ₹25 Lakhs", "₹25 - ₹50 Lakhs", "₹50 Lakhs - ₹1 Crore", "Above ₹1 Crore"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div style={S.fgrp}>
                <label style={S.fgrpLabel}>Message</label>
                <textarea style={{ ...S.fgrpInput, resize: "vertical", minHeight: 90 }} name="Message" placeholder="Tell us about your project requirements..." rows={6} required value={form.Message} onChange={handleChange} onFocus={e => e.target.style.borderColor = "#f5a623"} onBlur={e => e.target.style.borderColor = "rgba(245,166,35,.15)"} />
              </div>
              <button type="submit" style={S.fsubBtn} onMouseEnter={e => e.target.style.background = "#ffc145"} onMouseLeave={e => e.target.style.background = "#f5a623"}>
                Request Free Consultation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!item) return null;

  return (
    <div style={S.lightbox} onClick={onClose}>
      <button style={S.lbClose} onClick={onClose}>✕</button>
      <div style={{ ...S.lbImg, background: "rgba(245,166,35,.04)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem", minWidth: 360, minHeight: 240 }}
        onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: "4rem", color: "rgba(245,166,35,.3)", marginBottom: "1rem" }}>⌂</div>
        <div style={{ color: "#f5a623", fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".15em", fontWeight: 700, marginBottom: ".5rem" }}>{item.site}</div>
        <div style={{ color: "rgba(255,255,255,.82)", fontSize: ".95rem", textAlign: "center" }}>{item.desc}</div>
      </div>
      <div style={S.lbCaption}>{item.site} — {item.desc}</div>
    </div>
  );
}

/* ─── Root App ─── */
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
        <div>© 2026 <strong>Sri Hari Constructions</strong>. All rights reserved.</div>
        <div>#24, Samayapuram Nagar 8th Street, Porur, Chennai – 600 116</div>
      </footer>
      {lbItem && <Lightbox item={lbItem} onClose={() => setLbItem(null)} />}
    </>
  );
}
