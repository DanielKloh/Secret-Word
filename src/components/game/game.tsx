import { useState, useRef } from "react";
import "./game.css";

interface data {
  pickedWord: string[];
  pickedCategory: string;
  letters: string[];
  guessedLetters: string[];
  wrongLetters: string[];
  guesses: number;
  score: number;
  verifiyLetter: any;
}

const Game = (prop: data) => {
console.log(prop);
  const [letter, setLetter] = useState("");
  const letterInputRef = useRef(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    prop.verifiyLetter(letter);
    setLetter(""); //@ts-ignore
    letterInputRef.current.focus();  
  };
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação</span>: {prop.score}
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{prop.pickedCategory}</span>
      </h3>
      <p>Você ainda tem {prop.guesses} tentativa(s).</p>
      <div className="wordContainer">
        {prop.letters.map((letter: string, i: number) =>
          prop.guessedLetters.includes(letter) ? (
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )}
      </div>
      <div className="letterContainer">
        <p>Tente adivnhar uma letra da palavra:</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength={1}
            onChange={(e) => setLetter(e.target.value)}
            required
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {prop.wrongLetters.map((letter: string, i: number) => (
          <span key={i}>{letter}, </span>
        ))}
      </div>
    </div>
  );
};

export default Game;
