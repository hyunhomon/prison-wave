import { useState } from "react";
import styled from "styled-components";

const Screen =  styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    @media screen and (max-width: 768px) {
        gap: 2rem;
    }
`;

const Details = styled.div<{showAll:boolean;}>`
    @media screen and (max-width: 768px) {
        width: 80%;
    }
    width: 30%;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 1rem;
    background-color: var(--surface);
    text-align: center;
    font-size: var(--titleLarge);
    overflow-x: hidden;
    overflow-y: ${props => props.showAll ? 'auto' : 'hidden'};
    max-height: 50vh;
    padding: 1.2rem;
    border-radius: 10px;
    border: 1px solid var(--outline);
    position: relative;
    *{
        width: 90%;
    }
    p{
        color: ${props => props.showAll ? 'var(--onSurface)' : 'var(--error)'};
        word-wrap: break-word;
        text-align: left;
        margin: 0;
    }
    div{
        color: var(--onBackgrouond);
    }
    a{
        text-align: right;
        color: var(--outline);
        text-decoration: none;
        user-select: none;
        cursor: pointer;
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
`;

const DifficultyCard = styled.div<{selected:boolean;}>`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 8px;
    border: 2px solid ${props => props.selected ? 'var(--onBackground)' : 'transparent'};
    user-select: none;
    border-radius: 4px;
    cursor: pointer;
    img{
        width: 48px;
        height: 48px;
    }
    .card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        .item{
            width:100%;
            text-align: left;
        }
        .item:first-child{
            font-size: var(--headlineSmall);
            color: var(--onBackground);
        }
        .item:last-child{
            font-size: var(--titleMedium);
            color: var(--onSurface);
        }
    }
`;

const Title = styled.h1`
    font-family: 'Jersey 10', monospace;
    font-size: 64px;
    margin: 0;
    @media screen and (max-width: 768px) {
        font-size: var(--headlineLarge);
    }
`;

const Button = styled.button`
    font-family: 'Jersey 10', monospace;
    font-size: 2rem;
    padding: 1rem 4rem;
    border-radius: 8px;
    background-color: transparent;
    border: 1px solid var(--outline);
    color: var(--onBackground);
    cursor: pointer;
    @media screen and (max-width: 768px) {
        font-size: var(--headlineSmall);
        width: 80%;
    }
`;

const NoneButton = styled.button`
    font-family: 'Jersey 10', monospace;
    font-size: 2rem;
    padding: 1rem 4rem;
    background-color: transparent;
    border: none;
    color: var(--onSurface);
    cursor: pointer;
    @media screen and (max-width: 768px) {
        font-size: var(--headlineSmall);
        width: 80%;
    }
`

const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
`;

const difficulty:{[key:string]:{[key:string]:string}} = {
    easy: {
        name: "Easy",
        description: "For beginners, relaxed pace."
    },
    normal: {
        name: "Normal",
        description: "Balanced challenge for most."
    },
    hard: {
        name: "Hard",
        description: "Intense fights, strategic play."
    }
}

const details = () => {
    return <ul>
        <li>The game alternates between your turn and enemy turns.</li>
        <li>You get a set amount of cost each turn to:</li>
        <li>Move: 1 cost per tile.</li>
        <ul>
            <li>Attack: 1 cost per action.</li>
            <li>Loot items: 1 cost per action.</li>
        </ul>
        <li>Goal: Don't focus on beating every enemy—just make it to the next floor!</li>
        <li>Items help you:</li>
        <ul>
            <li>Clear tricky areas.</li>
            <li>Recruit characters.</li>
            <li>Boost stats.</li>
        </ul>
        <li>Characters:</li>
        <ul>
            <li>Each has unique stats and one special ability.</li>
            <li>Winning depends on stats, abilities, and a bit of luck (critical hits).</li>
        </ul>
        <li>Movement:</li>
        <ul>
            <li>Click your character, then click where to go—the shortest path is chosen for you.</li>
        </ul>
    </ul>
}

const Main = (props:{
    setScene: React.Dispatch<React.SetStateAction<string>>
}) => {
    const [showDifficulty, setShowDifficulty] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [choosedDifficulty, setChoosedDifficulty] = useState<string>("easy");
    return (
        <Screen>
            {(!showDetails && !showDifficulty) && <Title>prison-wave</Title>}
            <Details showAll={showDetails}>
                {showDifficulty ? <>
                    <div>Select your difficulty</div>
                    {Object.keys(difficulty).map((key:string) => {
                        return <DifficultyCard key={key} selected={choosedDifficulty === key} onClick={() => setChoosedDifficulty(key)}>
                            <img src={`/assets/icons/${key}.svg`} alt={key} />
                            <div className="card">
                                <div className="item">{difficulty[key].name}</div>
                                <div className="item">{difficulty[key].description}</div>
                            </div>
                        </DifficultyCard>
                    })}
                </> : <>
                    <p>{showDetails ? details() :
                        "You're a prisoner in a high-security prison! Face off against other inmates and guards as you plan your escape! Start on the first floor and make your way to the sixth floor. The higher you go, the tougher the inmates and guards you'll encounter. Gather items and allies to take them on and secure your freedom!"
                    }</p>
                    {!showDetails && <a onClick={() => setShowDetails(true)}>details =&gt;</a>}
                </>}
            </Details>
            {showDifficulty ? <ButtonBox>
                <Button onClick={() => props.setScene('game')}>Let's go</Button>
                <NoneButton onClick={() => {
                    setShowDifficulty(false);
                    setShowDetails(false);
                }}>Go back</NoneButton>
            </ButtonBox>:<Button onClick={() => setShowDifficulty(true)}>{showDetails ? "Got it!" : "Start"}</Button>}
        </Screen>
    )
}

export default Main;