import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();

  const navLinks = [
    { id: "about", label: t("nav.about"), path: "/#about" },
    { id: "courses", label: t("nav.courses"), path: "/courses" },
    { id: "centers", label: t("nav.centers"), path: "/#centers" },
    { id: "impact", label: t("nav.impact"), path: "/#impact" },
    { id: "contact", label: t("nav.contact"), path: "/#contact" },
    { id: "donate", label: t("nav.donate"), path: "/donate" }
  ];

  const disciplines = [
    { label: t("courses.tracks.agriculture.title"), id: "agriculture" },
    { label: t("courses.tracks.wellness.title"), id: "wellness" },
    { id: "data-tech", label: t("courses.tracks.data_tech.title") },
    { id: "design-media", label: t("courses.tracks.design_media.title") },
  ];

  return (
    <footer className="bg-text-dark dark:bg-black py-16 lg:py-20">
      <div className="w-full px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2fr] gap-12 lg:gap-20 pb-12 border-b border-white/10 mb-8">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3.5">
              <Link to="/" className="flex items-center gap-3.5">
                <img
                  src="/single.png"
                  alt={t("nav.logo_alt")}
                  className="block h-12 w-auto object-contain"
                />
                <div>
                  <div className="flex flex-col leading-[1.1]">
                    <div className="font-['Roboto_Slab'] font-bold text-lg tracking-wide text-lime dark:text-lime-light uppercase">{t("nav.name_part1")}</div>
                    <div className="font-['Roboto_Slab'] font-bold text-lg tracking-wide text-lime dark:text-lime-light uppercase">{t("nav.name_part2")}</div>
                  </div>
                  <div className="text-[0.62rem] text-white/40 tracking-widest mt-1 uppercase">
                    {t("footer.brand_sub")}
                  </div>
                </div>
              </Link>
            </div>
            <p className="text-[0.85rem] text-white/50 leading-relaxed font-light">
              {t("footer.brand_desc")}
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z", url: "https://facebook.com" },
                { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", url: "https://instagram.com", extra: <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>, rect: <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect> },
                { label: "X (Twitter)", path: "M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M12.456 12.456l7.544 7.544", url: "https://x.com" },
                { label: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", url: "https://linkedin.com", extra: <><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></> }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-white/60 border border-white/10 transition-all hover:bg-lime hover:text-white hover:border-lime hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(138,170,30,0.25)]"
                  aria-label={social.label}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {social.rect}
                    <path d={social.path}></path>
                    {social.extra}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <div className="text-[0.68rem] font-bold tracking-[0.15em] text-lime uppercase mb-1">{t("footer.nav_title")}</div>
              {navLinks.map((l) => (
                l.path.startsWith("/#") ? (
                  <a
                    key={l.id}
                    href={l.path}
                    className="text-[0.85rem] text-white/60 transition-colors hover:text-lime"
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.id}
                    to={l.path}
                    className="text-[0.85rem] text-white/60 transition-colors hover:text-lime"
                  >
                    {l.label}
                  </Link>
                )
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[0.68rem] font-bold tracking-[0.15em] text-lime uppercase mb-1">{t("footer.disc_title")}</div>
              {disciplines.map((l) => (
                <Link
                  key={l.id}
                  to={`/courses?track=${l.id}`}
                  className="text-[0.85rem] text-white/60 transition-colors hover:text-lime"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <div className="text-[0.68rem] font-bold tracking-[0.15em] text-lime uppercase mb-1">{t("footer.regions_title")}</div>
              <span className="text-[0.85rem] text-white/60 cursor-default">
                {t("footer.address_plassey")}
              </span>
              <span className="text-[0.85rem] text-white/60 cursor-default">
                {t("footer.address_mirik")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-display italic text-sm lg:text-[0.9rem] text-lime dark:text-lime-light opacity-70">
            {t("footer.tagline")}
          </p>
        </div>
      </div>
    </footer>
  );
}
