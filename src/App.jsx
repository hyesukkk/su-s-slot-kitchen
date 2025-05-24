import "./styles/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Home from "./pages/home/Home";
import Game from "./pages/game/Game";
import Result from "./pages/result/Result";
import Notfound from "./pages/notfound/Notfound";

function App() {
  const audioRef = useRef(null);
  const [played, setIsPlayed] = useState(false);

  useEffect(() => {
    const soundClick = () => {
      if (!played && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlayed(true);
        });
      }
    };

    // 사용자 인터랙션 이후 300ms 지연 후 재생 (다른 효과음 먼저 실행되게)
    document.addEventListener(
      "click",
      () => {
        setTimeout(soundClick, 300);
      },
      { once: true }
    );
  }, [played]);

  // 1. "/" : 메인화면 - Home 페이지
  // 2. "/game" : 게임화면 - Game 페이지
  // 3. "/result" : 결과화면 - Result 페이지지
  return (
    <>
      <audio ref={audioRef} src="/assets/sound/main.mp3" loop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
