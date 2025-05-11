import "./Home.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const nav = useNavigate();
  const [isHowtoOpen, setIsHowtoOpen] = useState(false);

  return (
    <div className="Home">
      <section className="logo">
        <img src={logo} alt="Logo" style={{ width: "350px", height: "auto" }} />
      </section>
      <section className="button_section">
        <button className="start_button" onClick={() => nav("/game")}>
          게임시작
        </button>
        <button className="howto_button" onClick={() => setIsHowtoOpen(true)}>
          게임방법
        </button>
        <h1>gamepage 연습이에욧욧</h1>
      </section>

      {isHowtoOpen && (
        <div className="howto_modal">
          <div className="howto_content">
            <button
              className="close_button"
              onClick={() => setIsHowtoOpen(false)}
            >
              X
            </button>
            <h2>게임 방법</h2>
            <p>
              🎰 슬롯을 4번 돌려 4가지 재료를 모아 음식을 완성하세요!
              <br />
              🔘 핸들을 눌러 멈추면, 해당 위치의 재료가 선택됩니다.
              <br />
              📷 게임이 끝나면 결과를 저장하거나 처음부터 다시 시작할 수 있어요!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
