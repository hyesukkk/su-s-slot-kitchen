import "./Game.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // import 추가


const Game = () => {
  const navigate = useNavigate();
  const foodImages = [
    Object.values(import.meta.glob('/public/assets/food/round1/*.png', { eager: true, as: 'url' })),
    Object.values(import.meta.glob('/public/assets/food/round2/*.png', { eager: true, as: 'url' })),
    Object.values(import.meta.glob('/public/assets/food/round3/*.png', { eager: true, as: 'url' })),
    Object.values(import.meta.glob('/public/assets/food/round4/*.png', { eager: true, as: 'url' }))
  ];
  const [round, setRound] = useState(0);
  const [slotIndex, setSlotIndex] = useState(0); // 현재 화살표 위치 (0~4)
  const [isRunning, setIsRunning] = useState(true); // 애니메이션 실행 여부

  const wrapperRef = useRef(null);

  const animationRef = useRef(null); // requestAnimationFrame ID
  const timeoutRef = useRef(null); // setTimeout ID
  const directionRef = useRef(1); // 1: 오른쪽, -1: 왼쪽

  const [arrowLeft, setArrowLeft] = useState("0px");

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

  const nextRound=()=>{
    if(round===3){
      navigate("/"); 
      return;
    }
    setRound(round => (round + 1));
      
    setIsRunning(true); 
  }

  // 핸들 클릭 시 애니메이션 정지
  const handleStop = () => {
    setIsRunning(false);
    //2초뒤 다음 라운드로 변경
    setTimeout(() => {
    nextRound(); 
  }, 2000); 
  };


  return (
    <div className="Game">
      <div className="slot-container">
        {/* 슬롯박스만 감싸는 래퍼 */}
        <div className="slot-box-wrapper" ref={wrapperRef}>
          <img className="slot-box" src="/assets/slot_box.png" alt="슬롯박스" />
            {foodImages[round].map((src, idx) => (
    <img src={src}
      style={{
        position: 'absolute',
        top: '45%',
        left: `${(idx + 1.1) * (65 / foodImages.length)}%`,
        transform: 'translate(-50%, -50%)',
        width: '65px',
        height: '65px',
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
