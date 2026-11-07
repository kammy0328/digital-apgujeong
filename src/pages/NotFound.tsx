import { Link } from "../components/LocalizedLink";
import { useLang } from "../i18n";
export default function NotFound() {
  const { t } = useLang();
  return (
    <section className="not-found page-pad">
      <h1 lang="en">404</h1>
      <p>{t({ ko: "페이지를 찾을 수 없습니다.", en: "Page not found." })}</p>
      <Link to="/">{t({ ko: "홈으로", en: "Back to home" })}</Link>
    </section>
  );
}
