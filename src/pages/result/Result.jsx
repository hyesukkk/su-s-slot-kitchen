import "../../styles/Result.css";
import { useNavigate, useLocation } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Game.jsx에서 전달한 selectedFoods 받기
  const selectedFoods = location.state?.selectedFoods ?? [];
  const resultFood = location.state?.resultFood ?? "trash"; // 기본값은 쓰레기
  const score = location.state?.score ?? 0;
  const resultImage = `/assets/result/${resultFood}.png`;

  return (
    <div className="Result">
      <h1 className="title">음식 평가</h1>

      <div className="result-content">
        {/* 왼쪽 결과 이미지 */}
        <div className="result-left">
          <img className="result-image" src={resultImage} alt={resultFood} />
          <div className="score-section">
            <h3>점수: {score}</h3>
          </div>
        </div>

        {/* 오른쪽: 재료, 점수, 버튼 */}
        <div className="result-right">
          <div className="materials">
            <h3>사용한 재료</h3>
            <div className="material-list">
              {selectedFoods.map((food, idx) => (
                <img
                  key={idx}
                  src={`/assets/food/round${idx + 1}/${food.name}.png`}
                  style={{ width: "80px", height: "80px", margin: "10px" }}
                  alt={food.name}
                  className="material-icon"
                />
              ))}
            </div>
          </div>

          <div className="button-group">
            <button onClick={() => navigate("/")}>새 게임</button>
            <button>랭킹 등록</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
