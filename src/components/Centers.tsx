import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Centers() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const centers = [
    {
      id: "plassey",
      name: t("centers.plassey"),
      region: t("centers.nadia"),
      pin: t("centers.pin_plassey"),
      image: "/plassey.jpeg",
      points: [
        t("centers.points.plassey1"),
        t("centers.points.plassey2"),
      ],
    },
    {
      id: "mirik",
      name: t("centers.mirik"),
      region: t("centers.darjeeling"),
      pin: t("centers.pin_mirik"),
      image: "/mirik.jpeg",
      points: [
        t("centers.points.mirik1"),
        t("centers.points.mirik2"),
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(".centers-label", { y: 20, opacity: 0, duration: 0.5, clearProps: "all" })
        .from(".centers-title", { y: 30, opacity: 0, duration: 0.6, clearProps: "all" }, "-=0.2")
        .from(".centers-subtitle", { y: 20, opacity: 0, duration: 0.5, clearProps: "all" }, "-=0.3")
        .from(".centers-card", { y: 40, opacity: 0, duration: 0.6, stagger: 0.2, clearProps: "all" }, "-=0.2")
        .from(".centers-why-title", { y: 20, opacity: 0, duration: 0.5, clearProps: "all" }, "-=0.2")
        .from(".centers-why-item", { y: 20, opacity: 0, duration: 0.4, stagger: 0.12, clearProps: "all" }, "-=0.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const whyItems = [
    { img: "/reg1.jpg", text: t("centers.why1") },
    { img: "/reg2.jpg", text: t("centers.why2") },
    { img: "/reg3.jpg", text: t("centers.why3") },
    { img: "/reg4.jpeg", text: t("centers.why4") },
    { img: "/reg1.jpg", text: t("centers.why1") },
    { img: "/reg2.jpg", text: t("centers.why2") },
    { img: "/reg3.jpg", text: t("centers.why3") },
    { img: "/reg4.jpeg", text: t("centers.why4") },
  ];

  return (
    <section ref={sectionRef} id="centers" className="bg-olive dark:bg-zinc-950 py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-[50%_0_50%_0] bg-white/[0.01] dark:bg-white/[0.03] pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-[0_50%_0_50%] bg-white/[0.01] dark:bg-white/[0.03] pointer-events-none" />

      <div className="w-full px-8 lg:px-16 relative z-10">
        <div className="centers-label text-[0.72rem] font-bold tracking-widest text-lime-light uppercase mb-6">{t("centers.label")}</div>

        <h2 className="centers-title font-display text-4xl sm:text-5xl lg:text-7xl font-normal text-white leading-[1.1] mb-3">
          Areas of <em className="italic text-lime-light">Work</em>
        </h2>
        <p className="centers-subtitle text-base lg:text-lg text-white/60 font-light mb-14">{t("centers.subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
          {/* Active centers */}
          {centers.map((area) => (
            <div key={area.id} className="centers-card group relative rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg-custom">
              <div
                className="relative h-[320px] sm:h-[400px] flex flex-col justify-between p-6 lg:p-8"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%), url(${area.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-zinc-900/75 backdrop-blur-md text-white/95 text-[0.75rem] font-medium py-1.5 px-4 rounded-full tracking-wide border border-white/10">
                  <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                    <path
                      d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5c-.83 0-1.5-.67-1.5-1.5S4.17 3.5 5 3.5 6.5 4.17 6.5 5 5.83 6.5 5 6.5z"
                      fill="white"
                    />
                  </svg>
                  {area.name}, {area.region} — {area.pin}
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  <div className="font-display text-4xl lg:text-5xl font-normal text-white drop-shadow-lg leading-none">{area.name}</div>
                  <div className="flex flex-col gap-3">
                    {area.points.map((p, i) => (
                      <div key={i} className="flex gap-3.5 items-start">
                        <span className="text-xl lg:text-2xl font-bold text-lime-light leading-none flex-shrink-0">+</span>
                        <p className="text-sm lg:text-base text-white/90 leading-relaxed font-normal">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Upcoming center placeholders */}
          {[1, 2].map((n) => (
            <div
              key={`upcoming-${n}`}
              className="centers-card relative rounded-[20px] overflow-hidden border border-dashed border-white/20 bg-white/[0.03] dark:bg-white/[0.02] h-[320px] sm:h-[400px] flex flex-col items-center justify-center gap-5 px-8 select-none"
            >
              {/* Subtle noise texture overlay */}
              <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] pointer-events-none" />

              {/* Pulsing pin icon */}
              <div className="relative flex items-center justify-center">
                <span className="absolute w-14 h-14 rounded-full bg-lime-light/10 animate-ping" />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/15">
                  <svg width="18" height="22" viewBox="0 0 10 14" fill="none" className="opacity-50">
                    <path
                      d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5c-.83 0-1.5-.67-1.5-1.5S4.17 3.5 5 3.5 6.5 4.17 6.5 5 5.83 6.5 5 6.5z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-lime-light/10 border border-lime-light/25 text-lime-light text-[0.7rem] font-semibold tracking-widest uppercase py-1.5 px-4 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-light animate-pulse" />
                Coming Soon
              </div>

              <p className="text-white/30 text-sm text-center leading-relaxed max-w-[220px]">
                A new center of work is being established. Stay tuned.
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-12">
          <h3 className="centers-why-title font-display text-xl lg:text-2xl font-normal text-white mb-8">{t("centers.why_title")}</h3>
          <div className="overflow-hidden relative [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
            <div className="flex gap-6 w-max animate-why-scroll">
              {whyItems.map((r, i) => (
                <div key={i} className="centers-why-item flex-shrink-0 w-[300px]">
                  <div className="w-full aspect-[4/3] rounded-xl bg-cover bg-center flex-shrink-0 relative flex items-end overflow-hidden group" style={{ backgroundImage: `url(${r.img})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <p className="relative z-10 p-4 text-[0.85rem] text-white/95 leading-relaxed font-normal">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
