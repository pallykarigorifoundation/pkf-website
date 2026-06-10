import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Impact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      num: t("impact.stat1_num"),
      label: t("impact.stat1_label"),
      desc: t("impact.stat1_desc"),
    },
    {
      num: t("impact.stat2_num"),
      label: t("impact.stat2_label"),
      desc: t("impact.stat2_desc"),
    },
    {
      num: t("impact.stat3_num"),
      label: t("impact.stat3_label"),
      desc: t("impact.stat3_desc"),
    },
    {
      num: t("impact.stat4_num"),
      label: t("impact.stat4_label"),
      desc: t("impact.stat4_desc"),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(".impact-label", { y: 20, opacity: 0, duration: 0.5, clearProps: "all" })
        .from(".impact-title", { y: 30, opacity: 0, duration: 0.6, clearProps: "all" }, "-=0.2")
        .from(".impact-desc", { y: 20, opacity: 0, duration: 0.5, clearProps: "all" }, "-=0.3")
        .from(".impact-stat", { y: 30, opacity: 0, duration: 0.5, stagger: 0.15, clearProps: "all" }, "-=0.2")
        .from(".impact-sdg", { y: 30, opacity: 0, duration: 0.5, stagger: 0.15, clearProps: "all" }, "-=0.2")
        .from(".impact-quote", { y: 30, opacity: 0, duration: 0.6, clearProps: "all" }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="impact" className="bg-cream dark:bg-black py-16 lg:py-24 relative overflow-hidden">
      <div className="w-full px-8 lg:px-16 relative z-10">
        <div className="impact-label text-[0.72rem] font-bold tracking-widest text-lime uppercase mb-8">{t("impact.label")}</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-end mb-16">
          <h2 className="impact-title font-display text-3xl sm:text-4xl lg:text-[3rem] font-semibold text-olive dark:text-lime-light leading-[1.1] lg:leading-[1.1]">
            {t("impact.title")}
            <span className="block text-lime">{t("impact.title_em")}</span>
          </h2>
          <p className="impact-desc text-base lg:text-lg font-light text-text-muted dark:text-white/70 leading-relaxed">
            {t("impact.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((s) => (
            <div key={s.label} className="impact-stat group relative bg-white dark:bg-zinc-900/50 border border-border-subtle rounded-2xl p-8 flex flex-col gap-1 transition-all duration-300 hover:border-lime hover:-translate-y-1 hover:shadow-md-custom overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-lime scale-x-0 origin-left transition-transform duration-350 group-hover:scale-x-100" />
              <span className="font-display text-4xl font-semibold text-lime leading-none">{s.num}</span>
              <span className="text-[0.8rem] font-bold tracking-wider uppercase text-olive dark:text-lime-light">{s.label}</span>
              <p className="text-[0.8rem] text-text-muted dark:text-white/60 leading-relaxed mt-2">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* SDG Section */}
        <div className="mb-16">
          <div className="text-[0.72rem] font-bold tracking-widest text-lime uppercase mb-3">SUSTAINABLE DEVELOPMENT GOALS</div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-olive dark:text-lime-light mb-2">
            Aligned with the <em className="italic text-lime">UN Global Goals</em>
          </h3>
          <p className="text-sm text-text-muted dark:text-white/60 mb-10 max-w-xl">
            Every program we run is designed to move the needle on four SDGs that matter most to rural communities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                num: "SDG 4",
                title: "Quality Education",
                color: "from-red-700 to-red-900",
                accent: "#C5192D",
                targets: "Targets 4.3, 4.4 and 4.5",
                desc: "Future-ready digital skills and lifelong learning for all — ensuring inclusive, equitable quality education and promoting opportunities for everyone.",
                img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
              },
              {
                num: "SDG 8",
                title: "Decent Work & Economic Growth",
                color: "from-rose-700 to-pink-900",
                accent: "#A21942",
                targets: "Targets 8.3, 8.5, 8.6",
                desc: "Youth employment creation and income upliftment in underserved rural communities through skill-based livelihood pathways.",
                img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
              },
              {
                num: "SDG 9",
                title: "Industry, Innovation & Infrastructure",
                color: "from-orange-500 to-orange-700",
                accent: "#FD6925",
                targets: "Targets 9.1, 9.3, 9.C",
                desc: "Building rural innovation capacity and expanding technology access to foster sustainable industrialisation and bridge the digital gap.",
                img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
              },
              {
                num: "SDG 10",
                title: "Reduced Inequalities",
                color: "from-pink-600 to-fuchsia-800",
                accent: "#DD1367",
                targets: "Targets 10.2, 10.3",
                desc: "Bridging the rural-urban digital divide with equal opportunity access — empowering and promoting social, economic and political inclusion.",
                img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
              },
            ].map((sdg) => (
              <div
                key={sdg.num}
                className="group impact-sdg relative rounded-2xl overflow-hidden h-[280px] sm:h-[300px] flex flex-col justify-end transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Background image */}
                <img
                  src={sdg.img}
                  alt={sdg.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${sdg.color} opacity-85`} />

                {/* Content */}
                <div className="relative z-10 p-6 lg:p-8">
                  <div className="text-[0.65rem] font-bold tracking-widest text-white/70 uppercase mb-1">{sdg.num}</div>
                  <h4 className="font-display text-xl lg:text-2xl font-bold text-white leading-tight mb-2">{sdg.title}</h4>
                  <p className="text-[0.8rem] text-white/80 leading-relaxed mb-3 max-w-sm">{sdg.desc}</p>
                  <span
                    className="inline-block text-[0.65rem] font-semibold tracking-widest uppercase py-1 px-3 rounded-full border border-white/30 text-white/70"
                  >
                    {sdg.targets}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="impact-quote relative bg-olive dark:bg-zinc-900 rounded-[20px] p-8 lg:p-14 overflow-hidden z-0">
          {/* Decorative circle */}
          <div className="absolute bottom-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full bg-white/[0.02] dark:bg-white/[0.04] pointer-events-none z-0" />

          <div className="font-display text-7xl lg:text-[6rem] text-lime leading-[0.5] mb-6 opacity-70 relative z-10">"</div>
          <blockquote className="font-display text-lg sm:text-xl lg:text-3xl italic text-white leading-relaxed mb-5 max-w-[800px] relative z-10">
            {t("impact.quote")}
          </blockquote>
          <cite className="not-italic text-[0.8rem] text-white/55 tracking-wider relative z-10 uppercase font-medium">{t("impact.cite")}</cite>
        </div>
      </div>
    </section>
  );
}
