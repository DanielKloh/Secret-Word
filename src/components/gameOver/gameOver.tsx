import "./gameOver.css";

interface data{
    score: number,
    retry: any
}

const GameOver = ( prop:data) => {

    return(
        <div>
        <h1>Fim de Jogo</h1>
        <h2> A sua pontuação foi: <span>{prop.score}</span></h2>
        <button onClick={prop.retry}>Reiniciar Jogo</button>
        </div>
    );
};

export default GameOver;