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

  const guessesQty = 3;
  const initialScore = 100;

  const [words] = useState(worddList);
  const [pickedWord, setPickedWord] = useState<string[]>([]);
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState<string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(initialScore);

  const [gameStage, setGameStage] = useState(stages[0].name);

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = // @ts-ignore
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    clearLetterStates();
    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l: string) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const verifiyLetter = (letter: string) => {
    const normalizedLetter = letter.toLocaleLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGueses) => actualGueses - 1);
    }
  };

  const retry = () => {
    clearLetterStates();
    setGameStage(stages[0].name);
    setGuesses(guessesQty);
    setScore(initialScore);
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses === 0) {
      setGameStage(stages[2].name);
    }
  }),
    [guessedLetters, letters, startGame];

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage === "game"
    ) {
      setScore((actualyScore: any) => actualyScore + 100);
      startGame();
    }
  }, [guessedLetters]);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifiyLetter={verifiyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver score={score} retry={retry} />}
    </div>
  );
}

export default App;
