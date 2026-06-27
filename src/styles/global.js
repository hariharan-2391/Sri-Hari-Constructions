export const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:#111c35;color:#fff;overflow-x:hidden;line-height:1.6}
body,p,span,a,li,button,input,select,textarea,td,th{font-family:'DM Sans',sans-serif}
h1,h2,h3,h4,h5,h6,.section-title,.hero-h1{font-family:'Playfair Display',serif}
img{max-width:100%;display:block}
button,input,select,textarea{font:inherit}
:root{
  --navy:#1a2744;--navy-dark:#111c35;--gold:#f5a623;--gold-light:#ffc145;
  --white:#fff;--off-white:#f5f2ed;--muted:#8a9bc4;
  --max-w:1400px;
  --px:6%;
}
#root{min-height:100vh;width:100%}
.site-inner{max-width:var(--max-w);margin:0 auto;width:100%}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.anim{animation:fadeUp .7s ease both}
.anim-delay1{animation-delay:.1s}
.anim-delay2{animation-delay:.25s}
.anim-delay3{animation-delay:.38s}
.anim-delay4{animation-delay:.5s}
.anim-delay5{animation-delay:.62s}
.site-nav-toggle{display:none!important}
@media (max-width: 960px){
  .hero-shell{padding:7.5rem 1.25rem 3.5rem!important}
  .hero-inner{grid-template-columns:1fr!important;gap:2rem!important}
  .hero-stats{flex-wrap:wrap;gap:1.25rem 1.5rem!important}
  .about-shell,.how-shell,.gallery-shell,.interior-shell,.projects-shell,.contact-shell{padding:5.5rem 1.25rem!important}
  .about-grid,.contact-grid{grid-template-columns:1fr!important;gap:2rem!important}
  .steps-grid,.gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
  .frow{grid-template-columns:1fr!important}
}
@media (max-width: 640px){
  .site-nav-inner{padding:0.9rem 1rem!important}
  .site-nav-links{display:none!important}
  .site-nav-cta{display:none!important}
  .site-nav-toggle{display:flex!important}
  .site-nav-links.open{display:flex!important;flex-direction:column;align-items:flex-start;width:100%;padding-top:.75rem}
  .hero-shell{padding:6.5rem 1rem 3rem!important}
  .hero-stats{flex-direction:column;align-items:flex-start;gap:1rem!important}
  .hero-btns{width:100%;flex-direction:column!important}
  .hero-btns button{width:100%}
  .about-shell,.how-shell,.gallery-shell,.interior-shell,.projects-shell,.contact-shell{padding:4.75rem 1rem!important}
  .steps-grid,.gallery-grid{grid-template-columns:1fr!important}
  .contact-form{padding:1.25rem!important}
  .contact-item{flex-direction:column!important}
  .about-media{min-height:320px!important}
  .about-media img{height:100%!important}
  .portfolio-table{width:100%;display:block;border-collapse:separate;border-spacing:0}
  .portfolio-table thead{display:none}
  .portfolio-table tbody{display:flex;flex-direction:column;gap:.9rem}
  .portfolio-table tbody tr{display:block;background:#111c35;border:1px solid rgba(245,166,35,.15);border-radius:10px;padding:1rem;box-shadow:0 10px 24px rgba(0,0,0,.2)}
  .portfolio-table tbody td{display:grid;grid-template-columns:92px minmax(0,1fr);gap:.45rem;padding:.4rem 0;border:none}
  .portfolio-table tbody td::before{content:attr(data-label);font-size:.68rem;color:#f5a623;text-transform:uppercase;letter-spacing:.09em;font-weight:700}
  .portfolio-table tbody td:first-child{padding-top:0}
  .portfolio-table tbody td:last-child{padding-bottom:0}
  .section-title{font-size:clamp(1.7rem,7vw,2.25rem)!important}
  .hero-h1{font-size:clamp(2.2rem,10vw,3rem)!important}
  .hero-p{font-size:.95rem!important}
}
`;
