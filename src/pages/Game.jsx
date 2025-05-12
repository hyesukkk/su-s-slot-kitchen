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
      <div className="slot-container">
        {/* 슬롯박스만 감싸는 래퍼 */}
        <div className="slot-box-wrapper">
          <img className="slot-box" src="/assets/slot_box.png" alt="슬롯박스" />

          {/* 화살표도 여기에 넣기 */}
          <img
            className="arrow"
            src="/assets/arrow.png"
            alt="화살표"
            style={{
              left: `${slotIndex * 20 + 10}%`, // 5칸 기준 중앙 위치
            }}
          />
        </div>

        {/* 핸들은 밖에 두기 */}
        <button className="handle" onClick={handleStop}>
          <img src="/assets/handle.png" alt="핸들" />
        </button>
      </div>

      {/* 카트 */}
      <div className="cart-container">
        <img className="cart" src="/assets/cart.png" alt="카트" />
      </div>
    </div>
  );
};

export default Game;
