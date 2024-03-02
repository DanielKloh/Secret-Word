import "./App.css";

import { useCallback, useState, useEffect } from "react";
import { worddList } from "./data/words";
import StartScreen from "./components/StartScreen/satrtScreen";
import GameOver from "./components/gameOver/gameOver";
import Game from "./components/game/game";

function App() {
  const stages = [
    { id: 1, name: "start" },
    { id: 2, name: "game" },
    { id: 3, name: "end" },
  ];

  const [words] = useState(worddList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [gameStage, setGameStage] = useState(stages[0].name);

  function pickWordAndCategory() {
    const categories = Object.keys(words);
    const category =
    categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }

  const startGame = () => {
    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l: string) => l.toLowerCase());

    console.log(wordLetters);

    setGameStage(stages[1].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game />}
      {gameStage === "end" && <GameOver />}
    </div>
  );
}

export default App;
