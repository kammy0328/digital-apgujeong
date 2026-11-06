import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function CompanyIntro() {
  return (
    <div className="studio-page page-pad">
      <span className="eyebrow">THE STUDIO / DIGITAL APGUJEONG</span>
      <h1>
        We refine.
        <br />
        <em>You shine.</em>
      </h1>
      <div className="studio-description">
        <span className="studio-symbol">✳︎</span>
        <div>
          <h2>
            보이지 않는 디테일이
            <br />
            장면의 차이를 만듭니다.
          </h2>
          <p>
            디지털 압구정은 영상 뷰티 리터칭과 오브젝트 클리닝을 전문으로 하는
            포스트 프로덕션 스튜디오입니다. 뮤직비디오, 광고, 다양한 영상 속
            인물과 공간을 섬세하게 다듬습니다.
          </p>
          <p>
            우리가 추구하는 것은 자연스러운 완성도입니다. 피부의 질감, 인물의
            개성, 장면의 분위기를 존중하며 크리에이터가 의도한 이미지에 한 걸음
            더 가까이 다가갑니다.
          </p>
        </div>
      </div>
      <div className="studio-values">
        {[
          [
            "01",
            "Respect the original.",
            "본연의 아름다움",
            "인물의 개성과 장면의 의도를 이해하는 것에서 시작합니다.",
          ],
          [
            "02",
            "Obsess over details.",
            "프레임마다 섬세하게",
            "움직임과 조명의 흐름을 따라 디테일을 연결합니다.",
          ],
          [
            "03",
            "Create together.",
            "같은 방향으로",
            "레퍼런스부터 최종 결과물까지, 필요한 대화를 함께합니다.",
          ],
        ].map(([n, title, ko, desc]) => (
          <article key={n}>
            <span className="eyebrow">/{n}</span>
            <h3>{title}</h3>
            <h4>{ko}</h4>
            <p>{desc}</p>
          </article>
        ))}
      </div>
      <Link to="/consultation" className="studio-cta">
        다음 프로젝트를 이야기해 주세요. <ArrowUpRight />
      </Link>
    </div>
  );
}
