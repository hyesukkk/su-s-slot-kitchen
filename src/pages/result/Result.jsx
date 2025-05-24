import "../../styles/Result.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 게임 데이터 없이 들어온 경우: 홈으로 강제 이동
    if (!location.state || !location.state.selectedFoods) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  // Game.jsx에서 전달한 selectedFoods 받기
  const selectedFoods = location.state?.selectedFoods ?? [];
  const resultFood = location.state?.resultFood ?? "trash"; // 기본값은 쓰레기
  const score = location.state?.score ?? 0;
  const resultImage = `/assets/result/${resultFood}.png`;

  const playClickSound = () => {
    const clickSound = new Audio("/assets/sound/click.mp3");
    clickSound.volume = 0.6;
    clickSound.play().catch((e) => {
      console.warn("click.mp3 재생 실패:", e);
    });
  };

  return (
    <div className="Result">
      <h1 className="title">음식 평가</h1>
      <div className="result-content">
        {/* 왼쪽 결과 이미지+점수 */}
        <div className="result-left">
          <img className="result-image" src={resultImage} alt={resultFood} />
          <div className="score-section">
            <h3>점수: {score}</h3>
          </div>
        </div>

        {/* 오른쪽: 재료 + 버튼 */}
        <div className="result-right">
          <div className="materials">
            <h3>사용한 재료</h3>
            <div className="material-list">
              {selectedFoods.map((food, idx) => (
                <img
                  key={idx}
                  src={`/assets/food/round${idx + 1}/${food.name}.png`}
                  alt={food.name}
                  className="material-icon"
                />
              ))}
            </div>
          </div>

          <div className="button-group">
            <button
              onClick={() => {
                playClickSound();
                navigate("/Game");
              }}
            >
              새 게임
            </button>
            <button
              onClick={() => {
                playClickSound();
              }}
            >
              랭킹 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
