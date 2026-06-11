import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  id: string;
  nameKey: string;
  roleKey: string;
  descKey: string;
  bioKey: string;
  image: string;
  initials: string;
  locationKey: string;
  joinYearKey: string;
  skillKeys: string[];
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

// Helper: inject Cloudinary transform params into an existing upload URL.
// Works with both old-style  /q_auto/f_auto/  and combined  /q_auto,f_auto/  notation.
function cloudinaryTransform(url: string, transforms: string): string {
  if (!url) return url;
  // Replace the transform segment between /upload/ and /v<version>
  return url.replace(
    /\/upload\/[^/]+\//,
    `/upload/${transforms}/`
  );
}

const members: TeamMember[] = [
  {
    id: "rabiul",
    nameKey: "team.members.rabiul.name",
    roleKey: "team.members.rabiul.role",
    descKey: "team.members.rabiul.desc",
    bioKey: "team.members.rabiul.bio",
    image: "https://res.cloudinary.com/dfuti9ltx/image/upload/q_auto/f_auto/v1781161289/rabi_q6jtgn.webp",
    initials: "RI",
    locationKey: "team.locations.plassey_nadia",
    joinYearKey: "team.year_2026",
    skillKeys: ["team.skills_list.comm_outreach", "team.skills_list.prog_design", "team.skills_list.rural_dev"],
    linkedin: "https://www.linkedin.com/in/ruralrabi/",
    instagram: "https://www.instagram.com/robichobi/",
  },
  {
    id: "subhendu",
    nameKey: "team.members.subhendu.name",
    roleKey: "team.members.subhendu.role",
    descKey: "team.members.subhendu.desc",
    bioKey: "team.members.subhendu.bio",
    image: "https://res.cloudinary.com/dfuti9ltx/image/upload/q_auto/f_auto/v1781161289/punpun_a1q8e3.webp",
    initials: "SK",
    locationKey: "team.locations.mirik_darjeeling",
    joinYearKey: "team.year_2026",
    skillKeys: ["team.skills_list.curr_design", "team.skills_list.skill_training", "team.skills_list.education"],
    instagram: "https://www.instagram.com/subhendukundu/",
  },
  {
    id: "member3",
    nameKey: "team.members.member3.name",
    roleKey: "team.members.member3.role",
    descKey: "team.members.member3.desc",
    bioKey: "team.members.member3.bio",
    image: "https://res.cloudinary.com/dfuti9ltx/image/upload/q_auto/f_auto/v1781161289/deepom_kxh2wu.webp",
    initials: "AM",
    locationKey: "team.locations.plassey_nadia",
    joinYearKey: "team.year_2026",
    skillKeys: ["team.skills_list.strategic_oversight", "team.skills_list.org_growth", "team.skills_list.capacity_building"],
    linkedin: "https://www.linkedin.com/in/dipamc/",
    instagram: "https://www.instagram.com/_dipam.chakraborty_/",
  },
  {
    id: "member4",
    nameKey: "team.members.member4.name",
    roleKey: "team.members.member4.role",
    descKey: "team.members.member4.desc",
    bioKey: "team.members.member4.bio",
    image: "https://res.cloudinary.com/dfuti9ltx/image/upload/q_auto/f_auto/v1781161289/rahul_qfppg4.webp",
    initials: "PD",
    locationKey: "team.locations.darjeeling",
    joinYearKey: "team.year_2026",
    skillKeys: ["team.skills_list.frontend_develop", "team.skills_list.tech_training", "team.skills_list.ai_tools"],
    linkedin: "https://www.linkedin.com/in/rahul-chettri-a354182b9/",
    instagram: "https://www.instagram.com/_.rahul.c_/",
  },
  {
    id: "bina",
    nameKey: "team.members.bina.name",
    roleKey: "team.members.bina.role",
    descKey: "team.members.bina.desc",
    bioKey: "team.members.bina.bio",
    image: "",
    initials: "YOU",
    locationKey: "team.locations.plassey_nadia",
    joinYearKey: "team.year_2026",
    skillKeys: ["team.skills_list.data_advisory", "team.skills_list.analysis", "team.skills_list.rural_dev"],
  },
  {
    id: "mrinnmoy",
    nameKey: "team.members.mrinnmoy.name",
    roleKey: "team.members.mrinnmoy.role",
    descKey: "team.members.mrinnmoy.desc",
    bioKey: "team.members.mrinnmoy.bio",
    image: "",
    initials: "YOU",
    locationKey: "team.locations.plassey_nadia",
    joinYearKey: "team.year_2026",
    skillKeys: ["team.skills_list.public_health", "team.skills_list.research", "team.skills_list.comm_outreach"],
  },
  {
    id: "debasmita",
    nameKey: "team.members.debasmita.name",
    roleKey: "team.members.debasmita.role",
    descKey: "team.members.debasmita.desc",
    bioKey: "team.members.debasmita.bio",
    image: "",
    initials: "YOU",
    locationKey: "team.locations.plassey_nadia",
    joinYearKey: "team.year_2026",
    skillKeys: ["team.skills_list.humanities", "team.skills_list.research", "team.skills_list.education"],
  },
  {
    id: "surja",
    nameKey: "team.members.surja.name",
    roleKey: "team.members.surja.role",
    descKey: "team.members.surja.desc",
    bioKey: "team.members.surja.bio",
    image: "",
    initials: "YOU",
    locationKey: "team.locations.plassey_nadia",
    joinYearKey: "team.year_2026",
    skillKeys: ["team.skills_list.research", "team.skills_list.strategic_oversight", "team.skills_list.rural_dev"],
  },
];

// Card thumbnail: portrait crop, capped at 600×800px, face-aware gravity
const CARD_TRANSFORMS = "q_auto,f_auto,w_600,h_800,c_fill,g_face";
// Modal image: landscape crop for the sidebar panel
const MODAL_TRANSFORMS = "q_auto,f_auto,w_576,h_720,c_fill,g_face";

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MemberModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const { t } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Build optimised modal image URL only when the modal opens
  const modalImageSrc = member.image
    ? cloudinaryTransform(member.image, MODAL_TRANSFORMS)
    : "";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.93, y: 24 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
    );
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    gsap.to(cardRef.current, { opacity: 0, scale: 0.95, y: 16, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: onClose });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) handleClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      <div
        ref={cardRef}
        className="relative bg-white dark:bg-zinc-900 rounded-[24px] md:rounded-[24px] rounded-b-none md:rounded-b-[24px] overflow-hidden shadow-lg-custom w-full max-w-3xl max-h-[92vh] md:max-h-[90vh] flex flex-col"
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-zinc-800/80 text-text-muted dark:text-white/60 hover:bg-lime hover:text-white transition-all backdrop-blur-sm"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row overflow-y-auto scrollbar-hide">
          {/* Photo column */}
          <div className="md:w-72 md:flex-shrink-0 bg-olive/5 dark:bg-zinc-800/50 relative">
            <div className="aspect-[4/3] md:h-full md:aspect-auto overflow-hidden">
              {modalImageSrc ? (
                <img
                  src={modalImageSrc}
                  alt={t(member.nameKey)}
                  // High priority — user explicitly opened this modal
                  fetchPriority="high"
                  decoding="async"
                  width={576}
                  height={720}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                // Initials fallback when no image URL exists
                <div className="w-full h-full bg-olive/10 dark:bg-zinc-700/30 flex items-center justify-center">
                  <span className="font-display text-7xl font-bold text-lime opacity-20">
                    {member.initials}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Content column */}
          <div className="flex-1 p-6 md:p-9 flex flex-col gap-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-lime mb-2">
                {t(member.roleKey)}
              </p>
              <h3 className="font-display text-2xl md:text-3xl text-olive dark:text-lime-light font-bold mb-3">
                {t(member.nameKey)}
              </h3>

              {/* Meta */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-text-muted dark:text-white/50 font-medium mb-4">
                <span className="flex items-center gap-1.5">
                  <LocationIcon />
                  {t(member.locationKey)}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarIcon />
                  {t("team.joined")} {t(member.joinYearKey)}
                </span>
              </div>

              <p className="text-sm text-text-muted dark:text-white/70 leading-relaxed">
                {t(member.bioKey)}
              </p>
            </div>

            {/* Skills */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-text-muted dark:text-white/40 mb-2.5">
                {t("team.skills")}
              </p>
              <div className="flex flex-wrap gap-2">
                {member.skillKeys.map((skillKey) => (
                  <span
                    key={skillKey}
                    className="px-3 py-1 rounded-full border border-lime/40 text-lime dark:text-lime-light text-[11px] font-bold tracking-wide bg-lime/5"
                  >
                    {t(skillKey)}
                  </span>
                ))}
              </div>
            </div>

            {/* Social links */}
            {(member.linkedin || member.instagram || member.facebook) && (
              <div className="flex gap-2 pt-1 mt-auto">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-text-muted dark:text-white/60 hover:bg-lime hover:text-white transition-all"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-text-muted dark:text-white/60 hover:bg-lime hover:text-white transition-all"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-text-muted dark:text-white/60 hover:bg-lime hover:text-white transition-all"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<TeamMember | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isAnimatingRef = useRef(false);
  const manualTweenRef = useRef<gsap.core.Tween | null>(null);

  // Double it for seamless infinite loop
  const doubledItems = [...members, ...members];

  const getJumpDistance = (container: HTMLDivElement) => {
    const children = container.children;
    const setLength = members.length;
    if (children.length >= setLength * 2) {
      const firstChild = children[0] as HTMLElement;
      const duplicateFirstChild = children[setLength] as HTMLElement;
      if (firstChild && duplicateFirstChild) {
        return duplicateFirstChild.offsetLeft - firstChild.offsetLeft;
      }
    }
    return container.scrollWidth / 2;
  };

  // Auto scroll effect: right to left (cards move left, scrollLeft increases)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const updateScroll = () => {
      if (!isHovered && !isAnimatingRef.current) {
        container.scrollLeft += 0.8;

        const jumpDist = getJumpDistance(container);
        if (jumpDist > 0) {
          if (container.scrollLeft >= jumpDist + 50) {
            container.scrollLeft -= jumpDist;
          }
        }
      }
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    animationFrameId = requestAnimationFrame(updateScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  // Set initial scroll to center and handle wrapping on manual scroll (touch/swipe)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initScroll = () => {
      const jumpDist = getJumpDistance(container);
      if (jumpDist > 0) {
        container.scrollLeft = jumpDist;
      }
    };

    // Delay slightly to allow layout calculations
    requestAnimationFrame(initScroll);

    const handleScroll = () => {
      if (isAnimatingRef.current) return;
      const jumpDist = getJumpDistance(container);
      if (jumpDist <= 0) return;

      if (container.scrollLeft <= 10) {
        container.scrollLeft += jumpDist;
      } else if (container.scrollLeft >= jumpDist + 50) {
        container.scrollLeft -= jumpDist;
      }
    };

    const handleResize = () => {
      initScroll();
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePrev = () => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.querySelector(".team-card")?.clientWidth || 310;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    const targetScrollLeft = container.scrollLeft - scrollAmount;

    isAnimatingRef.current = true;

    if (manualTweenRef.current) {
      manualTweenRef.current.kill();
    }

    const scrollObj = { value: container.scrollLeft };
    manualTweenRef.current = gsap.to(scrollObj, {
      value: targetScrollLeft,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        container.scrollLeft = scrollObj.value;
        const jumpDist = getJumpDistance(container);
        if (container.scrollLeft <= 10) {
          container.scrollLeft += jumpDist;
          scrollObj.value += jumpDist;
        }
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        manualTweenRef.current = null;
      }
    });
  };

  const handleNext = () => {
    const container = containerRef.current;
    if (!container) return;
    const cardWidth = container.querySelector(".team-card")?.clientWidth || 310;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    const targetScrollLeft = container.scrollLeft + scrollAmount;

    isAnimatingRef.current = true;

    if (manualTweenRef.current) {
      manualTweenRef.current.kill();
    }

    const scrollObj = { value: container.scrollLeft };
    manualTweenRef.current = gsap.to(scrollObj, {
      value: targetScrollLeft,
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => {
        container.scrollLeft = scrollObj.value;
        const jumpDist = getJumpDistance(container);
        if (container.scrollLeft >= jumpDist + 50) {
          container.scrollLeft -= jumpDist;
          scrollObj.value -= jumpDist;
        }
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        manualTweenRef.current = null;
      }
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(".team-label", { y: 20, opacity: 0, duration: 0.5, clearProps: "all" })
        .from(".team-heading", { y: 30, opacity: 0, duration: 0.6, clearProps: "all" }, "-=0.3")
        .from(".team-sub", { y: 20, opacity: 0, duration: 0.5, clearProps: "all" }, "-=0.3")
        .from(".team-card", { y: 40, opacity: 0, duration: 0.55, stagger: 0.05, clearProps: "all" }, "-=0.3");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <section ref={sectionRef} id="team" className="bg-cream dark:bg-black py-16 lg:py-24 overflow-hidden">
        <div className="w-full">
          {/* Header */}
          <div className="px-8 lg:px-16">
            <div className="team-label text-[0.72rem] font-bold tracking-widest text-lime uppercase mb-8">
              {t("team.label")}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-14">
              <h2 className="team-heading font-display text-3xl sm:text-4xl lg:text-[3rem] font-semibold text-olive dark:text-lime-light leading-[1.35]">
                {t("team.title")}
                <span className="block text-lime mt-6">{t("team.title_em")}</span>
              </h2>
              <p className="team-sub text-base lg:text-lg font-light text-text-muted dark:text-white/70 leading-relaxed">
                {t("team.sub")}
              </p>
            </div>
          </div>

          {/* Horizontal Slideshow */}
          <div className="relative w-full overflow-hidden">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-cream to-transparent dark:from-black z-10 pointer-events-none" />
            
            <div
              ref={containerRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="flex gap-6 overflow-x-auto scrollbar-none py-6 px-8 md:px-16 select-none items-stretch"
            >
              {doubledItems.map((member, index) => {
                const cardImageSrc = member.image
                  ? cloudinaryTransform(member.image, CARD_TRANSFORMS)
                  : "";

                return (
                  <button
                    key={`${member.id}-${index}`}
                    onClick={() => setActiveModal(member)}
                    className="team-card group text-left rounded-[20px] overflow-hidden transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-lime/20 bg-zinc-900 hover:bg-lime-light w-[280px] sm:w-[310px] md:w-[330px] flex-shrink-0"
                  >
                    <div className="p-4 flex flex-col gap-4 h-full">
                      {/* Name */}
                      <div className="flex flex-col gap-0.5">
                        <h3 className="font-display text-xl font-bold text-white group-hover:text-zinc-900 leading-tight transition-colors duration-300 truncate">
                          {t(member.nameKey)}
                        </h3>
                      </div>

                      {/* Photo */}
                      <div className="relative rounded-[14px] overflow-hidden w-full aspect-[3/4]">
                        <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-90">
                          {cardImageSrc ? (
                            <img
                              src={cardImageSrc}
                              alt={t(member.nameKey)}
                              loading="lazy"
                              decoding="async"
                              width={600}
                              height={800}
                              className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-zinc-800 group-hover:bg-lime/20 transition-colors duration-300 flex items-center justify-center">
                              <span className="font-display text-6xl font-bold text-zinc-600 group-hover:text-zinc-900/30 transition-colors duration-300">
                                {member.initials}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Info rows */}
                      <div className="flex flex-col gap-0 border-t border-white/10 group-hover:border-zinc-900/20 transition-all duration-300 overflow-hidden max-h-0 group-hover:max-h-40 group-hover:pt-3">
                        <div className="flex items-center justify-between py-2 border-b border-white/8 group-hover:border-zinc-900/15">
                          <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/40 group-hover:text-zinc-900/50 transition-colors duration-300">
                            Position
                          </span>
                          <span className="text-xs font-semibold text-white/80 group-hover:text-zinc-900 transition-colors duration-300 text-right overflow-hidden whitespace-nowrap w-0 group-hover:w-auto group-hover:animate-typing">
                            {t(member.roleKey)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span className="text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/40 group-hover:text-zinc-900/50 transition-colors duration-300">
                            Info
                          </span>
                          <span className="text-xs font-semibold text-white/80 group-hover:text-zinc-900 transition-colors duration-300 text-right overflow-hidden whitespace-nowrap w-0 group-hover:w-auto group-hover:animate-typing-delay max-w-[60%] line-clamp-1">
                            {t(member.descKey).split(".")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-cream to-transparent dark:from-black z-10 pointer-events-none" />
          </div>

          {/* Navigation CTA Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-12 h-12 rounded-full border border-lime text-lime dark:text-lime-light hover:bg-lime hover:text-white transition-all flex items-center justify-center bg-transparent focus:outline-none focus:ring-2 focus:ring-lime"
              aria-label="Previous Team Member"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-12 h-12 rounded-full border border-lime text-lime dark:text-lime-light hover:bg-lime hover:text-white transition-all flex items-center justify-center bg-transparent focus:outline-none focus:ring-2 focus:ring-lime"
              aria-label="Next Team Member"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal && (
        <MemberModal member={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}