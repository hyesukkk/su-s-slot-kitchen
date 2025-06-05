import "../../styles/Result.css";
import { postRanking, getRankingList } from "../result/ranking";
import { useEffect, useState } from "react";

export const RankingModal = ({ score, food, onClose, playClickSound }) => {
    const [name, setName] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [rankingList, setRankingList] = useState([]);
  
    const submit = async () => {
      if (!name.trim()) return alert("이름을 입력하세요!");
      await postRanking({ name:name, score:score, food: food });
      const res = await getRankingList();
      setRankingList(res.data);
      setIsSent(true);
    };
  
    return (
      <div className="Rankingto_modal">
        <div className="Rankingto_content">
          <button onClick={() => { playClickSound(); onClose(); }}>X</button>
          {!isSent ? (
            <>
              <input value={name} onChange={(e) => setName(e.target.value)} />
              <button onClick={submit}>전송</button>
            </>
          ) : (
            rankingList.map((r, i) => (
              <div key={r.id}>{i + 1}. {r.name} - {r.food} ({r.score})</div>
            ))
          )}
        </div>
      </div>
    );
  };
  