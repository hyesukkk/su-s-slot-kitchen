import "../../styles/Game.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { foodList } from "../../constants/food";
import { calculateResult } from "../../constants/calculateResult";

const Game = () => {
  const navigate = useNavigate();
  const foodImages = [
    Object.values(
      import.meta.glob("/public/assets/food/round1/*.png", {
        eager: true,
        as: "url",
      })
    ),
    Object.values(
      import.meta.glob("/public/assets/food/round2/*.png", {
        eager: true,
        as: "url",
      })
    ),
    Object.values(
      import.meta.glob("/public/assets/food/round3/*.png", {
        eager: true,
        as: "url",
      })
    ),
    Object.values(
      import.meta.glob("/public/assets/food/round4/*.png", {
        eager: true,
        as: "url",
      })
    ),
  ];
  const [round, setRound] = useState(0);
  const [slotIndex, setSlotIndex] = useState(0); // 현재 화살표 위치 (0~4)
  const [isRunning, setIsRunning] = useState(true); // 애니메이션 실행 여부
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [clickable, setClickable] = useState(true); // 버튼 클릭 가능 여부

  const wrapperRef = useRef(null);

  const animationRef = useRef(null); // requestAnimationFrame ID
  const timeoutRef = useRef(null); // setTimeout ID
  const directionRef = useRef(1); // 1: 오른쪽, -1: 왼쪽

  const [arrowLeft, setArrowLeft] = useState("0px");
  const handleRef = useRef(null);

  useEffect(() => {
    const updateArrowPosition = (index) => {
      if (!wrapperRef.current) return;

      const wrapperWidth = wrapperRef.current.offsetWidth;
      const slotWidth = wrapperWidth / 5;
      const centerX = slotWidth * index + slotWidth / 2;

      setArrowLeft(`${centerX}px`);
    };

    const animate = () => {
      let nextIndex;
      setSlotIndex((prev) => {
        nextIndex = prev + directionRef.current;
        if (nextIndex >= 5) {
          directionRef.current = -1;
          nextIndex = 3;
        } else if (nextIndex < 0) {
          directionRef.current = 1;
          nextIndex = 1;
        }
        updateArrowPosition(nextIndex); // 여기서 직접 업데이트
        return nextIndex;
      });

      const delay = nextIndex === 0 || nextIndex === 4 ? 1500 : 100;

      animationRef.current = requestAnimationFrame(() => {
        timeoutRef.current = setTimeout(animate, delay);
      });
    };

    if (isRunning) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [isRunning]);

  const nextRound = () => {
    if (round === 3) {
      const selectedImage = foodImages[round][slotIndex];
      const selectedFood = findFoodObject(selectedImage);
      const updatedFoods = [...selectedFoods, selectedFood];

      const { resultFood, score } = calculateResult(updatedFoods);
      // const score = resultFood === "trash" ? 0 : updatedFoods.length;

      navigate("/result", {
        state: {
          selectedFoods: updatedFoods,
          resultFood,
          score,
        },
      });
      return;
    }
    setRound((round) => round + 1);
    setIsRunning(true);
  };

  // 선택된 음식의 food 객체 찾기
  const findFoodObject = (imagePath) => {
    const fileName = imagePath.split("/").pop().split(".")[0]; //이름추출
    return foodList.find((food) => food.name === fileName); //음식 찾기
  };

  // 핸들 클릭 시 애니메이션 정지
  const handleStop = () => {
    if (!clickable) return;
    setClickable(false);

    // 레버 살짝 움직이게 active 클래스 추가
    if (handleRef.current) {
      handleRef.current.classList.add("active");
      setTimeout(() => {
        handleRef.current.classList.remove("active");
      }, 300); // 0.3초 뒤에 원래대로
    }

    setIsRunning(false);

    //음식 선택
    const selectedImage = foodImages[round][slotIndex];
    const selectedFood = findFoodObject(selectedImage);
    setSelectedFoods((prev) => [...prev, selectedFood]);
    // 2초 뒤 다음 라운드로 변경
    setTimeout(() => {
      nextRound();
      setClickable(true);
    }, 2000);
  };

  return (
    <div className="Game">
      <div className="slot-container">
        {/* 슬롯박스만 감싸는 래퍼 */}
        <div className="slot-box-wrapper" ref={wrapperRef}>
          <img className="slot-box" src="/assets/slot_box.png" alt="슬롯박스" />
          {foodImages[round].map((src, idx) => (
            <img
              key={idx}
              src={src}
              style={{
                position: "absolute",
                top: "45%",
                left: `${(idx + 1.1) * (65 / foodImages.length)}%`,
                transform: "translate(-50%, -50%)",
                width: "65px",
                height: "65px",
              }}
            />
          ))}
          {/* 화살표 */}
          <img
            className="arrow"
            src="/assets/arrow.png"
            alt="화살표"
            style={{
              left: arrowLeft,
              transform: "translateX(-50%)",
            }}
          />
        </div>

        {/* 핸들 */}
        <button
          className="handle"
          onClick={handleStop}
          disabled={!clickable}
          ref={handleRef}
        >
          <img src="/assets/handle.png" alt="핸들" />
        </button>
      </div>

      {/* 카트 */}
      <div className="cart-container">
        <div className="selected-foods">
          {selectedFoods.map((food, index) => (
            <img
              key={`${food.name}-${index}`}
              src={`/public/assets/food/round${index + 1}/${food.name}.png`}
              style={{
                width: "70px",
                height: "70px",
                margin: "5px",
              }}
            />
          ))}
        </div>
        <img className="cart" src="/assets/cart.png" alt="카트" />
      </div>
    </div>
  );
};

export default Game;
