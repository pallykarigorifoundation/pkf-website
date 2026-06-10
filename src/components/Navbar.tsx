import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "./AuthModal";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { user, logout } = useAuth();

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(navRef.current, { y: -80, opacity: 0, duration: 0.7, clearProps: "all" })
        .from(".nb-brand",      { opacity: 0, x: -16, duration: 0.5, clearProps: "all" }, "-=0.3")
        .from(".nb-link",       { opacity: 0, y: -8, duration: 0.4, stagger: 0.07, clearProps: "all" }, "-=0.3")
        .from(".nb-action",     { opacity: 0, x: 16, duration: 0.5, clearProps: "all" }, "-=0.4");
    }, navRef);
    return () => ctx.revert();
  }, []);

  /* ── mobile menu body lock + animation ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const ctx = gsap.context(() => {
        gsap.timeline()
          .fromTo(".mob-link",   { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power3.out", delay: 0.15 })
          .fromTo(".mob-action", { y: 16,  opacity: 0 }, { y: 0,  opacity: 1, duration: 0.4,  stagger: 0.07, ease: "power2.out" }, "-=0.2");
      }, navRef);
      return () => ctx.revert();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lng: string) => { i18n.changeLanguage(lng); setMenuOpen(false); };
  const isHome = location.pathname === "/";
  const isLight = !scrolled && isHome && !menuOpen;   // transparent hero zone

  const links = [
    { id: "about",   label: t("nav.about"),   path: "/#about" },
    { id: "courses", label: t("nav.courses"), path: "/courses" },
    { id: "centers", label: t("nav.centers"), path: "/#centers" },
    { id: "impact",  label: t("nav.impact"),  path: "/#impact" },
    { id: "contact", label: t("nav.contact"), path: "/#contact" },
  ];

  return (
    <>
      {/* ────────────────────────────────────────────────
          NAV SHELL
      ──────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500
          ${scrolled || !isHome
            ? "bg-cream dark:bg-zinc-950 shadow-sm border-b border-black/[0.06] dark:border-white/[0.06] py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="w-full px-8 lg:px-16 grid grid-cols-[auto_1fr_auto] items-center gap-6">

          {/* ── BRAND ── */}
          <Link
            to="/"
            className={`nb-brand flex items-center gap-2.5 flex-shrink-0 transition-opacity duration-300 ${menuOpen ? "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto" : "opacity-100"}`}
          >
            <img src="/single.png" alt={t("nav.logo_alt")} className="h-8 lg:h-9 w-auto object-contain" />
            <div className="hidden sm:flex flex-col leading-[1.15]">
              <span className={`font-display font-bold text-[0.8rem] tracking-[0.12em] uppercase transition-colors ${isLight ? "text-white" : "text-olive dark:text-lime-light"}`}>
                {t("nav.name_part1")}
              </span>
              <span className={`font-display font-bold text-[0.8rem] tracking-[0.12em] uppercase transition-colors ${isLight ? "text-lime-light" : "text-lime dark:text-lime"}`}>
                {t("nav.name_part2")}
              </span>
            </div>
          </Link>

          {/* ── DESKTOP LINKS ── */}
          <ul className="hidden lg:flex items-center justify-center gap-1 list-none">
            {links.map((l) => (
              <li key={l.id} className="nb-link">
                {l.path.startsWith("/#") ? (
                  <a
                    href={l.path}
                    className={`relative inline-flex items-center px-3.5 py-1.5 rounded-full text-[0.8rem] font-medium tracking-wide transition-all duration-200
                      hover:bg-lime/10 dark:hover:bg-lime/15 hover:text-lime dark:hover:text-lime-light
                      ${isLight ? "text-white/90" : "text-text-dark dark:text-white/80"}`}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    to={l.path}
                    className={`relative inline-flex items-center px-3.5 py-1.5 rounded-full text-[0.8rem] font-medium tracking-wide transition-all duration-200
                      hover:bg-lime/10 dark:hover:bg-lime/15 hover:text-lime dark:hover:text-lime-light
                      ${isLight ? "text-white/90" : "text-text-dark dark:text-white/80"}`}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* ── DESKTOP ACTIONS ── */}
          <div className="nb-action hidden lg:flex items-center gap-2">
            {/* Language */}
            <div className="relative flex items-center">
              <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className={`h-8 pl-3 pr-6 rounded-full text-[0.72rem] font-semibold tracking-widest uppercase cursor-pointer outline-none appearance-none transition-all
                  bg-transparent border border-transparent hover:border-white/20 dark:hover:border-white/20
                  ${isLight ? "text-white/80" : "text-text-muted dark:text-white/60"}
                  hover:text-lime dark:hover:text-lime`}
              >
                <option value="en" className="text-black bg-white">EN</option>
                <option value="hi" className="text-black bg-white">HI</option>
                <option value="bn" className="text-black bg-white">BN</option>
                <option value="ne" className="text-black bg-white">NE</option>
              </select>
              <svg className="absolute right-1.5 w-2.5 h-2.5 pointer-events-none text-current opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            <div className={`h-4 w-px ${isLight ? "bg-white/20" : "bg-black/15 dark:bg-white/15"}`} />

            <ThemeToggle isLight={isLight} />

            <div className={`h-4 w-px ${isLight ? "bg-white/20" : "bg-black/15 dark:bg-white/15"}`} />

            {/* Login / Logout */}
            {user ? (
              <button
                onClick={logout}
                className={`h-8 px-4 rounded-full text-[0.78rem] font-semibold tracking-wide transition-all duration-200 border
                  ${isLight
                    ? "border-white/30 text-white hover:bg-white hover:text-olive"
                    : "border-border-subtle text-text-dark dark:text-white dark:border-white/20 hover:border-lime hover:text-lime dark:hover:text-lime"
                  }`}
              >
                Log out
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className={`h-8 px-4 rounded-full text-[0.78rem] font-semibold tracking-wide transition-all duration-200 border
                  ${isLight
                    ? "border-white/30 text-white hover:bg-white hover:text-olive"
                    : "border-border-subtle text-text-dark dark:text-white dark:border-white/20 hover:border-lime hover:text-lime dark:hover:text-lime"
                  }`}
              >
                {t("nav.login")}
              </button>
            )}

            {/* Donate CTA */}
            <Link
              to="/donate"
              className="h-8 px-5 rounded-full bg-lime text-white text-[0.78rem] font-bold tracking-wide inline-flex items-center transition-all duration-200 hover:bg-olive hover:-translate-y-px shadow-lime shadow-sm"
            >
              {t("nav.donate")}
            </Link>
          </div>

          {/* ── MOBILE CONTROLS ── */}
          <div className="flex lg:hidden items-center gap-3 relative z-[1020]">
            <div className={`transition-opacity duration-300 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              <ThemeToggle isLight={isLight} />
            </div>
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((m) => !m)}
              aria-label="Toggle menu"
              className="relative w-9 h-9 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
            >
              <span className={`absolute block w-5 h-[1.5px] rounded-full transition-all duration-300 ${isLight || menuOpen ? "bg-white" : "bg-text-dark dark:bg-white"} ${menuOpen ? "rotate-45 translate-y-0" : "-translate-y-[5px]"}`} />
              <span className={`absolute block w-5 h-[1.5px] rounded-full transition-all duration-300 ${isLight || menuOpen ? "bg-white" : "bg-text-dark dark:bg-white"} ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute block w-5 h-[1.5px] rounded-full transition-all duration-300 ${isLight || menuOpen ? "bg-white" : "bg-text-dark dark:bg-white"} ${menuOpen ? "-rotate-45 translate-y-0" : "translate-y-[5px]"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ────────────────────────────────────────────────
          MOBILE DRAWER
      ──────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-[999] lg:hidden flex flex-col bg-olive dark:bg-zinc-950 transition-all duration-500 ease-in-out
          ${menuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-3"}`}
      >
        {/* Drawer header — keeps logo visible */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/10">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
            <img src="/single.png" alt={t("nav.logo_alt")} className="h-8 w-auto object-contain" />
            <div className="flex flex-col leading-[1.15]">
              <span className="font-display font-bold text-[0.8rem] tracking-[0.12em] uppercase text-white">{t("nav.name_part1")}</span>
              <span className="font-display font-bold text-[0.8rem] tracking-[0.12em] uppercase text-lime-light">{t("nav.name_part2")}</span>
            </div>
          </Link>
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13" /><line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1">
          {links.map((l) => (
            <div key={l.id} className="mob-link">
              {l.path.startsWith("/#") ? (
                <a
                  href={l.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-white/8 text-2xl font-display font-bold text-white hover:text-lime-light transition-colors group"
                >
                  {l.label}
                  <span className="text-white/30 group-hover:text-lime-light transition-colors text-lg">→</span>
                </a>
              ) : (
                <Link
                  to={l.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-white/8 text-2xl font-display font-bold text-white hover:text-lime-light transition-colors group"
                >
                  {l.label}
                  <span className="text-white/30 group-hover:text-lime-light transition-colors text-lg">→</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Drawer footer actions */}
        <div className="px-6 pb-8 pt-4 border-t border-white/10 flex flex-col gap-4">
          {/* Language */}
          <div className="mob-action relative">
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl bg-white/5 border border-white/15 text-white text-sm font-semibold tracking-wide cursor-pointer outline-none appearance-none transition hover:border-lime"
            >
              <option value="en" className="text-black bg-white">English</option>
              <option value="hi" className="text-black bg-white">हिन्दी</option>
              <option value="bn" className="text-black bg-white">বাংলা</option>
              <option value="ne" className="text-black bg-white">नेपाली</option>
            </select>
            <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <div className="mob-action flex gap-3">
            {user ? (
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="flex-1 h-12 rounded-xl border border-white/20 text-white text-sm font-bold tracking-wide transition hover:border-lime hover:text-lime"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={() => { setAuthOpen(true); setMenuOpen(false); }}
                className="flex-1 h-12 rounded-xl border border-white/20 text-white text-sm font-bold tracking-wide transition hover:border-lime hover:text-lime"
              >
                {t("nav.login")}
              </button>
            )}
            <Link
              to="/donate"
              onClick={() => setMenuOpen(false)}
              className="flex-1 h-12 rounded-xl bg-lime text-white text-sm font-bold tracking-wide inline-flex items-center justify-center transition hover:bg-lime-bright shadow-lime shadow-sm"
            >
              {t("nav.donate")}
            </Link>
          </div>
        </div>
      </div>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
