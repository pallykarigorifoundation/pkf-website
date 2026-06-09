import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const defaults = { ease: "power3.out" };//
      // "onEnter onLeave onEnterBack onLeaveBack"
      // play  | reverse | play       | reverse  → repeatable in both directions
      const trigger = { start: "top 75%", end: "bottom 10%", toggleActions: "play reverse play reverse" };

      gsap.from(".about-label", {
        x: -40, opacity: 0, duration: 0.7, delay: 0.2, ...defaults,
        scrollTrigger: { trigger: ".about-label", ...trigger },
      });

      gsap.from(".about-lead", {
        x: -50, opacity: 0, duration: 0.8, delay: 0.25, ...defaults,
        scrollTrigger: { trigger: ".about-lead", ...trigger },
      });

      gsap.from(".about-accent", {
        x: -40, opacity: 0, duration: 0.7, delay: 0.35, ...defaults,
        scrollTrigger: { trigger: ".about-accent", ...trigger },
      });

      document.querySelectorAll(".about-pillar").forEach((el, i) => {
        gsap.from(el, {
          x: 60, opacity: 0, duration: 0.7, delay: 0.2 + i * 0.18, ...defaults,
          scrollTrigger: { trigger: el, ...trigger },
        });
      });

      document.querySelectorAll(".about-photo").forEach((el, i) => {
        gsap.from(el, {
          x: 50, opacity: 0, duration: 0.8, delay: 0.25 + i * 0.2, ...defaults,
          scrollTrigger: { trigger: el, ...trigger },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: t("about.pillar1_num"),
      title: t("about.pillar1_title"),
      desc: t("about.pillar1_desc"),
    },
    {
      num: t("about.pillar2_num"),
      title: t("about.pillar2_title"),
      desc: t("about.pillar2_desc"),
    },
    {
      num: t("about.pillar3_num"),
      title: t("about.pillar3_title"),
      desc: t("about.pillar3_desc"),
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="bg-white dark:bg-black py-16 lg:py-24 px-[5vw]">
      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="about-label flex items-center gap-4 mb-12 text-[0.72rem] font-bold tracking-widest text-olive dark:text-lime-light uppercase after:content-[''] after:flex-1 after:h-px after:bg-sand/40">
          {t("about.label")}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <div className="flex flex-col justify-center gap-6">
            <p className="about-lead text-lg sm:text-xl lg:text-2xl font-light dark:text-white text-text-mid leading-relaxed">
              {t("about.lead")}
            </p>
            <p className="about-accent font-display text-xl lg:text-2xl font-normal italic text-lime leading-relaxed pl-6 border-l-[3px] border-lime">
              {t("about.accent")}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {pillars.map((p) => (
              <div key={p.title} className="about-pillar group flex gap-5 items-start p-6 rounded-xl border border-border-subtle bg-cream dark:bg-zinc-900 transition-all hover:border-lime hover:translate-x-1 hover:shadow-sm-custom">
                <span className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-lime text-white font-bold text-base tracking-tight rounded-lg">
                  {p.num}
                </span>
                <div>
                  <h3 className="font-body font-bold text-base text-olive dark:text-lime-light mb-1">{p.title}</h3>
                  <p className="text-sm text-text-muted dark:text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="about-photo relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-auto sm:h-72 lg:h-80 group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/photo1.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
              <span className="text-white font-semibold text-sm tracking-wide">{t("about.photo_youth")}</span>
            </div>
          </div>
          <div className="about-photo relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-auto sm:h-72 lg:h-80 group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/photo2.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
              <span className="text-white font-semibold text-sm tracking-wide">{t("about.photo_craft")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
