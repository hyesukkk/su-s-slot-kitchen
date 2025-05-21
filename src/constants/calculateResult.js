// calculateResult.js
import { completeFoodList } from "./food";

export function calculateResult(selectedFoods) {
  const scores = new Array(completeFoodList.length).fill(0);

  selectedFoods.forEach((food) => {
    food.relation.forEach((value, idx) => {
      scores[idx] += value;
    });
  });

  const maxScore = Math.max(...scores);
  const maxIndex = scores.indexOf(maxScore);

  const isPerfect = maxScore === selectedFoods.length;
  const resultFood = isPerfect ? completeFoodList[maxIndex] : "trash";

  const score =
    selectedFoods.length > 0
      ? Math.round((maxScore / selectedFoods.length) * 100)
      : 0;

  return { resultFood, score };
}
