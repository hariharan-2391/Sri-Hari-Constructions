import { useEffect, useState } from "react";

import logoImg from "../assets/images/logo.jpg";

function LogoMark({ size = 48 }) {
  return (
    <img
      src={logoImg}
      alt="Sri Hari Constructions Logo"
      loading="eager"
      decoding="async"
      style={{
        height: size,
        width: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  );
}

export function Navbar({ styles, links }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.innerWidth > 640) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (id) => {
    document
      .getElementById(id.replace("#", ""))
      ?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        ...styles.nav,
        boxShadow: scrolled ? "0 4px 28px rgba(0,0,0,.45)" : "none",
      }}
      className="site-nav"
    >
      <div style={styles.navInner} className="site-nav-inner">
        <div
          style={styles.navBrand}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <LogoMark size={46} />
          <div style={styles.navWordmark}>
            <span style={styles.navWordmarkTop}>SRI HARI</span>
            <span style={styles.navWordmarkBot}>Constructions</span>
          </div>
        </div>

        <button
          style={styles.navMenuBtn}
          className="site-nav-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <ul
          style={{
            ...styles.navLinks,
            ...(menuOpen ? styles.navLinksOpen : {}),
          }}
          className={`site-nav-links${menuOpen ? " open" : ""}`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                style={styles.navLink}
                onClick={() => go(link.href)}
                onMouseEnter={(e) => (e.target.style.color = "#f5a623")}
                onMouseLeave={(e) => (e.target.style.color = "#8a9bc4")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          style={styles.navCta}
          className="site-nav-cta"
          onClick={() => go("#contact")}
          onMouseEnter={(e) => (e.target.style.background = "#ffc145")}
          onMouseLeave={(e) => (e.target.style.background = "#f5a623")}
        >
          Get a Quote
        </button>
      </div>
    </nav>
  );
}

export function Hero({ styles, stats, heroImage }) {
  return (
    <section
      aria-labelledby="hero-title"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#111c35",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "8rem 6% 5rem",
      }}
      className="hero-shell"
    >
      <div style={styles.heroBg} />
      <div style={styles.heroGrid} />
      <div
        style={{ ...styles.heroInner, position: "relative", zIndex: 2 }}
        className="hero-inner"
      >
        <div style={styles.heroContent} className="hero-content">
          <div className="anim anim-delay1" style={styles.heroBadge}>
            Est. 2004 · Porur, Chennai
          </div>
          <h1
            id="hero-title"
            className="anim anim-delay2 hero-h1"
            style={styles.heroH1}
          >
            Building Spaces<em style={styles.heroEm}>That Last.</em>
          </h1>
          <p className="anim anim-delay3 hero-p" style={styles.heroP}>
            Residential, commercial and infrastructure construction delivered
            with precision, quality craftsmanship, and unwavering integrity —
            from foundation to final handover.
          </p>
          <div className="anim anim-delay4 hero-btns" style={styles.heroBtns}>
            <button
              style={styles.btnPrimary}
              onClick={() =>
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              onMouseEnter={(e) => (e.target.style.background = "#ffc145")}
              onMouseLeave={(e) => (e.target.style.background = "#f5a623")}
            >
              View Our Projects
            </button>
            <button
              style={styles.btnOutline}
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(245,166,35,.08)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Start Your Project
            </button>
          </div>
          <div className="anim anim-delay5 hero-stats" style={styles.heroStats}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={styles.statNum}>{stat.num}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.heroImgWrap} className="hero-visual">
          <img
            src={heroImage}
            alt="Featured Project – Korattur, Chennai"
            loading="eager"
            decoding="async"
            style={styles.heroImg}
          />
          <div style={styles.heroImgBadge}>
            Featured Project
            <span style={styles.heroImgBadgeSpan}>Korattur, Chennai</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About({ styles, values }) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      style={styles.aboutSection}
      className="about-shell"
    >
      <div style={styles.aboutInner}>
        <div style={styles.aboutGrid} className="about-grid">
          <div>
            <div style={styles.sectionTag}>— About Us</div>
            <h2 className="section-title" style={styles.sectionTitle}>
              Building Homes, Building Trust
            </h2>
            <div style={styles.divider} />
            <p style={styles.aboutLeftP}>
              Sri Hari Constructions is a trusted construction and
              infrastructure company based in Chennai, committed to delivering
              high-quality residential, commercial, and interior projects with
              precision and professionalism.
            </p>
            <p style={styles.aboutLeftP}>
              With a strong foundation built on quality workmanship, innovative
              engineering, and customer satisfaction, we specialize in creating
              modern spaces that combine durability, functionality, and elegant
              design.
            </p>
            <p style={styles.aboutLeftP}>
              From planning and execution to final delivery, our team ensures
              every project is completed with attention to detail, safety
              standards, and timely completion.
            </p>
          </div>
          <div style={styles.aboutRight} className="about-values">
            <div
              style={{
                position: "absolute",
                top: -1,
                left: "2rem",
                width: 55,
                height: 3,
                background: "#f5a623",
              }}
            />
            <h3 style={styles.aboutRightH3}>Our Core Values</h3>
            {values.map((value) => (
              <div key={value.title} style={styles.valueItem}>
                <div style={styles.valueIcon}>◆</div>
                <div>
                  <strong style={styles.valueStrong}>{value.title}</strong>
                  <span style={styles.valueSpan}>{value.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CEO({ styles }) {
  return (
    <section id="ceo" style={styles.ceoSection}>
      <div
        style={{
          position: "absolute",
          top: "-3rem",
          left: "3%",
          fontFamily: "'Playfair Display',serif",
          fontSize: "18rem",
          color: "rgba(245,166,35,.04)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        "
      </div>
      <div style={styles.ceoInner}>
        <div style={styles.sectionTag}>— CEO Message</div>
        <blockquote style={styles.blockquote}>
          “We believe every project is an opportunity to create something
          meaningful and lasting. Our mission is to deliver modern construction
          solutions with uncompromising quality, integrity, and customer focus —
          combining advanced construction practices with skilled craftsmanship
          and innovative thinking.”
        </blockquote>
        <div style={styles.ceoSig}>
          D. Durairaj
          <span style={styles.ceoSigSpan}>
            Chief Executive Officer, Sri Hari Constructions
          </span>
        </div>
      </div>
    </section>
  );
}

export function Process({ styles, steps }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="how"
      aria-labelledby="process-title"
      style={styles.howSection}
      className="how-shell"
    >
      <div style={styles.howInner}>
        <div style={styles.sectionTag}>— Our Process</div>
        <h2 className="section-title" style={styles.sectionTitle}>
          How We Work
        </h2>
        <div style={styles.divider} />
        <div style={styles.steps} className="steps-grid">
          {steps.map((step, index) => (
            <div
              key={step.num}
              style={{
                ...styles.step,
                borderColor:
                  hovered === index ? "#f5a623" : "rgba(245,166,35,.12)",
                transform: hovered === index ? "translateY(-5px)" : "none",
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={styles.stepNum}>{step.num}</div>
              <h3 style={styles.stepH3}>{step.title}</h3>
              <p style={styles.stepP}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ item, img, onOpen, styles }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.gcard,
        borderColor: hovered ? "rgba(245,166,35,.6)" : "rgba(245,166,35,.1)",
        transform: hovered ? "translateY(-5px)" : "none",
        boxShadow: hovered ? "0 20px 44px rgba(0,0,0,.55)" : "none",
      }}
      onClick={() => onOpen({ ...item, img })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={img}
        alt={item.desc}
        loading="lazy"
        decoding="async"
        style={{
          ...styles.gcardImg,
          transform: hovered ? "scale(1.07)" : "scale(1)",
        }}
      />
      <div style={styles.gcardOverlay}>
        <div style={styles.gcardSite}>{item.site}</div>
        <div style={styles.gcardDesc}>{item.desc}</div>
      </div>
    </div>
  );
}

export function Gallery({ styles, projects, images, onOpen }) {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      style={styles.gallerySection}
      className="gallery-shell"
    >
      <div style={styles.galleryInner}>
        <div style={styles.galleryIntro}>
          <div style={styles.sectionTag}>— Our Projects</div>
          <h2
            id="gallery-title"
            className="section-title"
            style={styles.sectionTitle}
          >
            Project Showcase
          </h2>
          <div style={styles.divider} />
          <p style={styles.galleryIntroP}>
            20 completed projects across Chennai — from our portfolio. Click any
            image to view full size.
          </p>
        </div>
        <div style={styles.galleryGrid} className="gallery-grid">
          {projects.map((item, index) => (
            <GalleryCard
              key={item.site}
              item={item}
              img={images[index]}
              onOpen={onOpen}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Interiors({ styles, projects, images, onOpen }) {
  return (
    <section
      id="interiors"
      aria-labelledby="interiors-title"
      style={styles.interiorSection}
      className="interior-shell"
    >
      <div style={styles.galleryInner}>
        <div style={styles.galleryIntro}>
          <div style={styles.sectionTag}>— Interior Works</div>
          <h2
            id="interiors-title"
            className="section-title"
            style={styles.sectionTitle}
          >
            Spaces That Inspire
          </h2>
          <div style={styles.divider} />
          <p style={styles.galleryIntroP}>
            From modular kitchens and luxury bedrooms to corporate offices and
            grand living spaces — our interior work reflects precision
            craftsmanship and thoughtful design tailored to every client's
            vision.
          </p>
        </div>
        <div style={styles.galleryGrid} className="gallery-grid">
          {projects.map((item, index) => (
            <GalleryCard
              key={item.site}
              item={item}
              img={images[index]}
              onOpen={onOpen}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TypeTag({ type, styles }) {
  if (type === "c") return <span style={styles.tagC}>Commercial</span>;
  if (type === "m") return <span style={styles.tagM}>Mixed</span>;
  return <span style={styles.tagR}>Residential</span>;
}

export function Portfolio({ styles, rows }) {
  return (
    <section
      id="projects"
      aria-labelledby="portfolio-title"
      style={styles.projectsSection}
      className="projects-shell"
    >
      <div style={styles.projectsInner}>
        <div style={{ maxWidth: 620, marginBottom: "2.8rem" }}>
          <div style={styles.sectionTag}>— Full Portfolio</div>
          <h2
            id="portfolio-title"
            className="section-title"
            style={styles.sectionTitle}
          >
            A Track Record of Excellence
          </h2>
          <div style={styles.divider} />
          <p style={{ color: "#8a9bc4", lineHeight: 1.8, fontSize: ".97rem" }}>
            Since 2004, Sri Hari Constructions has delivered residential,
            commercial, and mixed-use projects across Chennai — totalling crores
            of rupees in construction value.
          </p>
        </div>
        <div style={styles.tblWrap}>
          <table style={styles.table} className="portfolio-table">
            <thead>
              <tr>
                {[
                  "Client",
                  "Type",
                  "Location",
                  "Period",
                  "Area (sqft)",
                  "Value (₹)",
                ].map((heading) => (
                  <th key={heading} style={styles.th}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.client}-${index}`}>
                  <td style={styles.tdFirst} data-label="Client">
                    {row.client}
                  </td>
                  <td style={styles.td} data-label="Type">
                    <TypeTag type={row.type} styles={styles} />
                  </td>
                  <td style={styles.td} data-label="Location">
                    {row.location}
                  </td>
                  <td style={styles.td} data-label="Period">
                    {row.period}
                  </td>
                  <td style={styles.td} data-label="Area (sqft)">
                    {row.area}
                  </td>
                  <td style={styles.td} data-label="Value (₹)">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Contact({ styles }) {
  const [form, setForm] = useState({
    Name: "",
    Phone: "",
    Email: "",
    ProjectType: "",
    Location: "",
    Budget: "",
    Message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (event) =>
    setForm((value) => ({ ...value, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      data.append("_subject", "New Enquiry - Sri Hari Constructions");
      data.append("_captcha", "false");
      data.append("_template", "table");
      const response = await fetch(
        "https://formsubmit.co/ajax/srihariconstructions.info@gmail.com",
        {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        },
      );
      if (response.ok) setSubmitted(true);
      else alert("Failed to send. Please try again.");
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  const inputProps = (name, extra = {}) => ({
    style: styles.fgrpInput,
    name,
    value: form[name],
    onChange: handle,
    onFocus: (event) => (event.target.style.borderColor = "#f5a623"),
    onBlur: (event) =>
      (event.target.style.borderColor = "rgba(245,166,35,.15)"),
    ...extra,
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      style={styles.contactSection}
      className="contact-shell"
    >
      <div style={styles.contactInner}>
        <div style={styles.contactGrid} className="contact-grid">
          <div>
            <div style={styles.sectionTag}>— Get In Touch</div>
            <h2
              id="contact-title"
              className="section-title"
              style={styles.sectionTitle}
            >
              Start Your Project With Us
            </h2>
            <div style={styles.divider} />
            <p style={styles.contactInfoP}>
              Ready to build something meaningful and lasting? Reach out to
              discuss your residential, commercial, or infrastructure project.
              Our team is ready to bring your vision to life with quality and
              precision.
            </p>
            {[
              {
                icon: "📞",
                label: "Phone",
                value: "+91 98765 43210",
                href: "tel:+919876543210",
              },
              {
                icon: "✉️",
                label: "Email",
                value: "srihariconstructions.info@gmail.com",
                href: "mailto:srihariconstructions.info@gmail.com",
              },
              {
                icon: "📍",
                label: "Office",
                value: "Porur, Chennai, Tamil Nadu, India",
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                style={styles.citem}
                className="contact-item"
              >
                <div style={styles.cicon}>{item.icon}</div>
                <div>
                  <strong style={styles.cdetailStrong}>{item.label}</strong>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={styles.cdetailA}
                      onMouseEnter={(e) => (e.target.style.color = "#f5a623")}
                      onMouseLeave={(e) => (e.target.style.color = "#fff")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span style={styles.cdetailA}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.cform} className="contact-form">
            <h3 style={styles.cformH3}>Send Us a Message</h3>
            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "2.5rem",
                  color: "#f5a623",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                  ✓
                </div>
                <p>Thank you! We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div style={styles.frow}>
                  <div style={styles.fgrp}>
                    <label style={styles.fgrpLabel}>Full Name</label>
                    <input
                      {...inputProps("Name", {
                        placeholder: "Your Name",
                        required: true,
                      })}
                    />
                  </div>
                  <div style={styles.fgrp}>
                    <label style={styles.fgrpLabel}>Phone Number</label>
                    <input
                      {...inputProps("Phone", {
                        placeholder: "+91 XXXXX XXXXX",
                        required: true,
                      })}
                    />
                  </div>
                </div>
                <div style={styles.fgrp}>
                  <label style={styles.fgrpLabel}>Email Address</label>
                  <input
                    {...inputProps("Email", {
                      type: "email",
                      placeholder: "your@email.com",
                      required: true,
                    })}
                  />
                </div>
                <div style={styles.fgrp}>
                  <label style={styles.fgrpLabel}>Project Type</label>
                  <select
                    {...inputProps("ProjectType", {
                      required: true,
                      style: { ...styles.fgrpInput, appearance: "none" },
                    })}
                  >
                    <option value="">Select Project Type</option>
                    {[
                      "Residential Construction",
                      "Commercial Construction",
                      "Renovation",
                      "Interior Design",
                      "Infrastructure Project",
                    ].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.fgrp}>
                  <label style={styles.fgrpLabel}>Project Location</label>
                  <input
                    {...inputProps("Location", {
                      placeholder: "Enter Project Location",
                    })}
                  />
                </div>
                <div style={styles.fgrp}>
                  <label style={styles.fgrpLabel}>Estimated Budget</label>
                  <select
                    {...inputProps("Budget", {
                      style: { ...styles.fgrpInput, appearance: "none" },
                    })}
                  >
                    <option value="">Select Budget</option>
                    {[
                      "Below ₹10 Lakhs",
                      "₹10 - ₹25 Lakhs",
                      "₹25 - ₹50 Lakhs",
                      "₹50 Lakhs - ₹1 Crore",
                      "Above ₹1 Crore",
                    ].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div style={styles.fgrp}>
                  <label style={styles.fgrpLabel}>Message</label>
                  <textarea
                    {...inputProps("Message", {
                      placeholder: "Tell us about your project requirements...",
                      rows: 6,
                      required: true,
                      style: {
                        ...styles.fgrpInput,
                        resize: "vertical",
                        minHeight: 100,
                      },
                    })}
                  />
                </div>
                <button
                  type="submit"
                  style={styles.fsubBtn}
                  onMouseEnter={(e) => (e.target.style.background = "#ffc145")}
                  onMouseLeave={(e) => (e.target.style.background = "#f5a623")}
                >
                  Request Free Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Lightbox({ styles, item, onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <div style={styles.lightbox} onClick={onClose}>
      <button style={styles.lbClose} onClick={onClose}>
        ✕
      </button>
      <img
        src={item.img}
        alt={item.desc}
        style={styles.lbImg}
        onClick={(event) => event.stopPropagation()}
      />
      <div style={styles.lbCaption}>
        {item.site} — {item.desc}
      </div>
    </div>
  );
}
