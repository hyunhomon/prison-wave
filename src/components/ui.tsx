import styled from "styled-components";
import Item from "../lib/ItemTemplates";
import { useState } from "react";
import { useOnce } from "../utils/hooks";

const UIScreen = styled.div<{
    direction?:string;
    justify?:string;
    items?:string;
}>`
    overflow: hidden;
    display: flex;
    flex-direction: ${props => props.direction ? props.direction : 'row'};
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
    align-items: ${props => props.items ? props.items : 'center'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    pointer-events: none;
    *{
        pointer-events: auto;
    }
`;

const Box = styled.div<{
    margin?:string;
    padding?:string;
    gap?:string;
    button?:boolean;
    selected?:boolean;
}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${props => props.gap ? props.gap : '1rem'};
    padding: ${props => props.padding ? props.padding : '1.2rem'};
    margin: ${props => props.margin ? props.margin : '0'};
    background-color: var(--surface);
    border-radius: 10px;
    border: 1px solid ${props => props.selected ? 'var(--onBackground)' : 'var(--outline)'};
    text-align: center;
    overflow: hidden;
    user-select: none;
    cursor: ${props => props.button ? 'pointer' : 'default'};
    h1{
        font-size: var(--headlineSmall);
        color: var(--onSurface);
        margin: 0;
    }
`;

export const Interface = (props:{
    invOpen:boolean;
    setInvOpen:React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const iconSize = 30;
    return (
        <UIScreen direction="row" justify="center" items="end">
            <Box margin="1rem 1rem 2rem">
                <h1>cost: 20/40</h1>
            </Box>
            <Box margin="1rem 0.5rem 2rem" button={true}>
                <img src="assets/icons/users.svg" alt="" width={iconSize} height={iconSize}/>
            </Box>
            <Box margin="1rem 0.5rem 2rem" button={true} onClick={() => props.setInvOpen(!props.invOpen)}>
                <img src="assets/icons/inventory.svg" alt="" width={iconSize} height={iconSize}/>
            </Box>
        </UIScreen>
    );
}

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    flex-wrap: wrap;
    width: 24rem;
    height: 16rem;
    @media screen and (max-width: 768px) {
        width: 90vw;
        max-width: 90vw;
    }
    padding: 1rem;
    gap: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
`;

const ItemDescription = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
    gap: 1rem;
    border-top: 1px solid var(--outline);
`;

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    text-align: left;
    width: 100%;
    *{
        width: 100%;
        margin: 0;
    }
    h1{
        font-size: var(--headlineSmall);
        color: var(--onBackground);
    }
    p{
        font-size: var(--body);
        color: var(--onSurface);
    }
`;

const Button = styled.button`
    padding: 0.7rem 1rem;
    border-radius: 10px;
    background-color: var(--surface);
    border: 1px solid var(--outline);
    color: var(--onBackground);
    font-size: var(--titleMedium);
    cursor: pointer;
    user-select: none;
`;

export const Inventory = (props:{
    inventory:Item[];
}) => {
    const [selected, setSelected] = useState<number>(0);
    useOnce(() => {
        const keydown = (e:KeyboardEvent) => {
            if(e.key == 'ArrowRight'){
                setSelected(selected => {
                    if(selected + 1 == props.inventory.length) return 0;
                    return selected + 1;
                });
            }else if(e.key == 'ArrowLeft'){
                setSelected(selected => {
                    if(selected == 0) return props.inventory.length - 1;
                    return selected - 1;
                });
            } else if(e.key == 'ArrowUp'){
                setSelected(selected => {
                    if(selected - 4 < 0) return selected;
                    return selected - 4;
                });
            } else if(e.key == 'ArrowDown'){
                setSelected(selected => {
                    if(selected + 4 >= props.inventory.length) return selected;
                    return selected + 4;
                });
            }
        }
        window.addEventListener('keydown', keydown);
        return () => window.removeEventListener('keydown', keydown);
    })
    return (
        <UIScreen direction="column" justify="center" items="center">
            <Box padding="0" gap="0">
                <ItemContainer>
                    {props.inventory.map((item, index) => {
                        return <Box key={index} selected={index == selected} onClick={() => setSelected(index)} button={true}>
                            <img src={item.id} alt="" width={30} height={30}/>
                        </Box>
                    })}
                </ItemContainer>
                {selected != -1 && <ItemDescription>
                    <img src={props.inventory[selected]?.id} alt="" width={50} height={50}/>
                    <DetailsContainer>
                        <h1>{props.inventory[selected]?.name}</h1>
                        <p>{props.inventory[selected]?.description}</p>
                    </DetailsContainer>
                    <Button>use</Button>
                </ItemDescription>}
            </Box>
        </UIScreen>
    )
}