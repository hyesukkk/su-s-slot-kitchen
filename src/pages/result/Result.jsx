import "../../styles/Result.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { postRanking, getRankingList } from "../result/ranking";
import { RankingModal } from "../result/ranking_model";

const Result = () => {
  const [isRankingtoOpen, setIsRankingtoOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 게임 데이터 없이 들어온 경우: 홈으로 강제 이동
    if (!location.state || !location.state.selectedFoods) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  // selectedFoods 받기
  const selectedFoods = location.state?.selectedFoods ?? [];
  const resultFood = location.state?.resultFood ?? "trash";
  const score = location.state?.score ?? 0;
  const resultFoodImgName =
    location.state?.resultFood || score != 100 ? "trash" : resultFood;
  const resultImage = `/assets/result/${resultFoodImgName}.png`;

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
        <div className="result-left">
          <img
            className="result-image"
            src={resultImage}
            alt={resultFoodImgName}
          />
          <div className="score-section">
            <h3>점수: {score}</h3>
          </div>
        </div>

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
                navigate("/");
              }}
            >
              처음으로
            </button>
            <button
              onClick={() => {
                playClickSound();
                navigate("/Game");
              }}
            >
              다시하기
            </button>
            <button
              onClick={() => {
                playClickSound();
                setIsRankingtoOpen(true);
              }}
            >
              랭킹등록
            </button>
          </div>
        </div>
      </div>
      {isRankingtoOpen && (
        <RankingModal
          score={score}
          food={location.state.resultFood}
          onClose={() => setIsRankingtoOpen(false)}
          playClickSound={playClickSound}
        />
      )}
    </div>
  );
};

export default Result;
