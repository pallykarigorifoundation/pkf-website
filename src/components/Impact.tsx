import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
gsap.registerPlugin(ScrollTrigger);

/* ── SDG data ─────────────────────────────────────────────── */
const sdgData = [
  {
    num: "SDG 4",
    title: "Quality Education",
    accent: "#C5192D",
    accentLight: "#e84b5a",
    targets: "Targets 4.3, 4.4 and 4.5",
    value: 30,
    desc: "Future-ready digital skills and lifelong learning for all — ensuring inclusive, equitable quality education and promoting opportunities for everyone.",
    icon: "/penpaper.svg",
  },
  {
    num: "SDG 8",
    title: "Decent Work & Economic Growth",
    accent: "#A21942",
    accentLight: "#d1326b",
    targets: "Targets 8.3, 8.5, 8.6",
    value: 28,
    desc: "Youth employment creation and income upliftment in underserved rural communities through skill-based livelihood pathways.",
    icon: "/growth.svg",
  },
  {
    num: "SDG 9",
    title: "Industry, Innovation & Infrastructure",
    accent: "#FD6925",
    accentLight: "#ff8c55",
    targets: "Targets 9.1, 9.3, 9.C",
    value: 22,
    desc: "Building rural innovation capacity and expanding technology access to foster sustainable industrialisation and bridge the digital gap.",
    icon: "/blocks.svg",
  },
  {
    num: "SDG 10",
    title: "Reduced Inequalities",
    accent: "#DD1367",
    accentLight: "#f04d91",
    targets: "Targets 10.2, 10.3",
    value: 20,
    desc: "Bridging the rural-urban digital divide with equal opportunity access — empowering and promoting social, economic and political inclusion.",
    icon: "/inequality.svg",
  },
  {
    num: "SDG 11",
    title: "Sustainable Cities & Communities",
    accent: "#FD9D24",
    accentLight: "#ffb453",
    targets: "Targets 11.1, 11.3, 11.A",
    value: 15,
    desc: "Making cities and human settlements inclusive, safe, resilient and sustainable by strengthening rural-urban links.",
    icon: "/city.svg",
  }
];

export default function Impact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart<"doughnut"> | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const detailRef = useRef<HTMLDivElement>(null);

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

  /* ── Animate detail panel on change ──────────────────────── */
  useEffect(() => {
    if (detailRef.current) {
      gsap.fromTo(
        detailRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  /* ── Highlight the active slice ──────────────────────────── */
  const highlightSlice = useCallback((chart: Chart<"doughnut">, index: number) => {
    const meta = chart.getDatasetMeta(0);
    if (!meta?.data) return;
    meta.data.forEach((arc, i) => {
      const el = arc as ArcElement;
      if (i === index) {
        el.options.offset = 18;
        el.options.borderWidth = 3;
        el.options.borderColor = "#fff";
      } else {
        el.options.offset = 0;
        el.options.borderWidth = 2;
        el.options.borderColor = "rgba(255,255,255,0.08)";
      }
    });
    chart.update("none");
  }, []);

  /* ── Chart.js initialisation ────────────────────────────── */
  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: sdgData.map((s) => s.title),
        datasets: [
          {
            data: sdgData.map((s) => s.value),
            backgroundColor: sdgData.map((s) => s.accent),
            hoverBackgroundColor: sdgData.map((s) => s.accentLight),
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.08)",
            hoverBorderColor: "#fff",
            hoverBorderWidth: 3,
            offset: 0,
            borderRadius: 6,
            spacing: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "58%",
        radius: "92%",
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1200,
          easing: "easeOutQuart",
        },
        layout: {
          padding: 24,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(20,30,20,0.92)",
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 12 },
            padding: 14,
            cornerRadius: 10,
            displayColors: true,
            boxPadding: 6,
            callbacks: {
              label: (ctx) => {
                const total = sdgData.reduce((a, b) => a + b.value, 0);
                const pct = ((ctx.parsed / total) * 100).toFixed(0);
                return ` ${ctx.label}: ${pct}% of focus`;
              },
            },
          },
        },
        onClick: (_evt, elements) => {
          if (elements.length > 0) {
            const idx = elements[0].index;
            setActiveIndex(idx);
            if (chartRef.current) highlightSlice(chartRef.current, idx);
          }
        },
        onHover: (evt, elements) => {
          const canvas = evt.native?.target as HTMLCanvasElement | undefined;
          if (canvas) canvas.style.cursor = elements.length ? "pointer" : "default";
        },
      },
    });

    chartRef.current = chart;
    highlightSlice(chart, 0);

    return () => {
      chart.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── GSAP scroll animations ─────────────────────────────── */
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

  const active = sdgData[activeIndex];
  const totalValue = sdgData.reduce((a, b) => a + b.value, 0);

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

        {/* ── SDG Pie Chart Section ────────────────────────── */}
        <div className="impact-sdg mb-16">
          <div className="text-[0.72rem] font-bold tracking-widest text-lime uppercase mb-3">SUSTAINABLE DEVELOPMENT GOALS</div>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-olive dark:text-lime-light mb-2">
            Aligned with the <em className="italic text-lime">UN Global Goals</em>
          </h3>
          <p className="text-sm text-text-muted dark:text-white/60 mb-10 max-w-xl">
            Every program we run is designed to move the needle on four SDGs that matter most to rural communities. Click a slice to explore.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Pie Chart */}
            <div className="relative flex items-center justify-center">
              {/* Glow behind chart */}
              <div
                className="absolute w-[70%] h-[70%] rounded-full blur-[80px] opacity-20 pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: active.accent }}
              />
              <div className="w-full max-w-[420px] mx-auto relative">
                <canvas ref={canvasRef} />
                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <img
                    src={active.icon}
                    alt={active.title}
                    className="w-10 h-10 mb-2 object-contain dark:invert transition-all duration-300"
                  />
                  <span className="text-[0.65rem] font-bold tracking-widest uppercase text-text-muted dark:text-white/50">
                    {active.num}
                  </span>
                </div>
              </div>
            </div>

            {/* Detail Panel */}
            <div ref={detailRef} className="flex flex-col gap-6">
              {/* Active SDG detail card */}
              <div
                className="relative rounded-2xl p-8 lg:p-10 overflow-hidden transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${active.accent}18 0%, ${active.accent}08 100%)`,
                  borderLeft: `4px solid ${active.accent}`,
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-border-subtle flex items-center justify-center"
                    style={{ borderColor: active.accent + "33" }}
                  >
                    <img
                      src={active.icon}
                      alt={active.title}
                      className="w-8 h-8 object-contain dark:invert"
                    />
                  </div>
                  <div>
                    <div
                      className="text-[0.65rem] font-bold tracking-widest uppercase mb-0.5"
                      style={{ color: active.accent }}
                    >
                      {active.num}
                    </div>
                    <h4 className="font-display text-xl lg:text-2xl font-bold text-olive dark:text-white leading-tight">
                      {active.title}
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-text-muted dark:text-white/70 leading-relaxed mb-5">
                  {active.desc}
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span
                    className="inline-block text-[0.65rem] font-semibold tracking-widest uppercase py-1.5 px-4 rounded-full border"
                    style={{ borderColor: active.accent + "55", color: active.accent }}
                  >
                    {active.targets}
                  </span>
                  <span
                    className="text-[0.65rem] font-bold tracking-wider uppercase"
                    style={{ color: active.accent }}
                  >
                    {((active.value / totalValue) * 100).toFixed(0)}% Programme Focus
                  </span>
                </div>
              </div>

              {/* SDG quick-select pills */}
              <div className="flex flex-wrap gap-3">
                {sdgData.map((sdg, i) => (
                  <button
                    key={sdg.num}
                    onClick={() => {
                      setActiveIndex(i);
                      if (chartRef.current) highlightSlice(chartRef.current, i);
                    }}
                    className={`
                      group/pill flex items-center gap-2.5 py-2.5 px-5 rounded-full text-[0.75rem] font-semibold
                      transition-all duration-300 border
                      ${i === activeIndex
                        ? "text-white shadow-lg scale-105"
                        : "bg-white/60 dark:bg-zinc-900/50 text-text-muted dark:text-white/60 border-border-subtle hover:border-current hover:-translate-y-0.5"
                      }
                    `}
                    style={
                      i === activeIndex
                        ? { backgroundColor: sdg.accent, borderColor: sdg.accent, boxShadow: `0 6px 24px ${sdg.accent}44` }
                        : {}
                    }
                  >
                    <img
                      src={sdg.icon}
                      alt={sdg.title}
                      className={`w-4 h-4 object-contain transition-all duration-300 ${
                        i === activeIndex ? "brightness-0 invert" : "dark:invert opacity-70 group-hover/pill:opacity-100"
                      }`}
                    />
                    {sdg.num}
                  </button>
                ))}
              </div>
            </div>
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

