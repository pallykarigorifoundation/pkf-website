import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6, clearProps: "all" })
        .from(".hero-title", { y: 40, opacity: 0, duration: 0.7, clearProps: "all" }, "-=0.3")
        .from(".hero-tagline", { y: 30, opacity: 0, duration: 0.6, clearProps: "all" }, "-=0.4")
        .from(".hero-btn", { y: 20, opacity: 0, duration: 0.5, stagger: 0.15, clearProps: "all" }, "-=0.3")
        .from(".hero-badge", { y: 20, opacity: 0, duration: 0.5, stagger: 0.12, clearProps: "all" }, "-=0.3")
        .from(".hero-visual", { x: 40, opacity: 0, duration: 0.8, clearProps: "all" }, "-=0.8");

      gsap.to(".hero-col-left", {
        y: -12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-col-right", {
        y: 12,
        duration: 3.5,
        delay: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden"
    >
      {/* ─── BACKGROUND VIDEO (desktop only) ─── */}
      <div className="absolute inset-0 hidden lg:block z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/videos/hero-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay — left side stronger so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        {/* Bottom fade for smooth section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream/20 dark:from-black to-transparent" />
      </div>

      {/* ─── MOBILE BACKGROUND IMAGE (hidden on desktop) ─── */}
      <div className="absolute inset-0 lg:hidden z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/mb.jpg")' }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Bottom fade for smooth section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream/20 dark:from-black to-transparent" />
      </div>

      {/* ─── MAIN CONTENT GRID ─── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 pt-28 lg:pt-36 pb-12 lg:pb-20 px-8 lg:px-16 w-full mx-auto min-h-screen">

        {/* LEFT — text content */}
        <div className="relative z-10">
          <div className="hero-eyebrow mb-6">
            <div className="flex gap-4 mb-6">
              <span className="text-[0.8rem] font-bold tracking-widest uppercase text-white cursor-default">
                {t("hero.mirik")}
              </span>
              <span className="text-white/40 font-light">•</span>
              <span className="text-[0.8rem] font-bold tracking-widest uppercase text-white cursor-default">
                {t("hero.plassey")}
              </span>
            </div>
          </div>

          <h1 className="hero-title font-display font-bold text-4xl sm:text-5xl lg:text-[60px] text-white leading-[1.2] lg:leading-[1.3] mb-6">
            {t("hero.title")}
            <br />
            <em className="font-display not-italic text-lime-light">
              {t("hero.skill_forum")}
            </em>
          </h1>

          <p className="hero-tagline text-base sm:text-lg lg:text-xl font-light text-white/90 leading-relaxed mb-10 max-w-xl">
            {t("hero.tagline")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#about"
              className="hero-btn group relative inline-flex items-center justify-center px-9 py-3.5 rounded-full bg-lime text-white font-semibold text-sm tracking-wide shadow-lime transition-all hover:bg-olive hover:shadow-lg-custom hover:-translate-y-0.5 hover:pr-12"
            >
              {t("hero.explore")}
              <span className="absolute right-5 opacity-0 -translate-x-2.5 transition-all group-hover:opacity-100 group-hover:translate-x-0 font-serif text-lg">
                →
              </span>
            </a>
            <Link
              to="/courses"
              className="hero-btn group relative inline-flex items-center justify-center px-9 py-3.5 rounded-full border-2 border-white text-white font-semibold text-sm tracking-wide transition-all hover:bg-lime hover:border-lime hover:text-white hover:-translate-y-0.5 hover:pr-12"
            >
              {t("hero.view_courses")}
              <span className="absolute right-5 opacity-0 -translate-x-2.5 transition-all group-hover:opacity-100 group-hover:translate-x-0 font-serif text-lg">
                →
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
            <div className="hero-badge flex flex-col gap-0.5">
              <span className="font-display text-3xl text-white leading-none">
                {t("hero.stats_courses")}
              </span>
              <span className="text-[0.72rem] font-medium tracking-widest uppercase text-white/60">
                {t("hero.courses")}
              </span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="hero-badge flex flex-col gap-0.5">
              <span className="font-display text-3xl text-white leading-none">
                {t("hero.stats_disciplines")}
              </span>
              <span className="text-[0.72rem] font-medium tracking-widest uppercase text-white/60">
                {t("hero.disciplines")}
              </span>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="hero-badge flex flex-col gap-0.5">
              <span className="font-display text-3xl text-white leading-none">
                {t("hero.stats_regions")}
              </span>
              <span className="text-[0.72rem] font-medium tracking-widest uppercase text-white/60">
                {t("hero.pilot_regions")}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT — photo grid (mobile & tablet only; hidden on desktop since video fills bg) */}
        <div className="hero-visual hidden md:flex lg:hidden relative z-10 justify-center h-[540px] py-4 overflow-hidden">
          <div className="grid grid-cols-[1.2fr_1fr] gap-3 w-full h-full">
            <div className="hero-col-left flex flex-col gap-3">
              <div className="flex-1 overflow-hidden rounded-2xl relative group">
                <img
                  src="/hero2.jpeg"
                  alt={t("hero.img_alt1")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-2xl relative group">
                <img
                  src="/hero1.jpg"
                  alt={t("hero.img_alt2")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="hero-col-right flex flex-col gap-3">
              <div className="flex-1 h-full overflow-hidden rounded-2xl relative group">
                <img
                  src="/hero3.jpg"
                  alt={t("hero.img_alt3")}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-[0.7rem] tracking-widest uppercase text-white/50 z-10">
        <span>{t("hero.scroll")}</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-float" />
      </div>
    </section>
  );
}