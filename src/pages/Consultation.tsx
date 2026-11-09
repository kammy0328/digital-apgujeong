import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { useLang, type L } from "../i18n";
import Magnetic from "../components/Magnetic";
import { ease, TITLE } from "../motion";
import { CONTACT_LIMITS, validateContact } from "../data/contact";

const initial = {
  name: "",
  phone: "",
  email: "",
  volume: "",
  deadline: "",
  message: "",
};

const T = {
  aside: {
    en: "Send a video link, length and preferred deadline and we can give you a more specific answer.",
    ko: "영상 링크, 작업 분량, 희망 납기일을 함께 보내주시면 더 구체적인 상담이 가능합니다.",
  } as L,
  services: {
    en: "Video beauty retouching / Object cleanup",
    ko: "뷰티 리터칭 / 오브젝트 클리닝",
  } as L,
  fields: {
    en: "Film · Commercial · Music video",
    ko: "영화 · 광고 · 뮤직비디오",
  } as L,
  successTitle: {
    en: "Your inquiry has been received.",
    ko: "문의가 접수되었습니다.",
  } as L,
  successText: {
    en: "We will review your project and get back to you.",
    ko: "프로젝트를 확인한 후 연락드리겠습니다.",
  } as L,
  again: { en: "Send another inquiry", ko: "새 문의 작성" } as L,
  formLabel: { en: "Project inquiry", ko: "프로젝트 문의" } as L,
  name: { en: "Name / Company *", ko: "이름 / 회사명 *" } as L,
  namePh: {
    en: "Your name or company",
    ko: "성함 또는 회사명을 알려주세요",
  } as L,
  phone: { en: "Phone *", ko: "연락처 *" } as L,
  email: { en: "Email", ko: "이메일" } as L,
  volume: { en: "Length / volume", ko: "작업 분량" } as L,
  volumePh: { en: "e.g. 3 min / about 50 shots", ko: "예) 3분 / 약 50컷" } as L,
  deadline: { en: "Preferred deadline", ko: "희망 납기일" } as L,
  deadlinePh: {
    en: "e.g. within 2 weeks / flexible",
    ko: "예) 2주 이내 / 협의 가능",
  } as L,
  message: { en: "About the project", ko: "프로젝트 이야기" } as L,
  messagePh: {
    en: "Tell us about the project, reference video links and the direction you have in mind.",
    ko: "프로젝트 소개, 참고 영상 링크, 원하시는 작업 방향을 자유롭게 남겨주세요.",
  } as L,
  required: { en: "* Required fields.", ko: "* 필수 입력 항목입니다." } as L,
  sending: { en: "Sending…", ko: "전송 중…" } as L,
  send: { en: "Send inquiry", ko: "프로젝트 문의 보내기" } as L,
  invalid: {
    en: "Check the name, phone and email. Keep the message under 5,000 characters.",
    ko: "이름·연락처·이메일을 확인해 주세요. 요청사항은 5,000자 이내로 입력해 주세요.",
  } as L,
  failed: {
    en: "We couldn't send your inquiry. Please contact us by email.",
    ko: "문의를 전송하지 못했습니다. 이메일로 연락해 주세요.",
  } as L,
};

export default function Consultation() {
  const { lang, t } = useLang();
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<"" | "invalid" | "failed">("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    const validation = validateContact(form);
    if (!validation.ok) {
      setState("error");
      setError("invalid");
      return;
    }
    setState("loading");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = await response.json().catch(() => null);
      if (response.status === 400) {
        setState("error");
        setError("invalid");
        return;
      }
      if (!response.ok || !data?.success) throw new Error("send failed");
      setState("success");
      setForm(initial);
    } catch {
      setState("error");
      setError("failed");
    }
  }
  const change = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div className="contact-page page-pad">
      <div className="contact-heading">
        <h1 className="reveal-line" lang="en" translate="no">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: TITLE.duration, ease, delay: TITLE.delay }}
          >
            Contact
          </motion.span>
        </h1>
      </div>
      <motion.div
        className="contact-layout"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.3 }}
      >
        <aside className="contact-aside">
          <span className="eyebrow">CONTACT / DIAP</span>
          <h2 lang="en" translate="no">
            Beauty & Cleanup
          </h2>
          <p>{t(T.aside)}</p>
          <a href="mailto:digitalapgujeong@gmail.com">
            digitalapgujeong@gmail.com ↗
          </a>
          <a
            href="https://www.instagram.com/digital_apgujeong"
            target="_blank"
            rel="noopener noreferrer"
          >
            @digital_apgujeong ↗
          </a>
          <p>
            {t(T.services)}
            <br />
            {t(T.fields)}
          </p>
        </aside>
        {state === "success" ? (
          <section className="success-panel" role="status">
            <Check />
            <h2>{t(T.successTitle)}</h2>
            <p>{t(T.successText)}</p>
            <button onClick={() => setState("idle")}>
              {t(T.again)} <ArrowUpRight size={17} />
            </button>
          </section>
        ) : (
          <form
            className="contact-form"
            onSubmit={submit}
            aria-label={t(T.formLabel)}
          >
            <div className="form-fields">
              <label>
                {t(T.name)}
                <input
                  name="name"
                  maxLength={CONTACT_LIMITS.name}
                  value={form.name}
                  onChange={change}
                  required
                  autoComplete="name"
                  placeholder={t(T.namePh)}
                />
              </label>
              <label>
                {t(T.phone)}
                <input
                  name="phone"
                  maxLength={CONTACT_LIMITS.phone}
                  type="tel"
                  value={form.phone}
                  onChange={change}
                  required
                  autoComplete="tel"
                  placeholder={
                    lang === "ko" ? "010-0000-0000" : "+82 10-0000-0000"
                  }
                />
              </label>
              <label className="full-field">
                {t(T.email)}
                <input
                  name="email"
                  maxLength={CONTACT_LIMITS.email}
                  type="email"
                  value={form.email}
                  onChange={change}
                  autoComplete="email"
                  placeholder="hello@company.com"
                />
              </label>
              <label>
                {t(T.volume)}
                <input
                  name="volume"
                  maxLength={CONTACT_LIMITS.volume}
                  value={form.volume}
                  onChange={change}
                  placeholder={t(T.volumePh)}
                />
              </label>
              <label>
                {t(T.deadline)}
                <input
                  name="deadline"
                  maxLength={CONTACT_LIMITS.deadline}
                  value={form.deadline}
                  onChange={change}
                  placeholder={t(T.deadlinePh)}
                />
              </label>
              <label className="full-field">
                {t(T.message)}
                <textarea
                  name="message"
                  maxLength={CONTACT_LIMITS.message}
                  rows={5}
                  value={form.message}
                  onChange={change}
                  placeholder={t(T.messagePh)}
                />
              </label>
            </div>
            {error && (
              <p className="form-error" role="alert">
                {t(T[error])}
              </p>
            )}
            <div className="submit-row">
              <p>{t(T.required)}</p>
              <Magnetic>
                <button disabled={state === "loading"} type="submit">
                  {state === "loading" ? t(T.sending) : t(T.send)}{" "}
                  <ArrowUpRight size={17} />
                </button>
              </Magnetic>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
