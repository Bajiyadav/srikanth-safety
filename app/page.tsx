"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   Tiny hook: intersection observer for scroll-in
────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────
   Animated counter
────────────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref} className="counter-value">
      {count}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Blinking live badge
────────────────────────────────────────────── */
function LiveBadge() {
  return (
    <span className="live-badge">
      <span className="blink-dot" />
      LIVE CLASSES
    </span>
  );
}

/* ─────────────────────────────────────────────
   Floating particles background
────────────────────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 6,
  }));
  return (
    <div className="particles-wrap" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Course card
────────────────────────────────────────────── */
const courseData = [
  {
    icon: "🛢️",
    title: "Petroleum Safety",
    desc: "Industry-focused petroleum and oil & gas safety training with real-world scenarios.",
    tag: "Core",
    color: "#f59e0b",
  },
  {
    icon: "🏭",
    title: "Industrial Safety",
    desc: "Learn workplace safety standards, hazard identification, and procedures.",
    tag: "Core",
    color: "#3b82f6",
  },
  {
    icon: "🌿",
    title: "HSE Training",
    desc: "Health, Safety and Environment professional training for modern industries.",
    tag: "Popular",
    color: "#10b981",
  },
  {
    icon: "📋",
    title: "NEBOSH Preparation",
    desc: "Structured guidance and mock tests for NEBOSH international certification.",
    tag: "Certification",
    color: "#8b5cf6",
  },
  {
    icon: "🏅",
    title: "IOSH Training",
    desc: "Professional IOSH safety course preparation with expert mentoring.",
    tag: "Certification",
    color: "#ec4899",
  },
  {
    icon: "💼",
    title: "Interview Prep",
    desc: "Mock interviews, resume review, and complete career guidance support.",
    tag: "Career",
    color: "#f97316",
  },
];

function CourseCard({
  course,
  index,
}: {
  course: (typeof courseData)[0];
  index: number;
}) {
  const { ref, visible } = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      className={`course-card ${visible ? "card-visible" : "card-hidden"}`}
      style={{ transitionDelay: `${index * 90}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="card-glow"
        style={{ background: course.color, opacity: hovered ? 0.18 : 0 }}
      />
      <div className="card-top-border" style={{ background: course.color }} />
      <div className="card-icon" style={{ background: `${course.color}22` }}>
        <span>{course.icon}</span>
      </div>
      <span className="card-tag" style={{ color: course.color, borderColor: `${course.color}55`, background: `${course.color}18` }}>
        {course.tag}
      </span>
      <h3 className="card-title">{course.title}</h3>
      <p className="card-desc">{course.desc}</p>
      <a
        href="https://wa.me/917569657763"
        target="_blank"
        rel="noopener noreferrer"
        className="card-cta"
        style={{ color: course.color, borderColor: `${course.color}44` }}
      >
        Enroll Now →
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stat card
────────────────────────────────────────────── */
const stats = [
  { value: 10, suffix: "+", label: "Years Experience", icon: "⭐" },
  { value: 500, suffix: "+", label: "Students Guided", icon: "🎓" },
  { value: 100, suffix: "%", label: "Career Support", icon: "💼" },
];

function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`stat-card ${visible ? "card-visible" : "card-hidden"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-number">
        <Counter target={stat.value} suffix={stat.suffix} />
      </div>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-line" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Testimonial cards
────────────────────────────────────────────── */
const testimonials = [
  {
    name: "Ravi Kumar",
    role: "Safety Officer, ONGC",
    text: "Srikanth Sir's NEBOSH coaching was top-notch. I cleared my exam in the first attempt!",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "HSE Engineer, Reliance",
    text: "The mock interviews completely transformed my confidence. I landed my dream job within a month.",
    stars: 5,
  },
  {
    name: "Mohammed Arif",
    role: "Safety Supervisor, ADNOC",
    text: "Best petroleum safety training in Andhra Pradesh. Practical knowledge with real-world examples.",
    stars: 5,
  },
];

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0];
  index: number;
}) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`testimonial-card ${visible ? "card-visible" : "card-hidden"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="stars">{"★".repeat(t.stars)}</div>
      <p className="testimonial-text">"{t.text}"</p>
      <div className="testimonial-author">
        <div className="author-avatar">{t.name[0]}</div>
        <div>
          <p className="author-name">{t.name}</p>
          <p className="author-role">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Navbar
────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["home", "courses", "about", "testimonials", "contact"];
  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="brand-dot" />
          <span className="brand-text">Srikanth Lecture for Safety</span>
        </div>

        {/* Desktop links */}
        <div className="navbar-links">
          {links.map((l) => (
            <a key={l} href={`#${l}`} className="nav-link">
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          ))}
          <a
            href="https://wa.me/917569657763"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-whatsapp"
          >
            <span className="blink-dot blink-green" />
            WhatsApp
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`ham-line ${menuOpen ? "ham-open-1" : ""}`} />
          <span className={`ham-line ${menuOpen ? "ham-open-2" : ""}`} />
          <span className={`ham-line ${menuOpen ? "ham-open-3" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        {links.map((l) => (
          <a
            key={l}
            href={`#${l}`}
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </a>
        ))}
        <a
          href="https://wa.me/917569657763"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-link mobile-wa"
          onClick={() => setMenuOpen(false)}
        >
          WhatsApp Us
        </a>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <style>{`
        /* ── Reset & Base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050508; color: #e2e8f0; font-family: 'Segoe UI', system-ui, sans-serif; overflow-x: hidden; }

        /* ── CSS Variables ── */
        :root {
          --blue: #2563eb;
          --blue-light: #3b82f6;
          --gold: #f59e0b;
          --surface: #0d0d18;
          --surface2: #131320;
          --border: rgba(255,255,255,0.07);
          --text-muted: #94a3b8;
          --transition: all 0.45s cubic-bezier(0.23, 1, 0.32, 1);
        }

        /* ── Particles ── */
        .particles-wrap { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.55);
          animation: floatParticle linear infinite;
        }
        @keyframes floatParticle {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-120px) scale(1.4); opacity: 0; }
        }

        /* ── Navbar ── */
        .navbar {
          position: sticky; top: 0; z-index: 100;
          background: rgba(5, 5, 8, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid transparent;
          transition: var(--transition);
        }
        .navbar-scrolled {
          background: rgba(5, 5, 8, 0.92);
          border-bottom-color: var(--border);
          box-shadow: 0 4px 40px rgba(0,0,0,0.5);
        }
        .navbar-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 0 2rem;
          height: 70px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .navbar-brand { display: flex; align-items: center; gap: 10px; }
        .brand-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--blue-light);
          box-shadow: 0 0 10px var(--blue-light);
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 6px var(--blue-light); }
          50%       { box-shadow: 0 0 20px var(--blue-light), 0 0 40px rgba(59,130,246,0.4); }
        }
        .brand-text { font-size: 1.1rem; font-weight: 700; letter-spacing: -0.01em; }
        .navbar-links { display: flex; align-items: center; gap: 2rem; }
        .nav-link {
          color: var(--text-muted); text-decoration: none; font-size: 0.9rem;
          position: relative; transition: color 0.3s;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 1px; background: var(--blue-light);
          transform: scaleX(0); transition: transform 0.3s ease;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-whatsapp {
          display: flex; align-items: center; gap: 7px;
          color: #fff; text-decoration: none; font-size: 0.9rem; font-weight: 600;
          background: #16a34a22;
          border: 1px solid #16a34a55;
          padding: 0.45rem 1rem; border-radius: 99px;
          transition: var(--transition);
        }
        .nav-whatsapp:hover { background: #16a34a44; border-color: #16a34a; box-shadow: 0 0 20px #16a34a44; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .ham-line { width: 24px; height: 2px; background: #e2e8f0; border-radius: 2px; transition: var(--transition); }
        .ham-open-1 { transform: rotate(45deg) translate(5px, 5px); }
        .ham-open-2 { opacity: 0; }
        .ham-open-3 { transform: rotate(-45deg) translate(5px, -5px); }
        .mobile-menu {
          display: none; flex-direction: column;
          background: var(--surface); border-top: 1px solid var(--border);
          overflow: hidden; max-height: 0; transition: max-height 0.4s ease;
        }
        .mobile-menu-open { max-height: 400px; }
        .mobile-link {
          padding: 1rem 2rem; color: var(--text-muted); text-decoration: none;
          font-size: 1rem; border-bottom: 1px solid var(--border);
          transition: background 0.2s, color 0.2s;
        }
        .mobile-link:hover { background: rgba(255,255,255,0.04); color: #fff; }
        .mobile-wa { color: #4ade80; font-weight: 600; }
        @media (max-width: 768px) {
          .navbar-links { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: flex; }
        }

        /* ── Blinking elements ── */
        .live-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #f87171; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.12em;
          padding: 0.35rem 0.85rem; border-radius: 99px;
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.0); }
          50%       { box-shadow: 0 0 14px rgba(239,68,68,0.4); }
        }
        .blink-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ef4444;
          animation: blink 1.2s ease-in-out infinite;
        }
        .blink-green { background: #22c55e; animation: blinkGreen 1.2s ease-in-out infinite; }
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
          50%       { opacity: 0.6; transform: scale(1.3); box-shadow: 0 0 0 5px rgba(239,68,68,0); }
        }
        @keyframes blinkGreen {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,197,94,0.7); }
          50%       { opacity: 0.6; box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }

        /* ── Hero Section ── */
        .hero-section {
          position: relative; overflow: hidden;
          min-height: 92vh; display: flex; align-items: center;
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(37,99,235,0.18) 0%, transparent 65%),
                      linear-gradient(180deg, #050508 0%, #080812 100%);
        }
        .hero-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 80%);
        }
        .hero-content {
          max-width: 1200px; margin: 0 auto; padding: 6rem 2rem;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
          position: relative; z-index: 1;
          width: 100%;
        }
        @media (max-width: 900px) {
          .hero-content { grid-template-columns: 1fr; text-align: center; gap: 2.5rem; }
          .hero-btns { justify-content: center; }
        }
        .hero-eyebrow {
          display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        .hero-eyebrow-text {
          font-size: 0.8rem; font-weight: 600; letter-spacing: 0.14em;
          color: var(--blue-light);
          text-transform: uppercase;
        }
        .hero-h1 {
          font-size: clamp(2.8rem, 6vw, 4.8rem);
          font-weight: 800; line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 1.4rem;
          animation: fadeUp 0.8s ease both;
        }
        .hero-h1 .accent {
          background: linear-gradient(135deg, var(--blue-light), #a78bfa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: 1.15rem; color: var(--text-muted); line-height: 1.7;
          margin-bottom: 2.5rem; max-width: 500px;
          animation: fadeUp 0.8s 0.15s ease both;
        }
        .hero-btns {
          display: flex; gap: 1rem; flex-wrap: wrap;
          animation: fadeUp 0.8s 0.28s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--blue); color: #fff; font-weight: 600; font-size: 0.95rem;
          padding: 0.85rem 1.8rem; border-radius: 12px; text-decoration: none;
          border: none; cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 4px 24px rgba(37,99,235,0.45);
          position: relative; overflow: hidden;
        }
        .btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.12) 100%);
          transform: translateX(-100%); transition: transform 0.5s ease;
        }
        .btn-primary:hover::before { transform: translateX(0); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(37,99,235,0.6); }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid var(--border); background: rgba(255,255,255,0.04);
          color: #e2e8f0; font-weight: 600; font-size: 0.95rem;
          padding: 0.85rem 1.8rem; border-radius: 12px; text-decoration: none;
          cursor: pointer; transition: var(--transition);
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18);
          transform: translateY(-2px);
        }

        /* ── Profile image frame ── */
        .profile-wrap {
          display: flex; justify-content: center; align-items: center;
          position: relative;
          animation: fadeUp 0.9s 0.1s ease both;
        }
        .profile-ring {
          position: absolute;
          border-radius: 50%; border: 1px solid rgba(59,130,246,0.25);
          animation: spinRing linear infinite;
        }
        .ring-1 { width: 440px; height: 440px; animation-duration: 18s; }
        .ring-2 { width: 380px; height: 380px; animation-duration: 12s; animation-direction: reverse; }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ring-1::after, .ring-2::after {
          content: ''; position: absolute; width: 8px; height: 8px;
          background: var(--blue-light); border-radius: 50%;
          top: 50%; right: -4px; transform: translateY(-50%);
          box-shadow: 0 0 14px var(--blue-light);
        }
        .ring-2::after { bottom: -4px; top: auto; right: 50%; }
        .profile-img-frame {
          position: relative; z-index: 2;
          border-radius: 28px; overflow: hidden;
          border: 1px solid rgba(59,130,246,0.2);
          box-shadow: 0 0 60px rgba(37,99,235,0.22), 0 30px 80px rgba(0,0,0,0.6);
          transition: var(--transition);
        }
        .profile-img-frame:hover { transform: scale(1.02); box-shadow: 0 0 80px rgba(37,99,235,0.35), 0 40px 100px rgba(0,0,0,0.7); }
        .profile-badge {
          position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
          background: rgba(5,5,8,0.85); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.6rem 1.3rem; border-radius: 50px; z-index: 3;
          display: flex; align-items: center; gap: 8px;
          white-space: nowrap; font-size: 0.85rem; font-weight: 600;
        }
        .profile-badge-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; animation: blink 1.5s infinite; }

        /* ── Section wrapper ── */
        .section {
          max-width: 1200px; margin: 0 auto; padding: 5rem 2rem;
        }
        .section-label {
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.18em;
          color: var(--blue-light); text-transform: uppercase; margin-bottom: 0.8rem;
          display: flex; align-items: center; gap: 8px;
        }
        .section-label::before { content: ''; width: 24px; height: 2px; background: var(--blue-light); border-radius: 2px; }
        .section-title {
          font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; line-height: 1.1;
          letter-spacing: -0.025em; color: #fff; margin-bottom: 1rem;
        }
        .section-sub { color: var(--text-muted); font-size: 1.05rem; line-height: 1.7; max-width: 600px; }

        /* ── Divider line ── */
        .divider { border: none; border-top: 1px solid var(--border); }

        /* ── Courses Section ── */
        .courses-section { background: var(--surface); }
        .courses-inner { max-width: 1200px; margin: 0 auto; padding: 5rem 2rem; }
        .courses-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.4rem; margin-top: 3.5rem;
        }

        /* ── Course Card ── */
        .course-card {
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 20px; padding: 1.8rem;
          position: relative; overflow: hidden;
          transition: var(--transition);
          cursor: default;
        }
        .course-card:hover {
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .card-hidden { opacity: 0; transform: translateY(36px); }
        .card-visible { opacity: 1; transform: translateY(0); transition: var(--transition); }
        .card-glow {
          position: absolute; inset: -40px; border-radius: 50%;
          filter: blur(60px); pointer-events: none; transition: opacity 0.5s ease;
        }
        .card-top-border {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          border-radius: 20px 20px 0 0;
        }
        .card-icon {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; margin-bottom: 1rem;
          position: relative; z-index: 1;
        }
        .card-tag {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
          border: 1px solid; padding: 0.25rem 0.65rem; border-radius: 99px;
          display: inline-block; margin-bottom: 0.8rem;
          position: relative; z-index: 1;
        }
        .card-title {
          font-size: 1.2rem; font-weight: 700; color: #fff;
          margin-bottom: 0.6rem; position: relative; z-index: 1;
        }
        .card-desc {
          font-size: 0.9rem; color: var(--text-muted); line-height: 1.65;
          margin-bottom: 1.4rem; position: relative; z-index: 1;
        }
        .card-cta {
          font-size: 0.85rem; font-weight: 600; text-decoration: none;
          border: 1px solid; padding: 0.45rem 1rem; border-radius: 8px;
          display: inline-block; transition: var(--transition);
          position: relative; z-index: 1;
        }
        .card-cta:hover { background: rgba(255,255,255,0.05); transform: translateX(4px); }

        /* ── Stats Section ── */
        .stats-section {
          background: linear-gradient(135deg, #060611 0%, #0a0a1a 100%);
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          padding: 4rem 0;
        }
        .stats-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 2rem;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem; align-items: stretch;
        }
        .live-stat-wrap {
          background: var(--surface2); border: 1px solid #16a34a33;
          border-radius: 20px; padding: 2rem;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.5rem; text-align: center;
          box-shadow: 0 0 30px rgba(22,163,74,0.1);
        }
        .stat-card {
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 20px; padding: 2rem;
          text-align: center;
          transition: var(--transition);
        }
        .stat-card:hover { border-color: var(--blue-light); box-shadow: 0 0 30px rgba(59,130,246,0.15); transform: translateY(-4px); }
        .stat-icon { font-size: 2rem; margin-bottom: 0.6rem; }
        .stat-number { font-size: 2.8rem; font-weight: 800; color: var(--blue-light); }
        .counter-value { font-variant-numeric: tabular-nums; }
        .stat-label { font-size: 0.9rem; color: var(--text-muted); margin-top: 0.3rem; }
        .stat-line { width: 40px; height: 3px; background: linear-gradient(90deg, var(--blue), transparent); border-radius: 2px; margin: 1rem auto 0; }

        /* ── About Section ── */
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
          margin-top: 0;
        }
        @media (max-width: 800px) { .about-grid { grid-template-columns: 1fr; } }
        .about-img-wrap {
          position: relative; border-radius: 24px; overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }
        .about-img-wrap:hover img { transform: scale(1.04); }
        .about-img-wrap img { transition: transform 0.6s ease; display: block; width: 100%; height: auto; }
        .about-tag-overlay {
          position: absolute; top: 20px; left: 20px;
          background: rgba(5,5,8,0.8); backdrop-filter: blur(10px);
          border: 1px solid var(--border);
          padding: 0.5rem 1rem; border-radius: 10px;
          font-size: 0.82rem; font-weight: 600; color: var(--gold);
        }
        .about-text p { color: var(--text-muted); line-height: 1.8; margin-bottom: 1.2rem; font-size: 1rem; }
        .feature-list { list-style: none; display: flex; flex-direction: column; gap: 0.85rem; margin-top: 1.5rem; }
        .feature-item {
          display: flex; align-items: flex-start; gap: 12px;
          background: var(--surface2); border: 1px solid var(--border);
          padding: 1rem 1.2rem; border-radius: 12px;
          transition: var(--transition);
        }
        .feature-item:hover { border-color: rgba(59,130,246,0.3); background: rgba(59,130,246,0.04); }
        .feature-check {
          width: 22px; height: 22px; border-radius: 50%;
          background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          font-size: 0.75rem; color: #4ade80; margin-top: 1px;
        }
        .feature-text { font-size: 0.9rem; color: #cbd5e1; line-height: 1.5; }
        .feature-text strong { color: #fff; font-weight: 600; }

        /* ── Testimonials ── */
        .testimonials-section { background: var(--surface); }
        .testimonials-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.4rem; margin-top: 3.5rem;
        }
        .testimonial-card {
          background: var(--surface2); border: 1px solid var(--border);
          border-radius: 20px; padding: 1.8rem;
          transition: var(--transition);
        }
        .testimonial-card:hover { border-color: rgba(245,158,11,0.3); transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
        .stars { color: var(--gold); font-size: 1.05rem; margin-bottom: 1rem; letter-spacing: 2px; }
        .testimonial-text { color: #cbd5e1; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.4rem; }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .author-avatar {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--blue), #7c3aed);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 1rem; color: #fff;
        }
        .author-name { font-weight: 600; font-size: 0.9rem; color: #e2e8f0; margin-bottom: 2px; }
        .author-role { font-size: 0.78rem; color: var(--text-muted); }

        /* ── Footer / Contact ── */
        .footer {
          background: #030306; border-top: 1px solid var(--border);
          padding: 5rem 0 2rem;
        }
        .footer-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 2rem;
          display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem;
        }
        @media (max-width: 700px) { .footer-inner { grid-template-columns: 1fr; gap: 2rem; } }
        .footer-brand-title { font-size: 1.3rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
        .footer-brand-sub { color: var(--text-muted); font-size: 0.9rem; line-height: 1.7; max-width: 320px; margin-bottom: 1.5rem; }
        .footer-contact-item {
          display: flex; align-items: center; gap: 10px;
          color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.7rem;
        }
        .footer-contact-item a { color: #93c5fd; text-decoration: none; transition: color 0.2s; }
        .footer-contact-item a:hover { color: var(--blue-light); }
        .footer-icon { font-size: 1rem; }
        .footer-col-title { font-size: 0.85rem; font-weight: 700; color: #fff; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1.2rem; }
        .footer-link { display: block; color: var(--text-muted); font-size: 0.9rem; text-decoration: none; margin-bottom: 0.65rem; transition: color 0.2s; }
        .footer-link:hover { color: var(--blue-light); }
        .footer-bottom {
          max-width: 1200px; margin: 3rem auto 0;
          padding: 1.5rem 2rem 0;
          border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
        }
        .footer-copy { color: var(--text-muted); font-size: 0.82rem; }

        /* ── CTA Banner ── */
        .cta-banner {
          background: linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2));
          border: 1px solid rgba(59,130,246,0.25);
          border-radius: 24px; padding: 3rem; text-align: center;
          position: relative; overflow: hidden;
          margin: 2rem 0;
        }
        .cta-banner::before {
          content: ''; position: absolute; inset: -100px;
          background: radial-gradient(circle, rgba(37,99,235,0.12), transparent 60%);
          animation: rotateCta 12s linear infinite;
        }
        @keyframes rotateCta {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .cta-banner h3 { font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; color: #fff; margin-bottom: 0.8rem; position: relative; z-index: 1; }
        .cta-banner p { color: var(--text-muted); margin-bottom: 2rem; position: relative; z-index: 1; }
        .cta-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

        /* ── WhatsApp floating ── */
        .wa-float {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          width: 58px; height: 58px; border-radius: 50%;
          background: #16a34a; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; text-decoration: none;
          box-shadow: 0 4px 20px rgba(22,163,74,0.5);
          transition: var(--transition);
          animation: floatBtn 3s ease-in-out infinite;
        }
        .wa-float:hover { transform: scale(1.12); box-shadow: 0 8px 32px rgba(22,163,74,0.7); }
        @keyframes floatBtn {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        .wa-pulse {
          position: absolute; inset: -6px; border-radius: 50%;
          border: 2px solid rgba(22,163,74,0.5);
          animation: waPulse 2s ease-out infinite;
        }
        @keyframes waPulse {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }

        /* ── Scroll top ── */
        .scroll-top {
          position: fixed; bottom: 100px; right: 30px; z-index: 998;
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: 1px solid var(--border);
          color: #fff; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; text-decoration: none;
          transition: var(--transition); backdrop-filter: blur(10px);
        }
        .scroll-top:hover { background: rgba(255,255,255,0.15); }
      `}</style>

      {/* WhatsApp Float */}
      <a href="https://wa.me/917569657763" target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp">
        <span className="wa-pulse" />
        💬
      </a>

      {/* Scroll to top */}
      <a href="#home" className="scroll-top" aria-label="Scroll to top">↑</a>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero ── */}
      <section id="home" className="hero-section">
        <div className="hero-grid" />
        <Particles />
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow">
              <LiveBadge />
              <span className="hero-eyebrow-text">Petroleum & Industrial Safety</span>
            </div>
            <h1 className="hero-h1">
              Build Your Career<br />
              in <span className="accent">Safety</span> with<br />
              Srikanth Sir
            </h1>
            <p className="hero-sub">
              Industry-expert coaching for Petroleum, Oil & Gas, HSE and
              Industrial Safety — with live classes, mock interviews, and 100% career support.
            </p>
            <div className="hero-btns">
              <a href="#courses" className="btn-primary">
                🎓 View Courses
              </a>
              <a
                href="https://wa.me/917569657763"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          <div className="profile-wrap">
            <div className="profile-ring ring-1" />
            <div className="profile-ring ring-2" />
            <div className="profile-img-frame">
              <Image
                src="/image/srikanth-profile.jpg"
                alt="Srikanth Sir"
                width={420}
                height={500}
                className="profile-img"
                priority
                style={{ display: "block" }}
              />
              <div className="profile-badge">
                <span className="profile-badge-dot" />
                Available for New Batch
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="stats-section">
        <div className="stats-inner">
          {stats.map((s, i) => (
            <StatCard key={i} stat={s} index={i} />
          ))}
          <div className="live-stat-wrap">
            <div style={{ fontSize: "2rem" }}>🎥</div>
            <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#4ade80" }}>
              Live
            </div>
            <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Online Classes</div>
            <div style={{ marginTop: "0.5rem" }}>
              <LiveBadge />
            </div>
          </div>
        </div>
      </div>

      {/* ── Courses ── */}
      <div id="courses" className="courses-section">
        <div className="courses-inner">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">Courses Designed for Your Success</h2>
          <p className="section-sub">
            Practical, industry-aligned training programs that help you get certified and placed — fast.
          </p>
          <div className="courses-grid">
            {courseData.map((c, i) => (
              <CourseCard key={i} course={c} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── About ── */}
      <section id="about">
        <div className="section">
          <div className="about-grid">
            <div className="about-img-wrap">
              <Image
                src="/image/srikanth-profile.jpg"
                alt="Srikanth Sir teaching"
                width={560}
                height={620}
                style={{ width: "100%", height: "auto" }}
              />
              <div className="about-tag-overlay">⭐ Top Safety Educator</div>
            </div>
            <div className="about-text">
              <div className="section-label">About the Mentor</div>
              <h2 className="section-title" style={{ fontSize: "2.2rem" }}>
                Why Learn from Srikanth Sir?
              </h2>
              <p>
                With over 10 years of hands-on experience in petroleum and industrial safety,
                Srikanth Sir brings real-world insights into every session.
              </p>
              <p>
                His structured approach combines theoretical foundations with practical
                industry scenarios, ensuring students are truly job-ready.
              </p>
              <ul className="feature-list">
                {[
                  ["Live Interactive Classes", "Doubt clearing & real-time Q&A every session"],
                  ["NEBOSH & IOSH Certified Guidance", "Expert preparation for internationally recognised exams"],
                  ["Mock Interview Practice", "Industry-specific role-play interviews & feedback"],
                  ["Placement Assistance", "Resume review, LinkedIn optimisation & job referrals"],
                ].map(([title, sub], i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-check">✓</span>
                    <span className="feature-text">
                      <strong>{title}</strong> — {sub}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <div id="testimonials" className="testimonials-section">
        <div className="courses-inner">
          <div className="section-label">Student Reviews</div>
          <h2 className="section-title">What Our Students Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <div className="section">
        <div className="cta-banner">
          <h3>Ready to Start Your Safety Career?</h3>
          <p>Join the next batch and get industry-ready with expert guidance from Srikanth Sir.</p>
          <div className="cta-btns">
            <a
              href="https://wa.me/917569657763"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              💬 Join Next Batch on WhatsApp
            </a>
            <a href="#courses" className="btn-secondary">
              🎓 Explore Courses
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-brand-title">Srikanth Lecture for Safety</div>
            <p className="footer-brand-sub">
              Professional Petroleum & Industrial Safety Training. Empowering safety professionals
              across India and the Gulf.
            </p>
            <div>
              <div className="footer-contact-item">
                <span className="footer-icon">📱</span>
                <a href="https://wa.me/917569657763" target="_blank" rel="noopener noreferrer">
                  +91 75696 57763
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">✉️</span>
                <a href="mailto:bajibaddela@gmail.com">bajibaddela@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">📍</span>
                <span>Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          <div>
            <p className="footer-col-title">Navigation</p>
            {["home", "courses", "about", "testimonials", "contact"].map((l) => (
              <a key={l} href={`#${l}`} className="footer-link">
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </a>
            ))}
          </div>

          <div>
            <p className="footer-col-title">Courses</p>
            {courseData.map((c) => (
              <a key={c.title} href="#courses" className="footer-link">
                {c.title}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Srikanth Lecture for Safety. All Rights Reserved.</p>
          <p className="footer-copy" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="blink-dot blink-green" style={{ display: "inline-block" }} />
            Accepting new students
          </p>
        </div>
      </footer>
    </>
  );
}

