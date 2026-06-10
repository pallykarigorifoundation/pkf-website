import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CourseDetail, courseDetails } from "../lib/courses";
import { FoundationTimeline, AdvancedTimeline } from "../components/CourseTimelines";

gsap.registerPlugin(ScrollTrigger);

function InstructorCTA({ className = "", activeTrack = "data-tech" }: { className?: string; activeTrack?: string }) {
  const { t } = useTranslation();

  return (
    <div className={`bg-[#1a1a1a] border border-[#2a2a2a] rounded-[12px] p-6 flex flex-col gap-6 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#a3e635]">
          <img src="/punpun.jpg" alt={t("courses_page.instructor_name")} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">{t("courses_page.instructor_name")}</h4>
          <p className="text-[#9ca3af] text-xs font-normal">{t("courses_page.instructor_title")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[#a3e635] font-extrabold text-xl leading-tight">
          {t(`courses_page.instructor_headline_${activeTrack.replace('-', '_')}`)}
        </h3>
        <p className="text-[#9ca3af] text-sm font-normal leading-relaxed">
          {t("courses_page.instructor_desc")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: t("courses_page.instructor_stats_students"), val: t("courses_page.instructor_stats_val_students") },
          { label: t("courses_page.instructor_stats_rating"), val: t("courses_page.instructor_stats_val_rating") },
          { label: t("courses_page.instructor_stats_courses"), val: t("courses_page.instructor_stats_val_courses") },
          { label: t("courses_page.instructor_stats_online"), val: t("courses_page.instructor_stats_val_online") }
        ].map((s) => (
          <div key={s.label} className="bg-[#111] p-3 rounded-lg flex flex-col items-center justify-center">
            <span className="text-white font-extrabold text-lg">{s.val}</span>
            <span className="text-[#9ca3af] text-[10px] uppercase font-bold tracking-tighter">{s.label}</span>
          </div>
        ))}
      </div>

      <Link to="/#contact" className="w-full bg-[#a3e635] text-[#0d0d0d] py-3.5 rounded-lg font-extrabold text-center hover:opacity-90 transition-all">
        {t("courses_page.instructor_enroll")}
      </Link>

      <div className="flex flex-col gap-4">
        <div className="h-px bg-[#2a2a2a] w-full" />
        <div className="flex items-center justify-center gap-2 text-[#9ca3af] text-[11px] font-normal italic">
          <span>✓</span> {t("courses_page.instructor_cert")}
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, t }: { course: CourseDetail; t: any }) {
  return (
    <div className="course-card bg-white dark:bg-zinc-900 rounded-[20px] overflow-hidden border border-border-subtle shadow-sm-custom hover:shadow-md-custom transition-all group h-full flex flex-col">
      <div className="h-52 overflow-hidden relative">
        <img src={course.image} alt={t(course.titleKey)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-widest uppercase text-white border border-white/20 ${
          course.level === "Foundation" ? "bg-lime/70" : "bg-olive/80"
        }`}>
          {t("courses." + course.level.toLowerCase())}
        </div>
      </div>
      <div className="p-7 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
          <span className="text-[0.65rem] font-bold text-lime uppercase tracking-widest">{t(course.durationKey)}</span>
        </div>
        <h3 className="font-display text-xl text-olive dark:text-lime-light font-bold mb-3 leading-tight">{t(course.titleKey)}</h3>

        {course.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-cream dark:bg-black text-[0.6rem] font-bold text-text-muted dark:text-white/40 rounded-md uppercase tracking-wider">
                {t("courses_page.tags." + tag)}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-text-muted dark:text-white/60 leading-relaxed mb-8">
          {t(course.descKey)}
        </p>
        <div className="mt-auto">
          <Link
            to={`/courses/${course.id}`}
            className="group/btn relative inline-flex items-center justify-center w-full py-3 border border-lime/30 rounded-xl text-lime font-bold text-sm hover:bg-lime hover:text-white transition-all text-center"
          >
            {t("courses_page.course_details")}
            <span className="ml-2 opacity-0 -translate-x-2 transition-all group-hover/btn:opacity-100 group-hover/btn:translate-x-0 font-serif text-lg leading-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const trackParam = searchParams.get("track");

  const [activeTrack, setActiveTrack] = useState(trackParam || "data-tech");
  const [searchQuery, setSearchQuery] = useState("");
  const pageRef = useRef<HTMLDivElement>(null);

  const handleTrackChange = (trackId: string) => {
    setActiveTrack(trackId);
    setSearchQuery("");
    setSearchParams({ track: trackId });
  };

  // Mount animation
  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".page-header-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      })
      .from(".campus-cta", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        clearProps: "all"
      }, "-=0.4")
      .from(".timeline-section", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        clearProps: "all"
      }, "-=0.5")
      .from(".track-tabs-container", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        clearProps: "all"
      }, "-=0.3")
      .from(".sidebar-item", {
        x: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        clearProps: "all"
      }, "-=0.6");
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Track or Search change animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".course-card", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all"
      });

      gsap.from(".outcome-item", {
        x: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all"
      });
    }, pageRef);
    return () => ctx.revert();
  }, [activeTrack, searchQuery]);

  const tracks = [
    { id: "agriculture", label: t("courses.tracks.agriculture.title") },
    { id: "wellness", label: t("courses.tracks.wellness.title")},
    { id: "data-tech", label: t("courses.tracks.data_tech.title") },
    { id: "design-media", label: t("courses.tracks.design_media.title"), icon: "" },
  ];

  const filteredCourses = courseDetails[activeTrack]?.filter((course) => {
    const title = t(course.titleKey).toLowerCase();
    const desc = t(course.descKey).toLowerCase();
    const query = searchQuery.toLowerCase();
    return (
      title.includes(query) ||
      desc.includes(query) ||
      course.tags?.some((tag) => t("courses_page.tags." + tag).toLowerCase().includes(query))
    );
  });

  return (
    <>
      <div ref={pageRef} className="bg-cream dark:bg-black min-h-screen pt-32 pb-20 px-8 lg:px-16">
      <div className="w-full">
        <header className="mb-16">
          <div className="flex items-center gap-2 text-sm font-medium text-text-muted mb-4 page-header-item">
            <Link to="/" className="hover:text-lime transition-colors">{t("nav.home")}</Link>
            <span>/</span>
            <span className="text-olive dark:text-lime-light">{t("nav.courses")}</span>
          </div>
          <h1 className="page-header-item font-display text-4xl md:text-6xl text-olive dark:text-lime-light font-bold mb-6">
            {t("courses_page.detailed_curriculum").split(' ')[0]} <span className="text-lime">{t("courses_page.detailed_curriculum").split(' ')[1]}</span>
          </h1>
          <p className="page-header-item text-lg text-text-muted dark:text-white/70 max-w-2xl leading-relaxed">
            {t("courses.sub")}
          </p>
        </header>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {[
            { campus: t("courses_page.mirik_campus"), seats: t("courses_page.mirik_seats"), color: "from-lime/10 to-transparent" },
            { campus: t("courses_page.plassey_campus"), seats: t("courses_page.plassey_seats"), color: "from-olive/10 to-transparent" }
          ].map((c) => (
            <div key={c.campus} className="campus-cta bg-white dark:bg-zinc-900 p-8 rounded-[24px] border border-border-subtle shadow-sm-custom flex flex-col justify-between group hover:border-lime transition-all relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${c.color} rounded-bl-full opacity-50 group-hover:scale-110 transition-transform`} />
              <div className="relative z-10">
                <h3 className="font-display text-2xl text-olive dark:text-lime-light font-bold mb-2">{c.campus}</h3>
                <p className="text-text-muted dark:text-white/60 mb-6">{t("centers.subtitle")}</p>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-3xl font-display font-bold text-lime">{c.seats}</span>
                  <span className="text-[0.65rem] font-bold uppercase tracking-widest text-text-muted">{t("courses_page.seats_left")}</span>
                </div>
                <Link to="/#contact" className="group relative bg-lime text-white px-10 py-3 rounded-xl font-bold hover:bg-olive transition-all shadow-lime hover:shadow-lg-custom hover:-translate-y-0.5 inline-flex items-center justify-center">
                  {t("courses_page.apply_now")}
                  <span className="ml-2 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 font-serif text-lg leading-none">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Foundation Course Timeline */}
        <section className="mb-24 timeline-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-5xl text-olive dark:text-white font-bold leading-tight">
                {t("courses_page.foundation_timeline_title")} <span className="text-lime dark:text-white">{t("courses_page.foundation_timeline_title_em")}</span>
              </h2>
            </div>
            <p className="text-sm text-text-muted dark:text-white/60 max-w-sm leading-relaxed">
              {t("courses_page.journey_sub")}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 rounded-[32px] p-8 lg:p-12 border border-border-subtle shadow-sm-custom">
            <FoundationTimeline />
          </div>
        </section>

        {/* Advanced Course Timeline */}
        <section className="mb-24 timeline-section">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-5xl text-olive dark:text-white font-bold leading-tight">
                {t("courses_page.advanced_timeline_title")} <span className="text-lime dark:text-white">{t("courses_page.advanced_timeline_title_em")}</span>
              </h2>
            </div>
            <p className="text-sm text-text-muted dark:text-white/60 max-w-sm leading-relaxed">
              {t("courses_page.advanced_timeline_sub")}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 rounded-[32px] p-8 lg:p-12 border border-border-subtle shadow-sm-custom overflow-x-auto lg:overflow-visible">
            <AdvancedTimeline />
          </div>
        </section>

        {/* Track Selection & Search */}
        <div className="mb-12">
          <div className="track-tabs-container flex flex-wrap items-center justify-between gap-6 border-b border-border-subtle">
            <div className="flex flex-wrap gap-2 md:gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleTrackChange(track.id)}
                  className={`pb-4 px-2 font-bold transition-all relative text-sm md:text-base flex items-center gap-2 ${
                    activeTrack === track.id ? "text-lime" : "text-text-muted hover:text-olive"
                  }`}
                >
                  <span className="text-xl md:text-2xl">{track.icon}</span>
                  {track.label}
                  {activeTrack === track.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-lime animate-lineGrow" />
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="search-container relative w-full md:w-72 pb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("courses_page.search_placeholder")}
                className="w-full bg-white dark:bg-zinc-900 border border-border-subtle rounded-xl px-4 py-2 text-sm outline-none focus:border-lime focus:ring-4 focus:ring-lime/10 transition-all text-text-dark dark:text-white placeholder:text-text-muted/60"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Course Grid */}
          <div className="course-grid flex flex-col gap-12 items-start">
            {filteredCourses && filteredCourses.length > 0 ? (
              <>
                {/* Foundation Section */}
                {filteredCourses.some(c => c.level === "Foundation") && (
                  <div className="w-full">
                    <h2 className="font-display text-2xl text-olive dark:text-lime-light font-bold mb-8 flex items-center gap-4">
                      <span className="w-8 h-px bg-lime" />
                      {t("courses.foundation_label")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredCourses.filter(c => c.level === "Foundation").map((course) => (
                        <CourseCard key={course.id} course={course} t={t} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Advance Section */}
                {filteredCourses.some(c => c.level === "Advance") && (
                  <div className="w-full">
                    <h2 className="font-display text-2xl text-olive dark:text-lime-light font-bold mb-8 flex items-center gap-4">
                      <span className="w-8 h-px bg-lime" />
                      {t("courses.advance_label")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filteredCourses.filter(c => c.level === "Advance").map((course) => (
                        <CourseCard key={course.id} course={course} t={t} />
                      ))}
                    </div>

                    {/* Instructor CTA Card - Mobile Only */}
                    <InstructorCTA className="lg:hidden mt-12 course-card" activeTrack={activeTrack} />
                  </div>
                )}
              </>
            ) : (
              <div className="w-full py-20 text-center bg-white dark:bg-zinc-900 rounded-[24px] border border-dashed border-border-subtle">
                <p className="text-text-muted dark:text-white/60 font-medium mb-4">
                  {t("courses_page.no_results")}
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-lime font-bold hover:text-olive transition-colors underline underline-offset-4"
                >
                  {t("courses_page.clear_search")}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Track Overview, Outcomes & How to Apply */}
          <aside className="flex flex-col gap-8">
            <div className="sidebar-item bg-white dark:bg-zinc-900 p-8 rounded-[24px] border border-border-subtle shadow-sm-custom">
              <h4 className="font-display text-lg text-olive dark:text-lime-light font-bold mb-4">
                {t(`courses.tracks.${activeTrack.replace('-', '_')}.title`)}
              </h4>
              <p className="text-sm text-text-muted dark:text-white/60 leading-relaxed">
                {t(`courses.tracks.${activeTrack.replace('-', '_')}.subtitle`)}
              </p>
            </div>

            <InstructorCTA className="hidden lg:flex sidebar-item" activeTrack={activeTrack} />

            <div className="sidebar-item bg-olive text-white p-8 rounded-[24px] shadow-lg-custom">
              <h4 className="font-display text-lg font-bold mb-6 flex items-center gap-3">
                {t("courses_page.outcomes_title")}
              </h4>
              <ul className="flex flex-col gap-4">
                {(t(`courses.tracks.${activeTrack.replace('-', '_')}.outcomes`, { returnObjects: true }) as string[])?.map((outcome, i) => (
                  <li key={i} className="outcome-item flex items-start gap-3 text-sm font-medium text-white/90">
                    <span className="text-lime mt-0.5">✓</span> {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-item bg-white dark:bg-zinc-900 p-8 rounded-[24px] border border-border-subtle shadow-sm-custom">
              <h4 className="font-display text-lg text-olive dark:text-lime-light font-bold mb-6">
                {t("courses_page.how_to_apply")}
              </h4>
              <div className="flex flex-col gap-6">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-lime/10 text-lime flex items-center justify-center font-bold text-sm">
                      {step}
                    </span>
                    <p className="text-xs text-text-muted dark:text-white/60 leading-relaxed pt-1.5">
                      {t(`courses_page.step${step}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
    </>
  );
}
