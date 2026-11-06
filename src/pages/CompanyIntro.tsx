export default function CompanyIntro() {
  return (
    <div className="studio-page page-pad">
      <h1>Beauty & Cleanup</h1>
      <p className="studio-context">Film / Commercial / Music video</p>
      <div className="studio-services">
        <section>
          <h2>Beauty</h2>
          <p>영상 뷰티 리터칭</p>
          <p>
            피부의 질감과 인물의 개성을 살리며, 움직임과 조명에 맞춰 자연스럽게
            보정합니다.
          </p>
        </section>
        <section>
          <h2>Cleanup</h2>
          <p>오브젝트 클리닝</p>
          <p>화면 속 불필요한 요소를 제거하고 배경을 복원합니다.</p>
        </section>
      </div>
    </div>
  );
}
