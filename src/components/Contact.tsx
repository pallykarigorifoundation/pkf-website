import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "../lib/supabase";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [submitError, setSubmitError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitError("");
    const { error } = await supabase.from("forum_registrations").insert([
      { name: form.name, email: form.email, role: form.role, message: form.message },
    ]);
    if (error) {
      console.error("Supabase insert error:", error);
      setSubmitError(error.message);
    } else {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        defaults: { ease: "power3.out" },
      });
      tl.from(".contact-label", { y: 20, opacity: 0, duration: 0.5, clearProps: "all" })
        .from(".contact-title", { y: 30, opacity: 0, duration: 0.6, clearProps: "all" }, "-=0.2")
        .from(".contact-desc", { y: 20, opacity: 0, duration: 0.5, clearProps: "all" }, "-=0.3")
        .from(".contact-info-item", { y: 20, opacity: 0, duration: 0.4, stagger: 0.12, clearProps: "all" }, "-=0.2")
        .from(".contact-right", { x: 40, opacity: 0, duration: 0.7, clearProps: "all" }, "-=0.5");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const infoItems = [
    {
      icon: "📍",
      label: t("contact.info1_label"),
      value: t("contact.info1_value"),
    },
    { icon: "📅", label: t("contact.info2_label"), value: t("contact.info2_value") },
    {
      icon: "✉️",
      label: t("contact.info3_label"),
      value: t("contact.info3_value"),
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="bg-white dark:bg-black dark:text-white py-16 lg:py-24">
      <div className="w-full px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        <div className="contact-left">
          <div className="contact-label text-[0.72rem] font-bold tracking-widest text-lime uppercase mb-6">{t("contact.label")}</div>
          <h2 className="contact-title font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-olive dark:text-lime-light leading-[1.1] mb-6">
            {t("contact.title")}
            <span className="block text-lime">{t("contact.title_em")}</span>
          </h2>
          <p className="contact-desc text-base lg:text-lg font-light text-text-muted dark:text-white/70 leading-relaxed mb-10">
            {t("contact.desc")}
          </p>

          <div className="flex flex-col gap-5">
            {infoItems.map((i) => (
              <div key={i.label} className="contact-info-item flex items-start gap-4">
                <span className="text-xl leading-none flex-shrink-0 mt-0.5">{i.icon}</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.7rem] font-bold tracking-wider text-text-muted dark:text-white uppercase">{i.label}</span>
                  <span className="text-[0.92rem] text-text-mid dark:text-white font-medium">{i.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-right">
          {submitted ? (
            <div className="bg-gradient-to-br from-cream to-lime/10 dark:from-zinc-900 dark:to-lime/5 border-2 border-lime rounded-[20px] p-8 lg:p-12 text-center flex flex-col items-center gap-4 animate-scale-in">
              <div className="text-5xl animate-float">🌱</div>
              <h3 className="font-display text-2xl lg:text-3xl text-olive dark:text-lime-light">{t("contact.success_title")}</h3>
              <p className="text-sm lg:text-base text-text-muted dark:text-white/60 leading-relaxed max-w-[360px]">
                {t("contact.success_desc")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-semibold tracking-wide text-olive dark:text-lime-light uppercase">{t("contact.form.name")}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact.form.name_ph")}
                  className="w-full bg-cream dark:bg-zinc-900 border-[1.5px] border-border-subtle rounded-xl px-4 py-3.5 text-[0.95rem] text-text-dark dark:text-white outline-none focus:border-lime focus:ring-4 focus:ring-lime/10 transition-all placeholder:text-text-muted"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-semibold tracking-wide text-olive dark:text-lime-light uppercase">{t("contact.form.email")}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("contact.form.email_ph")}
                  className="w-full bg-cream dark:bg-zinc-900 border-[1.5px] border-border-subtle rounded-xl px-4 py-3.5 text-[0.95rem] text-text-dark dark:text-white outline-none focus:border-lime focus:ring-4 focus:ring-lime/10 transition-all placeholder:text-text-muted"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-semibold tracking-wide text-olive dark:text-lime-light uppercase">{t("contact.form.role")}</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full bg-cream dark:bg-zinc-900 border-[1.5px] border-border-subtle rounded-xl px-4 py-3.5 text-[0.95rem] text-text-dark dark:text-white outline-none focus:border-lime focus:ring-4 focus:ring-lime/10 transition-all cursor-pointer"
                >
                  <option value="" className="text-black bg-white">{t("contact.form.role_ph")}</option>
                  <option value="youth" className="text-black bg-white">{t("contact.form.role_youth")}</option>
                  <option value="educator" className="text-black bg-white">{t("contact.form.role_educator")}</option>
                  <option value="ngo" className="text-black bg-white">{t("contact.form.role_ngo")}</option>
                  <option value="funder" className="text-black bg-white">{t("contact.form.role_funder")}</option>
                  <option value="govt" className="text-black bg-white">{t("contact.form.role_govt")}</option>
                  <option value="other" className="text-black bg-white">{t("contact.form.role_other")}</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-semibold tracking-wide text-olive dark:text-lime-light uppercase">{t("contact.form.message")}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.message_ph")}
                  rows={4}
                  className="w-full bg-cream dark:bg-zinc-900 border-[1.5px] border-border-subtle rounded-xl px-4 py-3.5 text-[0.95rem] text-text-dark dark:text-white outline-none focus:border-lime focus:ring-4 focus:ring-lime/10 transition-all resize-none placeholder:text-text-muted"
                />
              </div>
              {submitError && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">{submitError}</p>
              )}
              <button
                className="w-full bg-lime text-white font-body font-semibold text-[0.95rem] tracking-wide px-8 py-4 rounded-xl mt-2 transition-all hover:bg-olive hover:-translate-y-0.5 hover:shadow-md-custom"
                onClick={handleSubmit}
              >
                {t("contact.form.submit")}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
