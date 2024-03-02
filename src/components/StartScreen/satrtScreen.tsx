import "./startScreen.css";

interface data{
    startGame?: any,
}

const StartScreen = (prop:data) => {

    return(
        <div>
        <h1>Secre Word</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={prop.startGame}>COMEÇAR</button>
        </div>
    );
};

export default StartScreen