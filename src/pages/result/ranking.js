// api/ranking.js
import axios from "axios";

const API_BASE = "http://127.0.0.1:3000/api";

export const postRanking = (data) =>
    axios.post(`${API_BASE}/rankings`, data);


export const getRankingList = () =>
    axios.get(`${API_BASE}/rankings`);
