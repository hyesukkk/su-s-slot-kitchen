import "./styles/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Game from "./pages/game/Game";
import Result from "./pages/result/Result";
import Notfound from "./pages/notfound/Notfound";

// 1. "/" : 메인화면 - Home 페이지
// 2. "/game" : 게임화면 - Game 페이지
// 3. "/result" : 결과화면 - Result 페이지지
function App() {
  return (
    <>
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
