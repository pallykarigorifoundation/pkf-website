import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCourseById } from "../lib/courses";
import { FoundationTimeline, AdvancedTimeline } from "../components/CourseTimelines";
import gsap from "gsap";

export default function CourseDetailPage() {
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = courseId ? getCourseById(courseId) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (course) {
      gsap.fromTo(".detail-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    } else {
      const timer = setTimeout(() => navigate("/courses"), 5000);
      return () => clearTimeout(timer);
    }
  }, [course, navigate]);

  if (!course) {
    return (
      <div className="min-h-screen bg-cream dark:bg-black flex flex-col items-center justify-center pt-32 px-6">
        <div className="text-center detail-content">
          <h1 className="text-4xl font-bold text-olive dark:text-lime-light mb-4">Course Not Found</h1>
          <p className="text-text-muted mb-8 text-center max-w-md">
            We couldn't find the course with ID: <span className="font-mono bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">{courseId}</span>.
          </p>
          <Link to="/courses" className="px-8 py-3 bg-lime text-white rounded-xl font-bold hover:bg-olive transition-all">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const isAdvance = course.level === "Advance";

  return (
    <div className="min-h-screen bg-cream dark:bg-black pt-32 pb-20 px-8 lg:px-16">
      <div className="w-full detail-content">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-medium text-text-muted mb-8">
          <Link to="/" className="hover:text-lime transition-colors">{t("nav.home")}</Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-lime transition-colors">{t("nav.courses")}</Link>
          <span>/</span>
          <span className="text-olive dark:text-lime-light truncate">{t(course.titleKey)}</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden shadow-lg-custom">
          {/* Hero image */}
          <div className="h-64 md:h-96 overflow-hidden relative">
            <img src={course.image} alt={t(course.titleKey)} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className={`absolute top-6 left-6 backdrop-blur-md px-4 py-1.5 rounded-full text-[0.7rem] font-bold tracking-widest uppercase text-white border border-white/20 ${isAdvance ? "bg-olive/80" : "bg-lime/70"}`}>
              {t("courses." + course.level.toLowerCase())}
            </div>
            <div className="absolute bottom-6 left-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse" />
              <span className="text-sm font-bold text-white uppercase tracking-widest">{t(course.durationKey)}</span>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col gap-10">
            {/* Title + tags */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="max-w-2xl">
                <h1 className="font-display text-3xl md:text-5xl text-olive dark:text-lime-light font-bold mb-4 leading-tight">
                  {t(course.titleKey)}
                </h1>
                {course.tags && (
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-cream dark:bg-black text-[0.7rem] font-bold text-text-muted dark:text-white/40 rounded-lg uppercase tracking-wider">
                        {t("courses_page.tags." + tag)}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime text-white font-bold text-base rounded-xl hover:bg-olive transition-all hover:-translate-y-1 hover:shadow-lg shadow-lime/20 h-fit whitespace-nowrap"
              >
                {t("courses_page.apply_now")} →
              </Link>
            </div>

            {/* Description */}
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-xl font-bold text-olive dark:text-white mb-4">{t("courses_page.course_overview")}</h3>
              <p className="text-base md:text-lg text-text-muted dark:text-white/70 leading-relaxed">
                {t(course.descKey)}
              </p>
            </div>

            {/* Curriculum Sections */}
            {course.curriculum && (
              <div className="flex flex-col gap-16 pt-10 border-t border-border-subtle/50 mt-10">

                {/* Objective */}
                <div className="bg-lime/5 dark:bg-lime/10 p-8 rounded-3xl border border-lime/20">
                  <h3 className="text-xl font-bold text-olive dark:text-lime-light mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> {t("courses_page.course_objective")}
                  </h3>
                  <p className="text-base text-text-muted dark:text-white/80 leading-relaxed italic">
                    "{course.curriculum.objective}"
                  </p>
                </div>

                {/* Learning Outcomes */}
                <div>
                  <h3 className="text-2xl font-bold text-olive dark:text-white mb-8">{t("courses_page.learning_outcomes")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.curriculum.outcomes.map((outcome, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-800/50 rounded-2xl border border-border-subtle shadow-sm">
                        <span className="text-lime font-bold">✓</span>
                        <span className="text-sm text-text-muted dark:text-white/70">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Syllabus */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-olive dark:text-white">{t("courses_page.syllabus_title")}</h3>
                    <span className="px-4 py-1 bg-olive text-white text-[10px] font-bold rounded-full uppercase tracking-widest">{t(course.durationKey)}</span>
                  </div>
                  <div className="space-y-6">
                    {course.curriculum.syllabus.map((item, i) => (
                      <div key={i} className="group bg-white dark:bg-zinc-900 border border-border-subtle rounded-3xl overflow-hidden hover:border-lime transition-all">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-48 bg-cream dark:bg-black p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border-subtle">
                            <span className="text-lime font-bold text-xs uppercase tracking-tighter mb-1">{item.week}</span>
                            <h4 className="font-bold text-olive dark:text-white leading-tight">{item.module}</h4>
                          </div>
                          <div className="flex-1 p-6 md:p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div>
                                <h5 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-4">{t("courses_page.topics_covered")}</h5>
                                <ul className="space-y-2">
                                  {item.topics.map((topic, j) => (
                                    <li key={j} className="text-sm text-text-muted dark:text-white/60 flex items-center gap-2">
                                      <span className="w-1 h-1 rounded-full bg-lime/50" /> {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="space-y-6">
                                {item.practical && item.practical.length > 0 && (
                                  <div>
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-lime mb-3">{t("courses_page.practical_labs")}</h5>
                                    <div className="flex flex-wrap gap-2">
                                      {item.practical.map((p, j) => (
                                        <span key={j} className="px-3 py-1 bg-lime/10 text-lime text-[10px] font-bold rounded-lg border border-lime/20">{p}</span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {item.assignment && (
                                  <div className="p-4 bg-cream/50 dark:bg-black/40 rounded-xl border border-dashed border-border-subtle">
                                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-olive dark:text-lime-light mb-1">{t("courses_page.weekly_assignment")}</h5>
                                    <p className="text-xs text-text-muted dark:text-white/60 italic">{item.assignment}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Labs, Tools & Careers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-border-subtle shadow-sm">
                    <h4 className="font-bold text-olive dark:text-white mb-6 flex items-center gap-2">
                      <span className="text-lime">⚒</span> {t("courses_page.practical_labs")}
                    </h4>
                    <ul className="space-y-3">
                      {course.curriculum.labs.map((lab, i) => (
                        <li key={i} className="text-sm text-text-muted dark:text-white/60 flex items-center gap-2">
                          <span className="text-lime">•</span> {lab}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-border-subtle shadow-sm">
                    <h4 className="font-bold text-olive dark:text-white mb-6 flex items-center gap-2">
                      <span className="text-lime">💻</span> {t("courses_page.software_tools")}
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("courses_page.core_tools")}</p>
                        <div className="flex flex-wrap gap-2">
                          {course.curriculum.tools.beginner.map((tool, i) => (
                            <span key={i} className="px-2 py-1 bg-cream dark:bg-black rounded-md text-[11px] font-medium text-olive dark:text-white">{tool}</span>
                          ))}
                        </div>
                      </div>
                      {course.curriculum.tools.optional && (
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">{t("courses_page.introduced")}</p>
                          <div className="flex flex-wrap gap-2">
                            {course.curriculum.tools.optional.map((tool, i) => (
                              <span key={i} className="px-2 py-1 bg-cream dark:bg-black rounded-md text-[11px] font-medium text-olive dark:text-white opacity-60">{tool}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-border-subtle shadow-sm">
                    <h4 className="font-bold text-olive dark:text-white mb-6 flex items-center gap-2">
                      <span className="text-lime">🚀</span> {t("courses_page.career_pathways")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.curriculum.careers.map((career, i) => (
                        <span key={i} className="px-3 py-1.5 bg-olive text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">{career}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Assessment */}
                <div className="bg-olive text-white p-10 rounded-[32px] overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-lime/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                  <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                    <div className="lg:w-1/2">
                      <h3 className="text-2xl font-bold mb-4">{t("courses_page.assessment_cert")}</h3>
                      <p className="text-white/70 mb-8 leading-relaxed">
                        To earn your certificate, you'll need to demonstrate consistent progress through weekly assignments and a final community-focused project.
                      </p>

                      {course.curriculum.methodology && (
                        <div className="mb-8 p-4 bg-white/10 rounded-xl border border-white/10 inline-block">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime mb-1">{t("courses_page.learning_methodology")}</p>
                          <p className="text-sm font-medium">{course.curriculum.methodology}</p>
                        </div>
                      )}

                      <div className="space-y-4">
                        {course.curriculum.certification.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <span className="w-5 h-5 rounded-full bg-lime/20 flex items-center justify-center text-lime text-[10px]">✓</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-1/2 w-full">
                      <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-lime mb-6">{t("courses_page.weightage_breakdown")}</h4>
                        <div className="space-y-4">
                          {course.curriculum.assessment.map((item, i) => (
                            <div key={i} className="flex items-center justify-between group">
                              <span className="text-sm text-white/80 group-hover:text-white transition-colors">{item.type}</span>
                              <div className="flex items-center gap-4 flex-1 mx-6">
                                <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-lime rounded-full" style={{ width: item.weight }} />
                                </div>
                                <span className="text-sm font-bold text-lime w-10 text-right">{item.weight}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Timeline */}
            <div className="pt-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-border-subtle" />
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-lime whitespace-nowrap">
                  {t("courses_page.timeline_label")} — {isAdvance ? t("courses_page.advanced_track") : t("courses_page.foundation_track")}
                </p>
                <div className="h-px flex-1 bg-border-subtle" />
              </div>

              <div className="bg-cream dark:bg-zinc-800/40 rounded-[24px] p-6 md:p-10">
                {isAdvance ? <AdvancedTimeline /> : <FoundationTimeline />}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-olive text-white p-8 md:p-10 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-lg">
                <h3 className="text-2xl font-bold mb-2">Ready to start your journey?</h3>
                <p className="text-white/70">Join our next batch and gain the skills that will shape your future.</p>
              </div>
              <Link
                to="/#contact"
                className="px-10 py-4 bg-white text-olive font-bold rounded-xl hover:bg-lime hover:text-white transition-all hover:-translate-y-1"
              >
                Enroll Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
