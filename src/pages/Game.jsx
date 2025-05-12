import "./Game.css";
import { useEffect, useState, useRef } from "react";

const Game = () => {
  const [slotIndex, setSlotIndex] = useState(0); // 0~4번 칸
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  // 슬롯 자동 이동 효과
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSlotIndex((prev) => (prev + 1) % 5); // 0~4 반복
      }, 150);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // 핸들 클릭 시 멈추기
  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <div className="Game">
      {/* 슬롯 박스 + 핸들 */}
      <div className="slot-container">
        <img className="slot-box" src="/assets/slot_box.png" alt="슬롯박스" />
        <button className="handle" onClick={handleStop}>
          <img src="/assets/handle.png" alt="핸들" />
        </button>
      </div>

      {/* 화살표 */}
      <div className="arrow-container">
        <img
          className="arrow"
          src="/assets/arrow.png"
          alt="화살표"
          style={{
            left: `${slotIndex * 16 + 18}%`,
            position: "absolute",
            bottom: "-20px",
            transform: "translateX(-50%)",
            transition: "left 0.2s ease",
          }}
        />
      </div>

      {/* 카트 */}
      <div className="cart-container">
        <img className="cart" src="/assets/cart.png" alt="카트" />
      </div>
    </div>
  );
};

export default Game;
