import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
const initial = {
  name: "",
  phone: "",
  email: "",
  workType: "",
  volume: "",
  deadline: "",
  message: "",
};
export default function Consultation() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success)
        throw new Error(
          data?.error ||
            "문의를 전송하지 못했습니다. 이메일 또는 전화로 연락해 주세요.",
        );
      setState("success");
      setForm(initial);
    } catch (e) {
      setState("error");
      setError(
        e instanceof Error
          ? e.message
          : "전송에 실패했습니다. 이메일로 연락해 주세요.",
      );
    }
  }
  const change = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div className="contact-page page-pad">
      <div className="contact-heading">
        <div>
          <span className="eyebrow">LET’S MAKE SOMETHING GREAT</span>
          <h1>
            Next frame.
            <br />
            <em>With us.</em>
          </h1>
        </div>
        <p>
          작업의 시작은, 가벼운 대화부터.
          <br />
          프로젝트의 방향과 일정을 알려주세요.
          <br />
          필요한 디테일을 함께 찾아가겠습니다.
        </p>
      </div>
      <div className="contact-layout">
        <aside className="contact-aside">
          <span className="eyebrow">CONTACT / DIAP</span>
          <h2>어떤 장면을 만들고 계신가요?</h2>
          <p>
            영상 링크, 작업 분량, 희망 납기일을 함께 보내주시면
            <br />더 구체적인 상담이 가능합니다.
          </p>
          <a href="mailto:digitalapgujeong@gmail.com">
            digitalapgujeong@gmail.com ↗
          </a>
          <a href="tel:01058231350">010.5823.1350 ↗</a>
          <p>
            영상 뷰티 리터칭 / 오브젝트 클리닝
            <br />
            뮤직비디오 · 광고 · 영화 · 퍼스널 영상
          </p>
        </aside>
        {state === "success" ? (
          <section className="success-panel" role="status">
            <Check />
            <h2>문의가 접수되었습니다.</h2>
            <p>프로젝트를 확인한 후 연락드리겠습니다.</p>
            <button onClick={() => setState("idle")}>
              새 문의 작성 <ArrowUpRight size={17} />
            </button>
          </section>
        ) : (
          <form
            className="contact-form"
            onSubmit={submit}
            aria-label="프로젝트 문의"
          >
            <div className="form-fields">
              <label>
                이름 / 회사명 *
                <input
                  name="name"
                  value={form.name}
                  onChange={change}
                  required
                  autoComplete="name"
                  placeholder="성함 또는 회사명을 알려주세요"
                />
              </label>
              <label>
                연락처 *
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={change}
                  required
                  autoComplete="tel"
                  placeholder="010-0000-0000"
                />
              </label>
              <label>
                이메일
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={change}
                  autoComplete="email"
                  placeholder="hello@company.com"
                />
              </label>
              <label>
                작업 종류 *
                <select
                  name="workType"
                  value={form.workType}
                  onChange={change}
                  required
                >
                  <option value="" disabled>
                    선택해 주세요
                  </option>
                  {[
                    "영상 뷰티 리터칭",
                    "오브젝트 클리닝",
                    "뷰티 리터칭 + 클리닝",
                    "기타 / 상담 후 결정",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label>
                작업 분량
                <input
                  name="volume"
                  value={form.volume}
                  onChange={change}
                  placeholder="예) 3분 / 약 50컷"
                />
              </label>
              <label>
                희망 납기일
                <input
                  name="deadline"
                  value={form.deadline}
                  onChange={change}
                  placeholder="예) 2주 이내 / 협의 가능"
                />
              </label>
              <label className="full-field">
                프로젝트 이야기
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={change}
                  placeholder="프로젝트 소개, 참고 영상 링크, 원하시는 작업 방향을 자유롭게 남겨주세요."
                />
              </label>
            </div>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="submit-row">
              <p>* 필수 입력 항목입니다.</p>
              <button disabled={state === "loading"} type="submit">
                {state === "loading" ? "전송 중…" : "프로젝트 문의 보내기"}{" "}
                <ArrowUpRight size={17} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
