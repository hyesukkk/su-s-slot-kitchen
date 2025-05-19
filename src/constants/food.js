class food {
  constructor(name, relation) {
    this.name = name;
    this.relation = relation; //연관 리스트(length == completeFoodList.length)
  }
}

const completeFoodList = ["ramen", "kimbap", "bibimbap", "hamburger", "bingsu"];
const foodList = [
  new food("bread", [0, 0, 0, 1, 0.2]),
  new food("fish", [0.2, 0.4, 0.4, 0.2, 0]),
  new food("ice", [0, 0, 0, 0, 1]),
  new food("men", [1, 0.1, 0, 0.2, 0]),
  new food("rice", [0.6, 1, 1, 0.4, 0]),
  new food("coffee", [0, 0, 0, 0, 0.5]),
  new food("egg", [1, 0.5, 1, 0.8, 0]),
  new food("mu", [0.2, 1, 0.8, 0, 0]),
  new food("patty", [0.2, 0.4, 0.6, 1, 0]),
  new food("red_beans", [0, 0, 0, 0, 1]),
  new food("cabbage", [0.2, 0.2, 0.3, 1, 0]),
  new food("kim", [0.2, 1, 0.8, 0.3, 0]),
  new food("rice_cake", [0.8, 0, 0, 0, 1]),
  new food("soup", [1, 0.2, 0.2, 0, 0]),
  new food("vegetable", [0.2, 0.8, 1, 0.3, 0]),
  new food("kimbap", [0.2, 1, 0.8, 0.3, 0]),
  new food("leek", [1, 0.5, 0.5, 0.2, 0]),
  new food("milk", [0, 0, 0, 0, 1]),
  new food("red_pepper", [0.8, 0.8, 1, 0.3, 0]),
  new food("tomato", [0, 0, 0, 1, 0.1]),
];

function foodInit() {
  const List = [];
}

export { foodList, completeFoodList };
