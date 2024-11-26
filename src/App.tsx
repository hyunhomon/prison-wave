import { useState } from "react";
import Game from "./scenes/game";
import Main from "./scenes/main";

const App = () => {
    const [scene, setScene] = useState<string>("main");
    return (<>
        {scene === "main" ? <Main setScene={setScene} /> : <Game />}
    </>);
}

export default App;