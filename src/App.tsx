import { useState } from "react";
import Game from "./scenes/game";
import Main from "./scenes/main";

const App = () => {
    const [scene, setScene] = useState<string>("main");
    const [gameDifficulty, setGameDifficulty] = useState<number>(0);
    return (<>
        {scene === "main" ? <Main setScene={setScene} setGameDifficulty={setGameDifficulty} /> : <Game difficulty={gameDifficulty}/>}
    </>);
}

export default App;