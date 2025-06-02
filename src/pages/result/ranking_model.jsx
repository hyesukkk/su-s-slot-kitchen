import "../../styles/Result.css";
import { postRanking, getRankingList } from "../result/ranking";
import { useEffect, useState } from "react";

const foodNameMap = {
  bingsu: "빙수",
  ramen: "라면",
  burger: "햄버거",
  bibimbap: "비빔밥",
  gimbap: "김밥",
};

export const RankingModal = ({ score, food, onClose, playClickSound }) => {
  const [name, setName] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [rankingList, setRankingList] = useState([]);

  const submit = async () => {
    if (!name.trim()) return alert("이름을 입력하세요!");
    await postRanking({ name: name, score: score, food: food });
    const res = await getRankingList();
    setRankingList(res.data);
    setIsSent(true);
  };

  const getFoodName = (code) => {
    return foodNameMap[code] || code;
  };

  return (
    <div className="Rankingto_modal">
      <div className={`Rankingto_content ${isSent ? "large" : "small"}`}>
        <button
          className="close_button"
          onClick={() => {
            playClickSound();
            onClose();
          }}
        >
          X
        </button>
        {!isSent ? (
          <>
            <input
              className="pretty-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
            <button className="send_button" onClick={submit}>
              전송
            </button>
          </>
        ) : (
          <div className="ranking-table-wrapper">
            <table className="ranking-table">
              <thead>
                <tr>
                  <th>순위</th>
                  <th>이름</th>
                  <th>음식</th>
                  <th>점수</th>
                </tr>
              </thead>
              <tbody>
                {rankingList.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{getFoodName(r.food)}</td>
                    <td>{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
