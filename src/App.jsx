import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Result from "./pages/Result";
import Notfound from "./pages/Notfound";

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
